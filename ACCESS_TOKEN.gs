/****************************
 * シートで　
 * B1: LINE トークン
 * B2: remoトークン　
 * B3: google map トークン
 * B4: 家の位置
 * B5: 現在地
 * B6: 帰宅時間
*****************************/
var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
var LINE_ACCESS_TOKEN = sheet.getRange('B1').getValue();
var REMO_ACCESS_TOKEN = sheet.getRange('B2').getValue();
var GOOGLEMAP_API_KEY = sheet.getRange('B3').getValue();
function getLineAccessToken() {
  //var LINE_ACCESS_TOKEN = ' lineトークンを入力';//lineアクセストークン
  return LINE_ACCESS_TOKEN;
}

function GetREMOACCESSTOKEN() {
  //var REMO_ACCESS_TOKEN = ' remoトークンを入力';//remoアクセストークン
  return REMO_ACCESS_TOKEN;
}

function GetGooglemapapiKEY(){
  return GOOGLEMAP_API_KEY;
}
