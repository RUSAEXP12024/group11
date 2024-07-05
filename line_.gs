//修正：メッセージ内容についての変更
function doPost(e) {
  var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text;

  if (userMessage === 'オン') {
    Airconditioner_ON(); //修正：Airconditioner_ON()すでにメッセージある
    stop_go_home();
    //replyToUser(replyToken, 'エアコンをオンにしました。'); 
  } else if (userMessage === 'オフ') {
    Airconditioner_OFF();　//修正：Airconditioner_OFF()すでにメッセージある
    stop_go_home();
    //replyToUser(replyToken, 'エアコンをオフにしました。');
  } else if (userMessage === '気温・湿度') {
    var temperature = getCurrentTemperature();
    replyToUser(replyToken, '現在の室温は ' + temperature + ' 度です。');
    replyToUser(replyToken, '現在の湿度は ' + humidity + '% です。');
  } else if (userMessage === '自宅の位置を設定') {
    home_setting();
  } else if (userMessage === '帰宅') {
    stop_go_home();
    go_home();
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

