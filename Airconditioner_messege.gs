var line_userid =Get_line_usr_id();//line userid
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
  Airconditioner_messegepush(text);
  
}

function AirconData_messege() {
  let data =devicedata();
  let text = '';
  let time = getNowDate();
  if(data.ac_state ==0){
    text = 'offです' + '\n'
          +'日時:' + time
  }else if(data.ac_state ==1){
    text = 'onです' + '\n'
          + '設定温度:' + data.appliances1_temp + '\n'
          + '運転モード;' +data.appliances1_vol +'\n'
          +'日時:' + time
  }else{
    text = 'エラー'
  }
  Airconditioner_messegepush(text);
}

function SensorData_messege() {
  const deviceData = getNatureRemoData("devices");　　　　//data取得
  let text = '';
  let time = getNowDate();

  text = '日時:' + time +'\n'
          + '室温:' + deviceData[0].newest_events.te.val + '\n'
          + '湿度;' + deviceData[0].newest_events.hu.val

  Airconditioner_messegepush(text);

}

function Sent_AirconData() {
  let data = getSheet('airconditioner')
  const lastAirconData = getLastData("airconditioner");　　　　　//最終data取得
  let rangeLast = data.getRange(lastAirconData-1,5);     //A1セル選択
  let lastdata = rangeLast.getValue();
  //let rangeNow = data.getRange(lastAirconData,2,6);     //A1セル選択
  let dataNow = devicedata();
  let text = '';
  
  if (lastdata == dataNow.ac_state){
  }else {if(lastdata < dataNow){
    text = 'onになりました' + '\n'
          + '設定温度:' + dataNow.appliances1_temp + '\n'
          + '運転モード;' +dataNow.appliances1_vol +'\n'
          +'日時:' + dataNow.appliances1_updated_at
  }else {
    text = 'offになりました' + '\n'
          +'日時:' + dataNow.appliances1_updated_at
  }
  Airconditioner_messegepush(text);
  Logger.log(dataNow.ac_state)
  }
  recordAirconditionerData();
}



function Airconditioner_messegepush(postText){
   const url = 'https://api.line.me/v2/bot/message/push';
   let access_token_line = getLineAccessToken();
  
  const payload = {
    to: Get_line_usr_id(),　//ユーザーID
    messages: [
      { type: 'text', text: postText}
    ]
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + access_token_line
    },
    payload: JSON.stringify(payload)
  };
  UrlFetchApp.fetch(url, params);
  
}
