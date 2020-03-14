function serialPart() {
    var chars = '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm',
        SerialLangth = 5,
        randomSerial = '',
        randomNumber,
        i;

    for (i = 0; i < SerialLangth; i = i + 1) {
        randomNumber = Math.floor(Math.random() * chars.length);
        randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    return randomSerial;
}

function printSerial() {
    let result = ''
    for (i = 0; i < 4; i = i + 1) {
        if (i === 0) result += serialPart() + "-";
        else if (i === 3) result += serialPart();
        else result += serialPart() + "-";
    }
    return result
}

module.exports = printSerial

// console.log(printSerial())