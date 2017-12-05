export function showDate(historyDate) {
    var now = new Date().getTime(),
        diffValue = now - historyDate.getTime(),
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12;
    var _year = diffValue / year;
    var _month = diffValue / month;
    var _week = diffValue / (7 * day);
    var _day = diffValue / day;
    var _hour = diffValue / hour;
    var _min = diffValue / minute;

    if (_year >= 1) {
        return parseInt(String(_year)) + "年前";
    } else if (_month >= 1) {
        return parseInt(String(_month)) + "个月前";
    } else if (_week >= 1) {
        return parseInt(String(_week)) + "周前";
    } else if (_day >= 1) {
        return parseInt(String(_day)) + "天前";
    } else if (_hour >= 1) {
        return parseInt(String(_hour)) + "小时前";
    } else if (_min >= 1) {
        return parseInt(String(_min)) + "分钟前";
    } else {
        return "刚刚";
    }

}

export function getDate(dateString:string) {
    return dateString.substr(0,10)
}