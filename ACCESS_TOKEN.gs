/****************************
 * シートで　
 * B1: LINE トークン
 * B2: remoトークン　
*****************************/
var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
var LINE_ACCESS_TOKEN = sheet.getRange('B1').getValue();
var REMO_ACCESS_TOKEN = sheet.getRange('B2').getValue();
function getLineAccessToken() {
  //var LINE_ACCESS_TOKEN = ' remoトークンを入力';//remoアクセストークン
  return LINE_ACCESS_TOKEN;
}

function GetREMOACCESSTOKEN() {
  //var REMO_ACCESS_TOKEN = ' remoトークンを入力';//remoアクセストークン
  return REMO_ACCESS_TOKEN;
}
