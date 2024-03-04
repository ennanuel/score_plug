const MONTHS_ARRAY = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function getDateFormat(dateString: string): string {
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const month = MONTHS_ARRAY[monthIndex].substring(0, 3);
    const dateFormat = `${date.getDate()} ${month}, ${date.getFullYear()}`;
    return dateFormat;
};

export function getTimeFormat(dateString: string): string {
    const time = (new Date(dateString)).toLocaleTimeString();
    const [hourString, minuteString, others] = time.split(":");
    const hours = /AM/i.test(others) ?
        (hourString == '12' ? 0 : Number(hourString)) :
        (hourString == '12' ? Number(hourString) : Number(hourString) + 12);
    const timeFormat = `${hours < 10 ? '0' + hours : hours}:${minuteString}`;
    return timeFormat;
}