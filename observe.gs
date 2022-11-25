function doPost(e) {
  // Messages when watering
  const watering_message = '!w';
  // Messages when checking
  const checking_message = '!r'
  // LINE Messaging API channel access token
  let token = '';
  // Objectize and retrieve the acquired JSON data
  let eventData = JSON.parse(e.postData.contents).events[0];
  // Get a response token
  let replyToken = eventData.replyToken;
  // Get the message type
  let messageType = eventData.message.type;
  // Retrieve messages posted by users
  let userMessage = eventData.message.text;
  // API URL
  let url = 'https://api.line.me/v2/bot/message/reply';
  // When the message is watering_message
  if (userMessage == watering_message) {
    replyMessage = watering_record();
  } else if (userMessage == checking_message) {
    replyMessage = info_watering();
  } else {
    replyMessage = info_elapsed();
  }
  //Payload value to be set when making an API request
  let payload = {
    'replyToken': replyToken,
    'messages': [{
      'type': 'text',
      'text': replyMessage
    }]
  };
  // Optional Parameters
  let options = {
    'payload': JSON.stringify(payload),
    'myamethod': 'POST',
    'headers': { "Authorization": "Bearer " + token },
    'contentType': 'application/json'
  };
  //Requests to LINE Messaging API and replies to posts from users
  UrlFetchApp.fetch(url, options);
}

// Function to record watering in spreadsheet
function watering_record() {
  // Get datetime info
  const now = new Date();
  const nowEpoc = now.getTime();
  const nowYear = now.getYear() + 1900;
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();
  const nowString = now.toLocaleString();
  const addArray = [nowString, nowYear, nowMonth, nowDate, nowEpoc];

  // Open spreadsheet
  const sheet_id = '';
  const sheet_name = nowYear;
  const spreadsheet = SpreadsheetApp.openById(sheet_id);

  // Append info in sheet of the current year
  const sheets = spreadsheet.getSheets();
  let flg = 0;
  for(let i = 0; i < sheets.length; i++) {
    if(sheets[i].getSheetName() == sheet_name) {
      flg = 1;
      break;
    }
  }
  if(flg == 0) {
    let sheet = spreadsheet.insertSheet();
    sheet.setName(sheet_name);
    sheet.appendRow(addArray);
  } else {
    let sheet = spreadsheet.getSheetByName(sheet_name);
    sheet.appendRow(addArray);
  }

  // Inform record
  let replyMessage = 'record watering!!!!';

  // Return message
  return replyMessage;
}

// Function to inform last watering info 
function info_watering() {
  // Get current year
  const now = new Date();
  let sheet_name = now.getYear() + 1900;

  // Open spreadsheet
  const sheet_id = '';
  const spreadsheet = SpreadsheetApp.openById(sheet_id);

  // Search the last sheet name
  const sheets = spreadsheet.getSheets();
  let flg = 0;
  for(var i = 0; i < sheets.length; i++) {
    if(sheets[i].getSheetName() == sheet_name) {
      flg = 1;
      break;
    }
  }
  if(flg == 0) {
    sheet_name--;
  }

  // Open the last sheet
  let sheet = spreadsheet.getSheetByName(sheet_name);

  // Number of rows and columns
  let rows = sheet.getLastRow();
  let columns = sheet.getLastColumn();

  // Specify range
  let range = sheet.getRange(rows, 1, 1, columns);
  let values = range.getValues();

  // Reply recent watering date
  let replyMessage = 'The most resent watering date is ' + values[0][2] + '/' + values[0][3] + '!!!!';

  // Return message
  return replyMessage;
}

// Function to inform elapsed date
function info_elapsed() {
  // Get datetime info
  const now = new Date();
  const nowEpoc = now.getTime();

  // Spreadsheet info
  const sheet_id = '';
  let sheet_name = now.getYear() + 1900;

  // Open spreadsheet
  const spreadsheet = SpreadsheetApp.openById(sheet_id);

  // Search the last sheet name
  const sheets = spreadsheet.getSheets();
  let flg = 0;
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetName() == sheet_name) {
      flg = 1;
      break;
    }
  }
  if (flg == 0) {
    sheet_name--;
  }

  // Open the last sheet
  let sheet = spreadsheet.getSheetByName(sheet_name);

  // Number of rows and columns
  let rows = sheet.getLastRow();
  let columns = sheet.getLastColumn();

  // Specify range
  let range = sheet.getRange(rows, 1, 1, columns);
  let values = range.getValues();

  // Calculate elapsed date
  let elapsed = Math.trunc((values[0][4] - nowEpoc) / 86400000);

  // Reply elapsed date
  let replyMessage = 'Elapsed ' + elapsed + ' days since last watering!!!!';

  // Return elapsed date
  return replyMessage
}

