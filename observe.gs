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