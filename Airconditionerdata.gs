function devicedata() {

  var data_appliances = getNatureRemoData_Appliances() //家電ごとのデータを取得

  // Stage 2
  var ac_state = 0;
  
  if(data_appliances[0].settings.button != "power-off"){
    ac_state = 1;//エアコンのオンオフ
  }
  var setLaremoData = {
    appliances1_vol:data_appliances[0].settings.vol,
    appliances1_temp:data_appliances[0].settings.temp,
    appliances1_button      : data_appliances[0].settings.button,
    ac_state : ac_state,
    appliances1_updated_at  : convertToJapanTime(data_appliances[0].settings.updated_at),
  
  }
  
  return setLaremoData;
}

function recordAirconditionerData(){
  const lastSensorData = getLastData("airconditioner");　　　　　//最終data取得
  var AirconData = devicedata();

  setAirconData(AirconData, lastSensorData + 1);//エアコンのデータをスプレッドシート入力

}

function getNatureRemoData_Appliances() {
  var ACCESS_TOKEN = GetREMOACCESSTOKEN();
  var url = "https://api.nature.global/1/appliances";
  var headers = {
    'accept': 'application/json',
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };

  var postData = {

  };

  var options = {
    "method" : "get",
    "headers" : headers,
  };

  var data = JSON.parse(UrlFetchApp.fetch(url, options));

  return data;
}

function setAirconData(data, row) {
  getSheet('airconditioner').getRange(row, 1, 1, 6).setValues([[getNowDate(), data.appliances1_temp, data.appliances1_vol, data.appliances1_button,data.ac_state,data.appliances1_updated_at]])
}
function convertToJapanTime(dateText) {
  let d
  if (dateText != null){
    d = Utilities.formatDate(new Date(dateText), 'JST', 'yyyy-MM-dd HH:mm:ss')
  }
  else{
    d = 'null';
  }

  return d;
}
