"use client"

import { MdOutlineNotifications, MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useState, useMemo, Suspense } from 'react';
import { getMatchDates } from '../_utils/dateTime';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const MATCH_STATUS = [
    { title: "All", value: "" },
    { title: "Live", value: "in_play" },
    { title: "Upcoming", value: "timed" },
    { title: "Finished", value: "finished" }
];

function DateAndStatusFilter() {
    const pathname = usePathname();
    const params = useSearchParams();
    const dateFilter = params.get("date") || (new Date()).toLocaleDateString();
    const statusFilter = params.get("status") || "";
    const status = MATCH_STATUS.find(status => status.value === statusFilter) || MATCH_STATUS[0];

    const [showStatus, setShowStatus] = useState(false);

    const dates = useMemo(() => getMatchDates(), []);

    return (
        <Suspense>
        <div className='border border-secondary-900/50 mt-2 py-2 px-3 flex justify-between items-center gap-3'>
            <button onClick={() => setShowStatus( prev => !prev )} className='py-[2px] px-2 pr-0 flex items-center justify-center rounded-[5px] bg-secondary-500 text-sm text-black-900 font-bold'>
                <span>{status.title}</span>
                { showStatus ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight /> }
            </button>
            <div className="flex-1 relative overflow-clip">
                <ul className={`w-full flex items-center justify-evenly gap-3 transition-[transform,opacity] ${showStatus && 'translate-x-[100%] opacity-0'}`}>
                    {
                        dates.map(({ date, value }, index) => (
                            <li key={index}>
                                <Link href={`${pathname}?date=${value}`} className={`flex flex-col items-center justify-center ${dateFilter === value ? 'text-highlight-400' : 'text-secondary-600'}`}>
                                    <span className="text-xs font-semibold uppercase">{date.dayOfWeek}</span>
                                    <span className='text-[.7em] uppercase'>{date.day} {date.month}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <ul className={`absolute top-0 left-0 w-full h-full flex items-center justify-start gap-3 transition-[transform,opacity] ${!showStatus && 'translate-x-[-100%] opacity-0'}`}>
                    {
                        MATCH_STATUS.filter(status => status.value !== statusFilter).map(({ title, value }, index) => (
                            <li key={index}>
                                <Link href={`${pathname}?status=${value}`} className="py-1 px-3 flex rounded-[5px] bg-secondary-900/50 text-sm text-white-600 font-semibold">
                                    <span>{title}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <button>
                    <MdOutlineNotifications />
            </button>
        </div>
        </Suspense>
    )
};

export default DateAndStatusFilter
