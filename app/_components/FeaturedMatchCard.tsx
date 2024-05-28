import { Match } from '@/types/global.type';
import Link from 'next/link';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { getDateFormat, getTimeFormat, getTimeRemaining } from '../_utils/dateTime';

function FeaturedMatchCard({ _id, competition, homeTeam, awayTeam, utcDate, status, timeRemaining, score, minute, venue }: Match) {
    const time = useMemo(() => getTimeFormat(utcDate), []);
    const date = useMemo(() => getDateFormat(utcDate), []);
    const { timeRemainder, timeUnit } = useMemo(() => getTimeRemaining(timeRemaining), []);
    
    console.log(score.fullTime, 'featured match');

    return (
        <Link href={`match/${_id}`} className="flex flex-col gap-2">
            <div className="grid grid-cols-3 border border-secondary-900/50 rounded-md shadow-lg">
                <span className="col-span-3 text-highlight-300 text-xs flex items-center gap-1 px-4 py-1 border-b border-secondary-900/50">
                    <div className="w-[4px] aspect-square rounded-full bg-highlight-300" />
                    {/in_play|paused/i.test(status) ? <span>Live</span> : <span>{competition.area.name}</span>}
                </span>
                <div className="flex flex-col justify-between items-center gap-2 p-2">
                    <Image src={homeTeam.crest || String(process.env.NEXT_IMAGE_URL)} width={60} alt={homeTeam.name} className="aspect-square object-contain" />
                    <span className="truncate text-sm text-center w-full font-semibold text-secondary-500">{homeTeam.name}</span>
                </div>
                {
                    /in_play|paused|finished/i.test(status) ?
                        <div className="flex flex-col items-center justify-center border-x border-secondary-900/50">
                            <div className={`flex flex-[2] items-center justify-center gap-1 text-[1.5rem] ${minute == 'FT' ? 'text-secondary-600' : 'text-highlight-400'}`}>
                                <span className="font-bold">{score.fullTime.home}</span>
                                <span>-</span>
                                <span className="font-bold">{score.fullTime.away}</span>
                            </div>
                            <span className={`${minute == 'FT' ? 'text-secondary-700 bg-secondary-900/30' : 'bg-highlight-700/20 text-highlight-500'} flex-1 font-semibold`}>{/\w/i.test(minute) ? minute : `${minute}'`}</span>
                        </div> :
                        <p className="text-2xl border-x border-secondary-900/50 font-bold flex items-center justify-center">
                            {status === 'TIMED' ? 'VS' : status.substring(0, 4)}
                        </p>
                }
                <div className="flex flex-col justify-between items-center gap-2 p-2">
                    <Image src={awayTeam.crest || String(process.env.NEXT_IMAGE_URL)} width={60} alt={awayTeam.name} className="aspect-square object-contain" />
                    <span className="truncate text-sm text-center w-full font-semibold text-secondary-500">{awayTeam.name}</span>
                </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-secondary-800/10 to-secondary-800/30 shadow-lg p-2">
                <div className="flex-[2] flex flex-col ml-2">
                    <span className="text-sm font-semibold text-secondary-400">{competition.name}</span>
                    <span className="text-xs text-secondary-600 border-l-2 border-highlight-500 pl-2">{venue || 'Venue unavailable'}</span>
                </div>
                <div className="w-[2px] h-[40px] mx-2 bg-secondary-200/20 rounded-md" />
                <div className="flex-[1] flex flex-col items-center justify-center">
                    <span className="text-md font-bold text-secondary-400">{time}</span>
                    {
                        status === "TIMED" ?
                            <span className="text-xs text-secondary-600 font-semibold text-center">
                                <span>Starts in </span>
                                <span>{timeRemainder} {timeUnit}</span>
                            </span> :
                            <span className="text-xs text-secondary-600 font-semibold">{date}</span>
                    }
                </div>
            </div>
        </Link>
    );
}

export default FeaturedMatchCard 
