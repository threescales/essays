

export default class DatetimeUtil {
    static getFormattedDateString(datetime: Date) {
        let year = datetime.getFullYear()
        let month = DatetimeUtil.getFormattedNumberString(datetime.getMonth() + 1)
        let date = DatetimeUtil.getFormattedNumberString(datetime.getDate())
        let hour = DatetimeUtil.getFormattedNumberString(datetime.getHours())
        let minute = DatetimeUtil.getFormattedNumberString(datetime.getMinutes())
        return year + '-' + month + '-' + date
    }
    static postgrestoDate(dateStr:string) {
        return new Date(dateStr)
    }
    static getFormattedNumberString(n: number) {
        return n < 10 ? '0' + n : n
    }
    static convertDateFromString(dateString) {
        return new Date(dateString.replace(/\-/g, "/"))
    }
    static reTime(histime) {
        var now = new Date().getTime(),
            diffValue = now - histime.getTime(),
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
    static timestampToString(time) {
        var date = new Date(time);
        var Y = date.getFullYear() + '-',
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
            D = date.getDate() + ' ',
            h = date.getHours() + ':',
            m = date.getMinutes() + ':',
            s = date.getSeconds();
        return Y + M + D + h + m + s
    }
}
