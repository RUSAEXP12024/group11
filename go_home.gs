//プログラミング中
//家の位置(ここで立命館)
var home_address = '34.98291353169776, 135.9621180593622'; 
var SHORTEST_TIME = 10;
var CHECK_TIME = 10;
var isGoingHome = false; // 状態を管理するフラグ

// 現在の位置の取得
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

// 位置情報のフォーマットの確認
function checkLocationFormat(locationString) {
  var pattern = /^\-?\d+(\.\d+)?,\s*\-?\d+(\.\d+)?$/;
  return pattern.test(locationString);
}

// エアコンの状態を確認する関数（仮定：この関数はエアコンがオンかどうかを返す）
function isAirConditionerOn() {
  // 実際にはAPIリクエストを使ってエアコンの状態を確認する必要があります
  return fetch('https://api.example.com/airconditioner/status')
    .then(response => response.json())
    .then(data => data.isOn);
}



// 帰宅モード
function go_home() {
  if (isGoingHome) {
    // 前の実行を中断する
    clearInterval(isGoingHome);
    isGoingHome = false;
  }

  isGoingHome = setInterval(function() {
    getCurrentLocation()
      .then(function(origin) {
        if (checkLocationFormat(origin)) {
          var go_home_time = calculateTravelTime(origin, home_address); // calculateTravelTime の実装は省略されています

          if (go_home_time <= SHORTEST_TIME) {
            isAirConditionerOn().then(isOn => {
              if (isOn) {
                console.log('エアコンは既にオンです。');
                sendLineMessage('エアコンは既にオンです。後続操作は実行されません。');
                clearInterval(isGoingHome);
                isGoingHome = false;
              } else {
                // エアコンをオンにする操作をここに追加する
                sendLineMessage('エアコンをオンにしました。');
                clearInterval(isGoingHome);
                isGoingHome = false;
              }
            });
          }
        }
      })
      .catch(function(error) {
        console.error('位置情報の取得中にエラーが発生しました：', error);
        clearInterval(isGoingHome);
        isGoingHome = false;
      });
  }, 10 * 60 * 1000); // 10分ごとに実行（ミリ秒単位で指定）
}

// 使用例
//document.getElementById('goHomeButton').addEventListener('click', function() {
//  go_home();
//});
