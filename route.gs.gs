//経路時間を出す
function calculateTravelTime() {
  var origin = '35.6812405,139.7649361';
  var destination = '35.676251,139.0000';
  var directions = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(Maps.DirectionFinder.Mode.DRIVING)
    .getDirections();
  
  var duration = directions.routes[0].legs[0].duration.text;
  console.log(duration);
  return duration;
}