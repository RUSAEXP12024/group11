//修正してほしい

// LINEボットを使ってメッセージを送信する関数

function sendLineMessage(message) {
  return fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {LINE_BOT_ACCESS_TOKEN}'
    },
    body: JSON.stringify({
      to: '{USER_ID}',
      messages: [{
        type: 'text',
        text: message
      }]
    })
  });
}
