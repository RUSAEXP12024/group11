//家の位置の設定

function getLatLngFromAddress(text) {
  var apiKey = GetGooglemapapiKEY();
  var address = text;
  var geocodingUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address) + "&key=" + apiKey;
  
  var response = UrlFetchApp.fetch(geocodingUrl);
  var responseData = JSON.parse(response.getContentText());
  
  if (responseData.status === "OK") {
    var location = responseData.results[0].geometry.location;
    Logger.log("Latitude: " + location.lat);
    Logger.log("Longitude: " + location.lng);
    var latLng = location.lat + "," + location.lng;
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange("B4").setValue(latLng);
  } else {
    Logger.log("Geocoding API Error: " + responseData.status);
  }
}

function test_get(){
  getLatLngFromAddress("日本大阪茨木市宇野辺1-1-1");
}


function home_setting(text)
{
  getLatLngFromAddress(text);
}
