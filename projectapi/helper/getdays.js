function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    let time = {
        first: days[0],
        last: days[days.length - 1]
    }
    return time;
}
module.exports = getDaysInMonth
