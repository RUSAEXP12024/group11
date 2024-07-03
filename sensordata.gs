function recordSensorData() {
  const deviceData = getNatureRemoData("devices");　　　　//data取得
  const lastSensorData = getLastData("sensor");　　　　　//最終data取得

  var arg = {
    te:deviceData[0].newest_events.te.val,　　//温度
    hu:deviceData[0].newest_events.hu.val,　　//湿度
    il:deviceData[0].newest_events.il.val,　　//照度
  }

  setSensorData(arg, lastSensorData + 1);
}

function setSensorData(data, row) {
  getSheet('sensor').getRange(row, 1, 1, 4).setValues([[getNowDate(), data.te, data.hu, data.il]])
}

function getNowDate() {
  var d = new Date();
  return String(Utilities.formatDate(d, 'JST', 'yyyy-MM-dd HH:mm:ss'));
}
