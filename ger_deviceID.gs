var ACCESS_TOKEN = '';//remoアクセストークン
/*function GetDeviceId(){
    var url = "https://api.nature.global/1/appliances/" +token +"/appsscript.json"
    var options = {
      "method" : "get",
      "headers" : {"Authorization" : "Bearer [d_AZCZDsHPSmcDxwjHSgYxf4R44QSecWhZo3WH6ElxU.lIsHAVDbRx60oV9pzLZUJo5KuvBy9uFt0jrzyPChCsg]"}
    };
    var reply = UrlFetchApp.fetch(url, options);
    Logger.log(reply)
}*/
function getNatureRemoData(target){
  if (typeof ACCESS_TOKEN === 'undefined') throw new Error('Set ACCESS_TOKEN'); 

  var url = "https://api.nature.global/1/appliances" ;
  var headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };
  var options = {
    "method" : "get",
    "headers" : headers,
  };
  var reply = UrlFetchApp.fetch(url, options);
    Logger.log(reply)
}