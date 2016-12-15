var h5 = 0;
var h4 = 0;
var h3 = 0;
var h2 = 0;
var h1 = 0;

var h5start = 0;
var h4start = 0;
var h3start = 0;
var h2start = 0;
var h1start = 0;

function updateText() {
  $("#clock").text(toHex(h1) + ':' + toHex(h2) + ':' + toHex(h3) + ':' + toHex(h4) + '.' + toHex(h5));
}

function convertFromSeconds (timeInSeconds) {
  timeInSeconds = timeInSeconds % 86400;
  h1 = Math.floor((timeInSeconds / 5400) % 16);
  h2 = Math.floor(((timeInSeconds * 2) / 675) % 16);
  h3 = Math.floor(((timeInSeconds * 32) / 675) % 16);
  h4 = Math.floor(((timeInSeconds * 512) / 675) % 16);
  h5 = Math.floor(((timeInSeconds * 8192) / 675) % 16);
}

function convertFromMilliseconds (timeInMilliseconds) {
  timeInMilliseconds = timeInMilliseconds % 86400000;
  h1 = Math.floor((timeInMilliseconds / 5400000) % 16);
  h2 = Math.floor(((timeInMilliseconds * 2) / 675000) % 16);
  h3 = Math.floor(((timeInMilliseconds * 32) / 675000) % 16);
  h4 = Math.floor(((timeInMilliseconds * 512) / 675000) % 16);
  h5 = Math.floor(((timeInMilliseconds * 8192) / 675000) % 16);
}

function tick() {
  var tickTime = Date.now();
  $("#h5duration").text(tickTime - h5start);
  h5 += 1;
  h5start = tickTime;
  if (h5 % 16 == 0) {
    h5 = 0;
    $("#h4duration").text(tickTime - h4start);
    h4 += 1;
    h4start = tickTime;
    if (h4 % 16 == 0) {
      h4 = 0;
      $("#h3duration").text(tickTime - h3start);
      h3 += 1;
      h3start = Date.now();
      if (h3 % 16 == 0) {
        h3 = 0;
        $("#h2duration").text(tickTime - h2start);
        h2 += 1;
        h2start = Date.now();
        if (h2 % 16 == 0) {
          h2 = 0;
          $("#h1duration").text(tickTime - h1start);
          h1 += 1;
          h1start = Date.now();
          if (h1 % 16 == 0) {
            h1 = 0;
          }
        }
      }
    }
  }
  updateText();
}

function toHex(x) {
  switch (x) {
  case 10:
    return 'A';
  case 11:
    return 'B';
  case 12:
    return 'C';
  case 13:
    return 'D';
  case 14:
    return 'E';
  case 15:
    return 'F';
  default:
    return x;
  }
}

function updateTime() {
//  convertFromSeconds(Math.floor(Date.now() / 1000));
  convertFromMilliseconds(Date.now()-(8 * 3600000));
  updateText();
}

window.setInterval(updateTime, 83);
//window.setInterval(tick, 11350);