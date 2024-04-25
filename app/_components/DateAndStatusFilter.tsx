"use client";

import { MdOutlineNotifications, MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useState, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import { getMatchDates } from '../_utils/dateTime';

const MATCH_STATUS = {
    "all": "",
    "live": "in_play",
    "upcoming": "timed",
    "finished": "finished"
}

const DATES = getMatchDates();

function DateAndStatusFilter({ setDate, setMatchStatus }: { setDate?: Dispatch<SetStateAction<string>>; setMatchStatus?: Dispatch<SetStateAction<string>>; }) {
    const [status, setStatus] = useState<keyof typeof MATCH_STATUS>("all");
    const [dateFilter, setDateFilter] = useState((new Date()).toLocaleDateString());

    const statusValue = useMemo(() => MATCH_STATUS[status], [status]);

    useEffect(() => { 
        if (!setDate || !setMatchStatus) return;
        console.log(dateFilter, statusValue);
        setDate(dateFilter);
        setMatchStatus(statusValue);
    }, [statusValue, dateFilter]);

    return (
        <div className='status-date-filter border border-secondary-900/50 mt-2 py-2 px-3 flex justify-between items-stretch'>
            <button className='status-btn border-r border-secondary-900/50 py-[2px] px-2 pr-1 uppercase flex items-center justify-center gap-2 text-sm text-secondary-500 font-bold'>
                <span>{status}</span>
                <span className="close-icon"><MdKeyboardArrowLeft size={20} /></span>
                <span className="open-icon"><MdKeyboardArrowRight size={20} /></span>
            </button>
            <div className="status-dates flex-1 relative overflow-clip pl-3">
                <ul className="dates flex items-center justify-evenly gap-3 transition-[transform,opacity]">
                    {
                        DATES.map(({ date, value }, index) => (
                            <li key={index}>
                                <button onClick={() => setDateFilter(value)} className={`flex flex-col items-center justify-center ${dateFilter === value ? 'text-highlight-400' : 'text-secondary-600'}`}>
                                    <span className="text-xs font-semibold uppercase">{date.dayOfWeek}</span>
                                    <span className='text-[.7em] uppercase'>{date.day} {date.month}</span>
                                </button>
                            </li>
                        ))
                    }
                </ul>
                <ul className="status absolute top-0 left-0 w-full h-full flex items-center justify-starttransition-[transform,opacity] translate-x-[-100%] opacity-0">
                    {
                        Object.keys(MATCH_STATUS)
                            .filter((title) => title !== status)
                            .map((title) => (
                                <li key={title}>
                                    <button onClick={() => setStatus((title as keyof typeof MATCH_STATUS))} className="capitalize border-r border-secondary-900/50 py-3 px-4 flex rounded-sm hover:bg-secondary-900/50 hover:text-secondary-500 text-sm text-white-600 font-semibold">
                                        <span>{title}</span>
                                    </button>
                                </li>
                            ))
                    }
                </ul>
            </div>
            <button>
                    <MdOutlineNotifications />
            </button>
        </div>
    )
};

export default DateAndStatusFilter
