
const msInHour = 60 * 60 * 1000;
const msInDay = 24 * msInHour;

export function daysHoursFromMs(ms) {
    const days = Math.floor(ms / msInDay);
    const remainingMS = ms % msInDay;
    const hours = Math.floor(remainingMS / msInHour)

    return `${days} days, ${hours} hours`;
}

export function daysToMs(days) {
    return days * msInDay;
}

export function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != d) {
        date.setDate(0);
    }
    return date;
}

export function todayDateString() {
    return new Date().toISOString().split('T')[0];
}

export function timeString(date) {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2,"0")}`;
}