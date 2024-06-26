//経路時間を出して、その時間を返す(単位：分)
function calculateTravelTime() {
  var origin = '34.98291353169776, 135.9621180593622';
  var destination = '34.820729001137906, 135.5824031194032';
  var directions = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(Maps.DirectionFinder.Mode.WALKING)
    .getDirections();
 
  try {
    var duration = directions.routes[0].legs[0].duration.text;//目的地までの時間を求める
    var time = 0;

    //durationはstringなのでint型で「単位：分」に変換する
    var arrayStrig = duration.split(" ");
    for (let i = 1; i < duration.length-1; i++) {
      if(arrayStrig[i]=="days"){
        time += parseInt(arrayStrig[i-1]) * 60 * 60;
      }
      else if(arrayStrig[i] == "hours"){
        time += parseInt(arrayStrig[i-1]) * 60;
      }
      else if(arrayStrig[i] == "mins"){
        time += parseInt(arrayStrig[i-1]);
      }
    }
    console.log(time);
    return time;
  } catch (error) {
    //存在しない場所、たどり着けない場所などはエラー
    console.error(error);
    console.log("done");
    return -1;//その場合は-1をreturn
  }
}