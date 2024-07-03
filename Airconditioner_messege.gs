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

function Airconditioner_messegepush(postText){
   const url = 'https://api.line.me/v2/bot/message/push';
  
  const payload = {
    to: line_userid,　//ユーザーID
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
  //UrlFetchApp.fetch(url, options);
}
