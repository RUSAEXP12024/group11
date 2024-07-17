var TIME_ZONE = 'Asia/Tokyo';
var NICKNAME_AIR_CONDITIONER = 'エアコン';
//var ACCESS_TOKEN = '';//remoアクセストークン
/*function getNatureRemoDatas(target){
  var ACCESS_TOKEN = GetREMOACCESSTOKEN();
  if (typeof ACCESS_TOKEN === 'undefined') throw new Error('Set ACCESS_TOKEN'); 

  var url = "https://api.nature.global/1/" + target;
  var headers = {
    "Content-Type" : 'application/json;',
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };
  var options = {
    "method" : "get",
    "headers" : headers,
    "muteHttpExceptions" : true
  };
  return JSON.parse(UrlFetchApp.fetch(url, options));//データを取得
}*/

function getdeviceid() {
  var data = getNatureRemoData("appliances");//データを取得
  var device_id = 0;
  data.forEach(function(e) {
    
    device_id = e.id;//デバイスid
    
  });
  
  return device_id;
}
