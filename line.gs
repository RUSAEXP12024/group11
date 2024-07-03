// line関連
var access_token_line = ''//lineアクセストークン
var line_userid =''//line userid

// LINEボットを使ってメッセージを送信する関数
function sendLineMessage(postText){
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
