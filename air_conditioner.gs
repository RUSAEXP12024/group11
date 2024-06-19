var token = 'remo トークン';//remo トークン
var deviceId = "";//デバイス id
function Airconditioner_ON() {
  var url = "https://api.nature.global/1/appliances/" + deviceId + "/aircon_settings"; // Nature Remo3 APIのエアコン設定エンドポイント

  var options = {
    "method": "POST",
    "headers": {
    "Authorization": "Bearer " + token
  },
    "payload": {
    "button":""
  }
  };

  var reply = UrlFetchApp.fetch(url, options);
  
}

function Airconditioner_OFF() {
  var url = "https://api.nature.global/1/appliances/" + deviceId + "/aircon_settings"; // Nature Remo3 APIのエアコン設定エンドポイント


  var options = {
    "method": "POST",
    "headers": {
    "Authorization": "Bearer " + token
  },
    "payload": {
    "button":"power-off"
  }
  };

  var reply = UrlFetchApp.fetch(url, options);

}
