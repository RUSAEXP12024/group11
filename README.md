類似関数：Airconditioner_messege：Airconditioner_messegepushとreplyToUser


```
Remo・家電操作
|-REMO_ACCESS_TOKEN.gs    //Remoのアクセストークンを管理する
|-time_set.gs             //指定した時間にプログラムが起動するトリガーを作成する
|-air_conditioner.gs      //エアコンのオン・オフを管理する
|-Airconditionerdata.gs   //エアコンのオンオフや設定温度などといったデータを取得する
|-get_deviceID.gs         //remoからデバイスidを取得する
|-remo.gs                 //remoからデータを取得する

経路操作
|-route.gs                //経路時間を算出し、その時間を返す
|-go_home.gs              //現在位置の取得、帰宅機能、シートでの記録
|-home_setting.gs         //文字で自宅設定機能（実装しない）

line
|-line.gs                 //メッセージを送る/shortcut/lineからの請求の処理/自宅設定機能/あるセルの值をwrite
|-Airconditioner_messege.gs　//エアコンのオンオフをLINE上で通知する


short cut
https://www.icloud.com/shortcuts/f558f84159d1452daf612cef2ed361c0 //帰宅機能の実現
```


