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
    return [
        Math.floor((timeInMilliseconds / 5400000) % 16),
        Math.floor(((timeInMilliseconds * 2) / 675000) % 16),
        Math.floor(((timeInMilliseconds * 32) / 675000) % 16),
        Math.floor(((timeInMilliseconds * 512) / 675000) % 16),
        Math.floor(((timeInMilliseconds * 8192) / 675000) % 16)
    ];
}

function convertHMStoHex (hours, minutes, seconds) {
    hours = parseInt(document.getElementById("converter_hour").value);
    minutes = parseInt(document.getElementById("converter_minute").value);
    seconds = parseInt(document.getElementById("converter_second").value);

    //first, convert to ms from start of day
    var millisInDay = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
    var hexTime = convertFromMilliseconds(millisInDay);

    document.getElementById("converter_h1").value = toHex(hexTime[0]);
    document.getElementById("converter_h2").value = toHex(hexTime[1]);
    document.getElementById("converter_h3").value = toHex(hexTime[2]);
    document.getElementById("converter_h4").value = toHex(hexTime[3]);
    console.log("convert");
}

function convertHexToHMS (h1, h2, h3, h4) {
    h1 = parseInt(document.getElementById("converter_h1").value);
    h2 = parseInt(document.getElementById("converter_h2").value);
    h3 = parseInt(document.getElementById("converter_h3").value);
    h4 = parseInt(document.getElementById("converter_h4").value);

    var millisInDay = (h1 * 5400000) + (h2 * (675000/2)) + (h3 * (675000/32)) + (h4 * (675000/8192));

    document.getElementById("converter_hour").value = millisInDay / 3600000;
    document.getElementById("converter_minute").value = (millisInDay / 60000) % 60;
    document.getElementById("converter_second").value = (millisInDay / 1000) % 60;
    return false;
}

function updateTime() {
    var hexTime = convertFromMilliseconds(Date.now()-(8 * 3600000));
    h1 = hexTime[0];
    h2 = hexTime[1];
    h3 = hexTime[2];
    h4 = hexTime[3];
    h5 = hexTime[4];

    updateText();
    updateAnalog();
}

function updateText() {
    document.getElementById("clock").innerText = `${toHex(h1)}:${toHex(h2)}:${toHex(h3)}-${toHex(h4)}.${toHex(h5)}`;
}

function updateAnalog() {
    $("#h1").css({"transform": "rotate(" + h1pos() + "deg)"});
    $("#h2").css({"transform": "rotate(" + h2pos() + "deg)"});
    $("#h3").css({"transform": "rotate(" + h3pos() + "deg)"});
    //  $("#h4").css({"transform": "rotate(" + h4pos() + "deg)"});
}

function h1pos() {
    return (h1 * 22.5) + (h2 * (22.5/16)) + (h3 * (22.5/256)) + 180;
}

function h2pos() {
    return (h2 * 22.5) + (h3 * (22.5/16)) + (h4 * (22.5/256)) + 180;
}

function h3pos() {
    return (h3 * 22.5) + (h4 * (22.5/16)) + (h5 * (22.5/256)) + 180;
}

function h4pos() {
    return (h4 * 22.5) + (h5 * (22.5/16)) + 180;
}

window.setInterval(updateTime, 83);