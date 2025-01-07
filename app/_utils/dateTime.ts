import { Match } from "@/types/global.type";
import { MatchTimeRemaining } from "@/types/match.type";

const MONTHS_ARRAY = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_IN_A_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

const ONE_DAY_IN_MILLISECONDS = 86400000;
const TWO_DAYS_IN_MILLISECONDS = 172800000;
const ONE_WEEK_IN_MILLISECONDS = 604800000;
const ONE_MONTH_IN_MILLISECONDS = 2592000000;
const ONE_YEAR_IN_MILLISECONDS = 31536000000;

export function getDay (dateString: string, showDate?: boolean): string {
    const dateStringToNumber = /\D/.test(dateString) ? dateString : Number(dateString);
    const timeInMilliseconds = (new Date(new Date(dateStringToNumber).toDateString())).getTime();
    const timeDifference = timeInMilliseconds - (new Date((new Date(Date.now())).toDateString())).getTime();
    
    if (timeDifference >= 0 && timeDifference < ONE_DAY_IN_MILLISECONDS) return "Today";
    else if(timeDifference < 0 && timeDifference >= -ONE_DAY_IN_MILLISECONDS) return "Yesterday";
    else if (timeDifference >= ONE_DAY_IN_MILLISECONDS && timeDifference < TWO_DAYS_IN_MILLISECONDS) return "Tomorrow";
    else if (timeDifference >= TWO_DAYS_IN_MILLISECONDS && timeDifference < ONE_WEEK_IN_MILLISECONDS && !showDate) return `${Math.floor(timeDifference/ONE_DAY_IN_MILLISECONDS)} days`;
    else if (timeDifference >= ONE_WEEK_IN_MILLISECONDS && timeDifference < ONE_MONTH_IN_MILLISECONDS && !showDate) return `${Math.floor(timeDifference/ONE_WEEK_IN_MILLISECONDS)} ${Math.floor(timeDifference/ONE_WEEK_IN_MILLISECONDS) === 1 ? "week" : "weeks"}`;
    else if (timeDifference >= ONE_MONTH_IN_MILLISECONDS && timeDifference < ONE_YEAR_IN_MILLISECONDS && !showDate) return `${Math.floor(timeDifference/ONE_MONTH_IN_MILLISECONDS)} ${Math.floor(timeDifference/ONE_MONTH_IN_MILLISECONDS) === 1 ? "month" : "months"}`;
    else if (timeDifference >= ONE_YEAR_IN_MILLISECONDS && !showDate) return `${Math.round(timeDifference/ONE_YEAR_IN_MILLISECONDS)} ${Math.floor(timeDifference/ONE_YEAR_IN_MILLISECONDS) === 1 ? "year" : "years"}`;
    else return getDateFormat(dateString);
}

export function getDateFormat(dateString: string): string {
    const dateStringOrNumber = /\D/.test(dateString) ? dateString : Number(dateString);
    const date = new Date(dateStringOrNumber);
    const month = MONTHS_ARRAY[date.getMonth()]?.substring(0, 3);
    const dateFormat = `${date.getDate()} ${month}, ${date.getFullYear()}`;
    return dateFormat;
};

export function getTimeFormat(dateString: string): string {
    const dateStringOrNumber = /\D/.test(dateString) ? dateString : Number(dateString);
    const time = (new Date(dateStringOrNumber)).toTimeString();
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
 
export function getTimeRemaining (timeRemaining?: MatchTimeRemaining) {
    if (!timeRemaining) return { timeUnit: '', timeRemainder: 0 };
    const [unit, timeRemainder] = Object.entries(timeRemaining).find(([key, value]) => Number(value) >= 1) || [];
    const timeUnit = timeRemainder === 1 ? unit?.replace(/s$/, '') : unit;
    return { timeUnit, timeRemainder }
}

function separateMatch(separatedMatches: { [key: string]: Match[] }, match: Match) {
    const matchDay = (new Date(/\D/.test(match.utcDate) ? match.utcDate : Number(match.utcDate))).toDateString();
    const result = { ...separatedMatches };

    if(separatedMatches[matchDay]) result[matchDay] = [match, ...result[matchDay]];
    else result[matchDay] = [match];

    return result;
};

const sortMatches = (matchA: Match, matchB: Match, sortType: string) => (
    sortType === 'team' ? 
        matchA.homeTeam.name.toLowerCase().localeCompare(matchB.homeTeam.name.toLowerCase()) : 
        sortType === 'round' ? 
            Number(matchA.matchday) - Number(matchB.matchday) : 
            0
);

export function seperateMatchesByDate(matches: Match[] | undefined, sortType: string) {
    if(!matches) return [];

    const separatedMatches = matches.reduce(separateMatch, ({} as { [key: string]: Match[] }));
    const result = (Object
        .entries(separatedMatches)
        .map(([key, values]) => [
            key,
            values
                .slice()
                .sort((matchA, matchB) => sortMatches(matchA, matchB, sortType))
        ]) as [string, Match[]][])
        .reverse();
    
    return result
}