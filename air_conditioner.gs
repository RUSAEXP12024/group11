var token = '';//remo トークン

function Airconditioner_ON() {
  var token = GetREMOACCESSTOKEN();
  var deviceId = getdeviceid();
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
  var data = devicedata();

  var reply = UrlFetchApp.fetch(url, options);
  
}

function Airconditioner_OFF() {
  var token = GetREMOACCESSTOKEN();
  var deviceId = getdeviceid();
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
  var data = devicedata();

  var reply = UrlFetchApp.fetch(url, options);

}
