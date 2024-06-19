//指定した時間にプログラムが起動するトリガーを作成する関数
var hours = "11";
var minits = "25";
function time_trigger() {
  let settime = new Date();
  settime.setHours(hours);
  settime.setMinutes(minits);
  ScriptApp.newTrigger('recordSensorData').timeBased().at(settime).create();
}
