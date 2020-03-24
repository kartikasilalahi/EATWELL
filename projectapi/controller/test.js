// // function serialPart() {
// //     var chars = '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm',
// //         SerialLangth = 5,
// //         randomSerial = '',
// //         randomNumber,
// //         i;

// //     for (i = 0; i < SerialLangth; i = i + 1) {
// //         randomNumber = Math.floor(Math.random() * chars.length);
// //         randomSerial += chars.substring(randomNumber, randomNumber + 1);
// //     }
// //     return randomSerial;
// // }

// // function printSerial() {
// //     let result = ''
// //     for (i = 0; i < 5; i = i + 1) {
// //         if (i === 0) result += serialPart() + "-";
// //         else if (i === 4) result += serialPart();
// //         else result += serialPart() + "-";
// //     }
// //     return result
// // }

// // module.exports = printSerial

// // // console.log(printSerial())
var moment = require('moment')

// var curr = new Date; // get current date
// var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
// var last = first + 6; // last day is the first day + 6

// var firstday = new Date(curr.setDate(first))
// var lastday = new Date(curr.setDate(last)).toUTCString();

// // console.log(firstday)
// // console.log(lastday)


// // firstday
// // "Sun, 06 Mar 2011 12:25:40 GMT"
// // lastday
// // "Sat, 12 Mar 2011 12:25:40 GMT"

// // let now = moment().format("YYYY-MM-DD")
// // let last = moment().add(6, 'day').format("YYYY-MM-DD")

// // console.log(now)

// var now = moment();
// var monday = now.clone().weekday(1).format("YYYY-MM-DD");
// var lastweek = now.clone().weekday(5).format("YYYY-MM-DD");
// // var isNowWeekday = now.isBetween(monday, lastweek, null, '[]');

// console.log(`now: ${now}`);
// console.log(`monday: ${monday}`);
// console.log(`lastweek: ${lastweek}`);
// // console.log(`is now between monday and lastweek: ${isNowWeekday}`);



//note: month is 0 based, just like Dates in js
function getWeeksInMonth(month, year) {
    var weeks = [],
        firstDate = new Date(year, month, 1),
        lastDate = new Date(year, month + 1, 0),
        numDays = lastDate.getDate();

    var start = 1;
    var end = 7 - firstDate.getDay();
    while (start <= numDays) {
        weeks.push({ start: start, end: end });
        start = end + 1;
        end = end + 7;
        if (end > numDays)
            end = numDays;
    }
    return weeks;
}
// console.log(getWeeksInMonth(2, 2020))

let now = moment();
let firstday = now.clone().weekday(1).format("YYYY-MM-DD");
let lastday = now.clone().weekday(5).format("YYYY-MM-DD");
let month = now.clone().month(0).format("MM");
let firstday2 = now.clone().weekday(1).format(`YYYY-${month}-DD`);
// console.log(firstday)
// console.log(firstday2)
// console.log(month)


/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}
// console.log(getDaysInMonth(2, 2020))


var today = new Date();
var year = today.getFullYear();
console.log(today.getMonth())