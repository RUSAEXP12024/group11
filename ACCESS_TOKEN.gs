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
  //var LINE_ACCESS_TOKEN = 'GK+OjvrAUbxXDPTczDgK3GB/ojA6M7dwTGG3lGteUGcKzXeOv1xplqcypgDSbuA1lDYHjKNThHyZ3AO9Zh0jaeweAhIGO6PrHVrI+l9RjSk0HoewDUAbbcGZya9odcOFcW09A8HnB89x0RPbcCjVigdB04t89/1O/w1cDnyilFU=';//lineアクセストークン
  return LINE_ACCESS_TOKEN;
}

function GetREMOACCESSTOKEN() {
  //var REMO_ACCESS_TOKEN = ' remoトークンを入力';//remoアクセストークン
  return REMO_ACCESS_TOKEN;
}

function GetGooglemapapiKEY(){
  return GOOGLEMAP_API_KEY;
}
