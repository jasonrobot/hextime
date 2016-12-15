var h5 = 0;
var h4 = 0;
var h3 = 0;
var h2 = 0;
var h1 = 0;

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

function convertFromMilliseconds (timeInMilliseconds) {
  timeInMilliseconds = timeInMilliseconds % 86400000;
  h1 = Math.floor((timeInMilliseconds / 5400000) % 16);
  h2 = Math.floor(((timeInMilliseconds * 2) / 675000) % 16);
  h3 = Math.floor(((timeInMilliseconds * 32) / 675000) % 16);
  h4 = Math.floor(((timeInMilliseconds * 512) / 675000) % 16);
  h5 = Math.floor(((timeInMilliseconds * 8192) / 675000) % 16);
}

function updateTime() {
  convertFromMilliseconds(Date.now()-(8 * 3600000));
  updateText();
  updateAnalog();
}

function updateText() {
  $("#clock").text(toHex(h1) + ':' + toHex(h2) + ':' + toHex(h3) + ':' + toHex(h4) + '.' + toHex(h5));
}

function updateAnalog() {
  $("#h1").css({"transform": "rotate(" + h1pos() + "deg)"});
  $("#h2").css({"transform": "rotate(" + h2pos() + "deg)"});
  $("#h3").css({"transform": "rotate(" + h3pos() + "deg)"});
  $("#h4").css({"transform": "rotate(" + h4pos() + "deg)"});
}

function h1pos() {
  return (h1 * 22.5) + (h2 * (22.5/16)) + (h3 * (22.5/256));
}

function h2pos() {
  return (h2 * 22.5) + (h3 * (22.5/16)) + (h4 * (22.5/256));
}

function h3pos() {
  return (h3 * 22.5) + (h4 * (22.5/16)) + (h5 * (22.5/256));
}

function h4pos() {
  return (h4 * 22.5) + (h5 * (22.5/16));
}

window.setInterval(updateTime, 83);