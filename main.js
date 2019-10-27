/* global $ */

let h5 = 0;
let h4 = 0;
let h3 = 0;
let h2 = 0;
let h1 = 0;

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

function convertFromMilliseconds(timeInMilliseconds) {
    const millisecondsInDay = timeInMilliseconds % 86400000;
    return [
        Math.floor((millisecondsInDay / 5400000) % 16),
        Math.floor(((millisecondsInDay * 2) / 675000) % 16),
        Math.floor(((millisecondsInDay * 32) / 675000) % 16),
        Math.floor(((millisecondsInDay * 512) / 675000) % 16),
        Math.floor(((millisecondsInDay * 8192) / 675000) % 16),
    ];
}

// function convertHMStoHex(hours, minutes, seconds) {
//     hours = parseInt(document.getElementById('converter_hour').value, 10);
//     minutes = parseInt(document.getElementById('converter_minute').value, 10);
//     seconds = parseInt(document.getElementById('converter_second').value, 10);

//     // first, convert to ms from start of day
//     const millisInDay = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
//     const hexTime = convertFromMilliseconds(millisInDay);

//     document.getElementById('converter_h1').value = toHex(hexTime[0]);
//     document.getElementById('converter_h2').value = toHex(hexTime[1]);
//     document.getElementById('converter_h3').value = toHex(hexTime[2]);
//     document.getElementById('converter_h4').value = toHex(hexTime[3]);
//     console.log('convert');
// }

function convertHexToHMS(h1, h2, h3, h4) {
    h1 = parseInt(document.getElementById('converter_h1').value, 10);
    h2 = parseInt(document.getElementById('converter_h2').value, 10);
    h3 = parseInt(document.getElementById('converter_h3').value, 10);
    h4 = parseInt(document.getElementById('converter_h4').value, 10);

    const millisInDay = (h1 * 5400000)
          + (h2 * (675000 / 2))
          + (h3 * (675000 / 32))
          + (h4 * (675000 / 8192));

    document.getElementById('converter_hour').value = millisInDay / 3600000;
    document.getElementById('converter_minute').value = (millisInDay / 60000) % 60;
    document.getElementById('converter_second').value = (millisInDay / 1000) % 60;
    return false;
}

function updateText() {
    document.getElementById('clock').innerText = `${toHex(h1)}:${toHex(h2)}:${toHex(h3)}-${toHex(h4)}.${toHex(h5)}`;
}

function h1pos() {
    return (h1 * 22.5) + (h2 * (22.5 / 16)) + (h3 * (22.5 / 256)) + 180;
}

function h2pos() {
    return (h2 * 22.5) + (h3 * (22.5 / 16)) + (h4 * (22.5 / 256)) + 180;
}

function h3pos() {
    return (h3 * 22.5) + (h4 * (22.5 / 16)) + (h5 * (22.5 / 256)) + 180;
}

function h4pos() {
    return (h4 * 22.5) + (h5 * (22.5 / 16)) + 180;
}


function updateAnalog() {
    $('#h1').css({ transform: `rotate(${h1pos()}deg)` });
    $('#h2').css({ transform: `rotate(${h2pos()}deg)` });
    $('#h3').css({ transform: `rotate(${h3pos()}deg)` });
    //  $('#h4').css({'transform': 'rotate(' + h4pos() + 'deg)'});
}

function updateTime() {
    const hexTime = convertFromMilliseconds(Date.now() - (8 * 3600000));
    [h1, h2, h3, h4, h5] = hexTime;

    updateText();
    updateAnalog();
}

window.setInterval(updateTime, 83);
