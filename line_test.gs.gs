function doPost(e) {
  var postData = JSON.parse(e.postData.contents);
  if (postData.events) {
    // LINEからのリクエストを処理
    handleLineRequest(postData);
  } else if (postData.value) {
    // Apple Shortcutsからのリクエストを処理
    handleShortcutRequest(postData.value);
  } else {
      Logger.log('Unknown request format');  
      return ContentService.createTextOutput('Error: Unknown request format').setMimeType(ContentService.MimeType.TEXT);
    }
    return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}

function handleLineRequest(postData) {
  var events = postData.events;
  var replyToken = events[0].replyToken;
  var messageType = events[0].message.type;
  var userMessage = events[0].message.text;

  if (userMessage === 'オン') {
    replyToUser(replyToken, 'エアコンをオンにしました。');
    stop_go_home(); 
    Airconditioner_ON(); //修正：Airconditioner_ON()すでにメッセージある
  } else if (userMessage === 'オフ') {
    replyToUser(replyToken, 'エアコンをオフにしました。');
    stop_go_home();
    Airconditioner_OFF(); //修正：Airconditioner_OFF()すでにメッセージある
  } else if (userMessage === '気温・湿度') {
    var temperature = getCurrentTemperature();
    var humidity = getCurrentHumidity();
    replyToUser(replyToken, '現在の室温は ' + temperature + ' 度です。\n現在の湿度は ' + humidity + '% です。');
  } else if (userMessage === '自宅の位置を設定') {;
    requestLocation(replyToken);
    getLatLngFromAddress(userMessage);
  } else if (userMessage === '帰宅') {
    replyToUser(replyToken, 'shortcuts://run-shortcut?name=帰宅'); 
    go_home();
  } else if (messageType === 'location') {
    // 位置情報が送信された場合、それを処理
    var latitude = events[0].message.latitude;
    var longitude = events[0].message.longitude;
    var latLng = latitude + "," + longitude;
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange("B4").setValue(latLng);
    handleLocation(latitude, longitude, replyToken);
  } else {
    replyToUser(replyToken, '「オン」「オフ」「室温・湿度」「帰宅」「エアコンの状態」「自宅の位置を設定」のいずれかを入力してください。');
  }
}

function handleShortcutRequest(value) {
  // Shortcutsからのリクエストを処理
  if (value === 'calculateGohometime') {
    calculateGohometime();
  } else if (value === 'air_on') {
    Airconditioner_ON();
  } else {
    Logger.log('Unknown value in shortcut request: ' + value);
    throw new Error('Unknown value in shortcut request');
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
  var url = 'https://api.line.me/v2/bot/message/reply';
  var message = {
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: '完全な住所を位置情報で送信してください。'
      }
    ]
  };

  UrlFetchApp.fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getLineAccessToken()
    },
    method: 'post',
    payload: JSON.stringify(message)
  });
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