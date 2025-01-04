import { useEffect, useMemo, useState } from "react";
import { getDay } from "../_utils/dateTime";
import { BsCaretDownFill } from "react-icons/bs";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24
const THREE_DAYS_IN_MS = ONE_DAY_IN_MS * 3;

export default function DateSelector({ showTwoDates, displayText, setDate, useCurrentDate }: { showTwoDates?: boolean; useCurrentDate?: boolean; displayText?: string; setDate?: React.Dispatch<React.SetStateAction<{ fromDate: string; toDate: string; }>> }) {
    const daysInterval = ONE_DAY_IN_MS;

    const [currentDate, setCurrentDate] = useState(new Date());
    const dateToDisplay = useMemo(() => (
        showTwoDates ? 
            `${getDay((new Date(currentDate.getTime() - daysInterval)).toDateString(), true)} - ${getDay(currentDate.toDateString(), true)}` : 
            getDay(currentDate.toDateString(), true)
    ), [currentDate]);
    
    const canPrev = useMemo(() => ((new Date(currentDate.toDateString())).getTime() - daysInterval) > (Date.now() - THREE_DAYS_IN_MS), [currentDate]);
    const canNext = useMemo(() => ((new Date(currentDate.toDateString())).getTime() + daysInterval) < (Date.now() + THREE_DAYS_IN_MS), [currentDate]);

    const nextDay = () => canNext && setCurrentDate(new Date(currentDate.getTime() + daysInterval));
    const prevDay = () => canPrev && setCurrentDate(new Date(currentDate.getTime() - daysInterval));

    useEffect(() => {
        if(!setDate) return;
        if(useCurrentDate) setDate({
            fromDate: currentDate.toDateString(),
            toDate: (new Date(currentDate.getTime() + ONE_DAY_IN_MS)).toDateString() 
        });
        else setDate({ 
            fromDate: (new Date(currentDate.getTime() - daysInterval)).toDateString(), 
            toDate: (new Date(currentDate.getTime() + ONE_DAY_IN_MS)).toDateString() 
        });
    }, [currentDate]);

    return (
        <div className="grid grid-cols-[auto,_1fr,_auto] gap-3 items-center">
            <button onClick={prevDay} className={`${!canPrev ? 'opacity-50 pointer-events-none' : ''} flex items-center justify-center bg-white-100/10 hover:bg-white-100/20 rounded-full w-6 aspect-square text-white-500`}>
                <FaAngleLeft size={12} />
            </button>
            <button className="flex items-center justify-center w-full gap-2 px-2 text-white-400 hover:text-white-600">
                <span className="font-bold text-xs">{displayText ? displayText : dateToDisplay}</span>
                <BsCaretDownFill size={10} />
            </button>
            <button onClick={nextDay} className={`${!canNext ? 'opacity-50 pointer-events-none' : ''} flex items-center justify-center bg-white-100/10 hover:bg-white-100/20 rounded-full w-6 aspect-square text-white-500`}>
                <FaAngleRight size={12} />
            </button>
        </div>
    )
}