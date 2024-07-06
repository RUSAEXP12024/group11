
function doPost(e) {
  try {

    Logger.log('Received request: ' + JSON.stringify(e));

    if (!e.postData.contents) {
      Logger.log('No postData contents found');
      throw new Error('postDataが見つかりません');
    }


    var data = JSON.parse(e.postData.contents);
    Logger.log('Parsed data: ' + JSON.stringify(data));


    var events = data.events;
    if (!events || events.length === 0) {
      Logger.log('No events found in data');
      throw new Error('イベントが見つかりません');
    }

    var replyToken = events[0].replyToken;
    var userMessage = events[0].message.text;

    Logger.log('Received message: ' + userMessage);


    switch (userMessage) {
      case 'オン':
        Airconditioner_ON();
        replyToUser(replyToken, 'エアコンをオンにしました。');
        break;
      case 'オフ':
        Airconditioner_OFF();
        replyToUser(replyToken, 'エアコンをオフにしました。');
        break;
      case '気温・湿度':
        var temperature = getCurrentTemperature();
        var humidity = getCurrentHumidity();
        replyToUser(replyToken, '現在の室温は ' + temperature + ' 度です。現在の湿度は ' + humidity + '% です。');
        break;
      case '自宅の位置を設定':
        //home_setting(text);
        break;
      case '帰宅':
        go_home();
        break;
      default:
        replyToUser(replyToken, '「エアコンオン」「エアコンオフ」「現在の室温」「現在の湿度」のいずれかを入力してください。');
    }


    return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput('Error: ' + error.message).setMimeType(ContentService.MimeType.TEXT);
  }
}


function doGet(e) {
    return ContentService.createTextOutput("SUCCESS");
}


function getCurrentTemperature() {
  var url = "https://api.nature.global/1/devices";
  var options = {
    "method": "GET",
    "headers": {
      "Authorization": "Bearer " + GetREMOACCESSTOKEN()
    }
  };
  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  return data[0].newest_events.te.val;
}

function getCurrentHumidity() {
  var url = "https://api.nature.global/1/devices";
  var options = {
    "method": "GET",
    "headers": {
      "Authorization": "Bearer " + GetREMOACCESSTOKEN()
    }
  };
  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  return data[0].newest_events.hu.val;
}

function replyToUser(replyToken, message) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getLineAccessToken()
  };
  var postData = {
    'replyToken': replyToken,
    'messages': [{
      'type': 'text',
      'text': message
    }]
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };
  UrlFetchApp.fetch(url, options);
}

