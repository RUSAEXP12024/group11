// 定数と変数の設定
var home_address = '34.98291353169776, 135.9621180593622'; 
const CHECK_INTERVAL_MINUTES = 10; // チェック間隔（分）
const SHORTEST_TIME = 10; // 最短帰宅時間（分）
var METHOD = 'WALKING';

var isGoingHome = false; // 帰宅中フラグ


// 現在の位置の取得（手動で固定された位置情報を返す）

// Google Maps API キー（自分のAPIキーに置き換えてください）
var API_KEY = GetGooglemapapiKEY();

// 位置情報のフォーマットの確認
function checkLocationFormat(locationString) {
  var pattern = /^\-?\d+(\.\d+)?,\s*\-?\d+(\.\d+)?$/;
  return pattern.test(locationString);
}

function doPost(e) {
  var postData = JSON.parse(e.postData.contents);
  var events = postData.events;

  if (events.length > 0 && events[0].message.type === 'location') {
    var latitude = events[0].message.latitude;
    var longitude = events[0].message.longitude;
    var scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.setProperty('latitude', latitude.toString());
    scriptProperties.setProperty('longitude', longitude.toString());

    Logger.log('緯度: ' + latitude + ', 経度: ' + longitude);
  }

  // 処理結果をJSON形式で返す
  return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
}

/*function getCurrentLocation() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var latitude = scriptProperties.getProperty('latitude');
  var longitude = scriptProperties.getProperty('longitude');

  if (latitude && longitude) {
    var locationString = latitude + ', ' + longitude;
    console.log('Current location: ' + locationString);
    return locationString;
  } else {
    console.error('No location data available.');
    return null;
  }
}
*/


// 現在の位置の取得
function getCurrentLocation() {
  return('34.98392353169776, 135.9931280593622');
}

// 実際の帰宅操作を行う関数
function go_home() {
    isGoingHome = true;
    var origin = getCurrentLocation(); // 手動で位置情報を取得
    console.log('帰宅する位置:', origin);
    if (checkLocationFormat(origin)&&isGoingHome) {
        var go_home_time = calculateTravelTime(origin, home_address, METHOD); // 帰宅時間を計算
        console.log('帰宅時間:', go_home_time, '分');
        if (go_home_time <= SHORTEST_TIME) {
          console.log('エアコンをオンにします');
          isGoingHome = false;
          //Airconditioner_ON(); // 最短時間以内ならエアコンをオンにする
          return;
        } else if (go_home_time < 20) {
            // 10~20分の場合、次のトリガーを設定する
            var nextTriggerMinutes = go_home_time - 10; // 次のトリガーまでの残り時間（分）
        } else {
           var nextTriggerMinutes =  10;
            // 20分以上の場合、10分後に再度実行する
        }
            ScriptApp.newTrigger('go_home')
                .timeBased()
                .after(nextTriggerMinutes * 60 * 1000) // 分をミリ秒に変換して設定
                .create();
    } else {
        console.error('位置情報のフォーマットが正しくありません');
    }
}

function stop_go_home(){
  if (isGoingHome){
    isGoingHome =false;
    stopAllTriggers();
  }
}

function stopAllTriggers() {
    // 現在のプロジェクトの全トリガーを取得
    var allTriggers = ScriptApp.getProjectTriggers();

    // 各トリガーを順番に削除
    for (var i = 0; i < allTriggers.length; i++) {
        ScriptApp.deleteTrigger(allTriggers[i]);
    }

    console.log('全てのトリガーが停止されました。');
}





