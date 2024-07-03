var access_token_line = ''//lineアクセストークン
var line_userid =''//line userid
function Airconditioner_messege(messege){
  let data =devicedata();
  let text = '';
  let time = getNowDate();
  if(messege == 'すでにonです'){
    text = messege + '\n'
          + '設定温度:' + data.appliances1_temp + '\n'
          + '運転モード;' +data.appliances1_vol +'\n'
          +'日時:' + time
  }else if(messege == 'onになりました'){
    text = messege + '\n'
          + '設定温度:' + data.appliances1_temp + '\n'
          + '運転モード;' +data.appliances1_vol +'\n'
          +'日時:' + time
  }else if(messege == 'すでにoffです'){
    text = messege + '\n'
          +'日時:' + time
  }else if(messege == 'offになりました'){
    text = messege + '\n'
          +'日時:' + time
  }else{
    text = 'エラー'
  }
 sendLineMessage(text);
  
}

function SensorData_messege() {
  const deviceData = getNatureRemoData("devices");　　　　//data取得
  let text = '';
  let time = getNowDate();

  text = '日時:' + time +'\n'
          + '室温:' + deviceData[0].newest_events.te.val + '\n'
          + '湿度;' + deviceData[0].newest_events.hu.val

  sendLineMessage(text);

}

