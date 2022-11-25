function doPost(e) {
  // LINE Messaging API channel access token
  let token = "";
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
  // repeat
  let replyMessage = messageType + userMessage;
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
    'payload' : JSON.stringify(payload),
    'myamethod'  : 'POST',
    'headers' : {"Authorization" : "Bearer " + token},
    'contentType' : 'application/json'
  };
  //Requests to LINE Messaging API and replies to posts from users
  UrlFetchApp.fetch(url, options);
}

function save_date() {
    const sheet_id = '';
    const sheet_name = '';

    const sheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_name);

    const now = new Date();
    const nowEpoc = now.getTime();
    const nowYear = now.getYear();
    const nowMonth = now.getMonth();
    const nowDate = now.getDate();
    const nowString = now.toLocaleString();
    const addArray = [nowString, nowYear + 1900, nowMonth + 1, nowDate, nowEpoc];

    sheet.appendRow(addArray);
}

function info_watering() {
    const sheet_id = '';
    const sheet_name = '';

    const sheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_name);
    
    var rows = sheet.getLastRow();
    var columns = sheet.getLastColumn();
    var range = sheet.getRange(rows,1,1,columns);
    var values = range.getValues();

    var message = 'The most resent watering date is ' + values[0][0];

}
