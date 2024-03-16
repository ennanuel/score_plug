const MONTHS_ARRAY = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_IN_A_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

export function getDateFormat(dateString: string): string {
    const date = new Date(dateString);
    const month = MONTHS_ARRAY[date.getMonth()]?.substring(0, 3);
    const dateFormat = `${date.getDate()} ${month}, ${date.getFullYear()}`;
    return dateFormat;
};

export function getTimeFormat(dateString: string): string {
    const time = (new Date(dateString)).toTimeString();
    const [hours, minutes, ...others] = time.split(":");
    const timeFormat = `${hours}:${minutes}`;
    return timeFormat;
};

export function getMatchDates(): { date: { day: number, month: string, dayOfWeek: string }, value: string }[] {
    const dates = [];
    const currentDate = Date.now();
    const startDate = currentDate - (1000 * 3600 * 72);
    const endDate = currentDate + (1000 * 3600 * 48);
    for (let dateNumber = startDate; dateNumber <= endDate; dateNumber += (1000 * 3600 * 24)) {
        const date = new Date(dateNumber);
        const day = date.getDate();
        const month = MONTHS_ARRAY[date.getMonth()];
        const dayOfWeek = DAYS_IN_A_WEEK[date.getDay()];
        const fullDate = date.toLocaleDateString();
        dates.push({ date: { day, month, dayOfWeek }, value: fullDate });
    }
    return dates;
 };