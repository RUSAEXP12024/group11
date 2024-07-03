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
  if(data.ac_state ==1){
    let messege = 'すでにonです';
    Airconditioner_messege(messege);
    return;
  }

  var reply = UrlFetchApp.fetch(url, options);
  let messege = 'onになりました';
  Airconditioner_messege(messege);
  recordAirconditionerData();
  
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
  if(data.ac_state ==0){
    let messege = 'すでにoffです';
    Airconditioner_messege(messege);
    return;
  }

  var reply = UrlFetchApp.fetch(url, options);
  let messege = 'offになりました';
  Airconditioner_messege(messege);
  recordAirconditionerData();

}
