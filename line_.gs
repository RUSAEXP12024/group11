//修正：メッセージ内容についての変更
/*function doPost(e) {
  var postData = JSON.parse(e.postData.contents);
  var events = postData.events;
  var replyToken = events[0].replyToken;
  var messageType = events[0].message.type;
  var userMessage = messageType === 'text' ? events[0].message.text : '';

  if (userMessage === 'オン') {
    Airconditioner_ON(); //修正：Airconditioner_ON()すでにメッセージある
    stop_go_home();
    replyToUser(replyToken, 'エアコンをオンにしました。'); 
  } else if (userMessage === 'オフ') {
    Airconditioner_OFF();　//修正：Airconditioner_OFF()すでにメッセージある
    stop_go_home();
    replyToUser(replyToken, 'エアコンをオフにしました。');
  } else if (userMessage === '気温・湿度') {
    var temperature = getCurrentTemperature();
    var humidity = getCurrentHumidity();
    replyToUser(replyToken, '現在の室温は ' + temperature + ' 度です。');
    replyToUser(replyToken, '現在の湿度は ' + humidity + '% です。');
  } else if (userMessage === '自宅の位置を設定') {
    home_setting();
  } else if (userMessage === '帰宅') {
    // ユーザーに位置情報の送信を促す
    requestLocation(replyToken);
  } else if (messageType === 'location') {
    // 位置情報が送信された場合、それを処理
    var latitude = events[0].message.latitude;
    var longitude = events[0].message.longitude;
    handleLocation(latitude, longitude, replyToken);
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

function requestLocation(replyToken) {
  var messages = [{
    type: 'text',
    text: '帰宅の処理を進めるため、位置情報を送信してください。'
  }];
  replyToUser(replyToken, messages);
}

function handleLocation(latitude, longitude, replyToken) {
  // 位置情報を基に必要な処理を行う
  console.log('緯度: ' + latitude + ', 経度: ' + longitude);
  // 位置情報に基づいて帰宅関連の処理をここに追加
  replyToUser(replyToken, '位置情報を受け取りました。緯度: ' + latitude + ', 経度: ' + longitude);
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

*/