"use client"

import { MdOutlineNotifications, MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useState, useMemo, Suspense, Dispatch, SetStateAction, useEffect } from 'react';
import { getMatchDates } from '../_utils/dateTime';
import Link from 'next/link';

const MATCH_STATUS = {
    "all": "",
    "live": "in_play",
    "upcoming": "timed",
    "finished": "finished"
}

const DATES = getMatchDates();

function DateAndStatusFilter({ setDate, setMatchStatus }: { setDate?: Dispatch<SetStateAction<string>>; setMatchStatus?: Dispatch<SetStateAction<string>>; }) {
    const [status, setStatus] = useState<keyof typeof MATCH_STATUS>("all");
    const [dateFilter, setDateFilter] = useState((new Date()).toDateString());

    const statusValue = useMemo(() => MATCH_STATUS[status], [status]);

    const [showStatus, setShowStatus] = useState(false);

    useEffect(() => { 
        if (!setDate || !setMatchStatus) return;
        setDate(dateFilter);
        setMatchStatus(statusValue);
    }, [statusValue, dateFilter]);

    return (
        <div className='border border-secondary-900/50 mt-2 py-2 px-3 flex justify-between items-center gap-3'>
            <button onClick={() => setShowStatus( prev => !prev )} className='py-[2px] px-2 pr-0 uppercase flex items-center justify-center rounded-[5px] bg-secondary-500 text-sm text-black-900 font-bold'>
                <span>{status}</span>
                { showStatus ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight /> }
            </button>
            <div className="flex-1 relative overflow-clip">
                <ul className={`w-full flex items-center justify-evenly gap-3 transition-[transform,opacity] ${showStatus && 'translate-x-[100%] opacity-0'}`}>
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
                <ul className={`absolute top-0 left-0 w-full h-full flex items-center justify-start gap-3 transition-[transform,opacity] ${!showStatus && 'translate-x-[-100%] opacity-0'}`}>
                    {
                        Object.keys(MATCH_STATUS)
                            .filter((title) => title !== status)
                            .map((title) => (
                                <li key={title}>
                                    <button onClick={() => setStatus((title as keyof typeof MATCH_STATUS))} className="py-1 px-3 flex rounded-[5px] bg-secondary-900/50 text-sm text-white-600 font-semibold">
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
