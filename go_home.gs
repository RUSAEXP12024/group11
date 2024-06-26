//プログラミング中
//家の位置(ここで立命館)
var home_address = '34.98291353169776, 135.9621180593622'; 
var SHORTEST_TIME = 10;
var CHECK_TIME = 10;

//当前位置の取得
function getCurrentLocation() {
  return new Promise(function(resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var locationString = latitude.toString() + ', ' + longitude.toString();
        resolve(locationString);
      }, function(error) {
        reject('位置情報の取得中にエラーが発生しました：' + error.message);
      });
    } else {
      reject('このブラウザは位置情報をサポートしていません。');
    }
  });
}

function checkLocationFormat(locationString) {
  // 位置情報の格式の確認
  var pattern = /^\-?\d+(\.\d+)?,\s*\-?\d+(\.\d+)?$/;

  // パターンにマッチするかどうかを確認します
  if (pattern.test(locationString)) {
    return true; // フォーマットが正しい場合
  } else {
    return false; // フォーマットが正しくない場合
  }
}

//帰宅モード
function go_home() {
  // 10分ごとに位置を確認して、帰宅時間を計算し、10分以内に到着する場合はループを終了する
  var interval = setInterval(function() {
    getCurrentLocation()
      .then(function(origin) {
        if (checkLocationFormat(origin)) {
          var go_home_time = calculateTravelTime(origin, home_address); // calculateTravelTime の実装は省略されています
          if (go_home_time <= SHORTEST_TIME) {
            clearInterval(interval); // 10分以内に到着する場合はループを終了します
          }
        }
      })
      .catch(function(error) {
        console.error('位置情報の取得中にエラーが発生しました：', error);
        clearInterval(interval); // エラーが発生した場合もループを終了します
      });
  }, CHECK_TIME * 60 * 1000); // 10分ごとに実行（ミリ秒単位で指定）,timer?!
}
