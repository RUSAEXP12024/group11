function doPost(e) {
  var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text;

  if (userMessage === 'エアコンオン') {
    Airconditioner_ON();
    replyToUser(replyToken, 'エアコンをオンにしました。');
  } else if (userMessage === 'エアコンオフ') {
    Airconditioner_OFF();
    replyToUser(replyToken, 'エアコンをオフにしました。');
  } else if (userMessage === '現在の室温') {
    var temperature = getCurrentTemperature();
    replyToUser(replyToken, '現在の室温は ' + temperature + ' 度です。');
  } else if (userMessage === '現在の湿度') {
    var humidity = getCurrentHumidity();
    replyToUser(replyToken, '現在の湿度は ' + humidity + '% です。');
  } else {
    replyToUser(replyToken, '「エアコンオン」「エアコンオフ」「現在の室温」「現在の湿度」のいずれかを入力してください。');
  }
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
