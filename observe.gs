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
  // Spreadsheet info
  const sheet_id = '';
  const sheet_name = '';

  // Open spreadsheet
  const sheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_name);

  // Get datetime info
  const now = new Date();
  const nowEpoc = now.getTime();
  const nowYear = now.getYear();
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();
  const nowString = now.toLocaleString();
  const addArray = [nowString, nowYear + 1900, nowMonth + 1, nowDate, nowEpoc];

  // Append info in sheet
  sheet.appendRow(addArray);

  // Inform record
  let replyMessage = 'record watering!!!!';

  // Return message
  return replyMessage;
}

// Function to inform last watering info 
function info_watering() {
  // Get current year
  const now = new Date();
  var sheet_name = now.getYear() + 1900;

  // Open spreadsheet
  const sheet_id = '';
  const spreadsheet = SpreadsheetApp.openById(sheet_id);

  // Search the last sheet name
  const sheets = spreadsheet.getSheets();
  var flg = 0;
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
  var sheet = spreadsheet.getSheetByName(sheet_name);

  // Number of rows and columns
  var rows = sheet.getLastRow();
  var columns = sheet.getLastColumn();

  // Specify range
  var range = sheet.getRange(rows, 1, 1, columns);
  var values = range.getValues();

  // Reply recent watering date
  var replyMessage = 'The most resent watering date is ' + values[0][2] + '/' + values[0][3] + '!!!!';

  // Return message
  return replyMessage;
}
