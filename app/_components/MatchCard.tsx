"use client";

import { useMemo } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { getDateFormat, getTimeFormat } from "../_utils/dateTime";
import { getMatchTimeColor, getTeamColors } from "../_utils/colors";

import { Match } from "@/types/global.type";
import { IoStatsChart } from "react-icons/io5";

function MatchCard ({ _id, status, competition, minute, utcDate, homeTeam, awayTeam, score, predictionAvailable, rounded, showDateAndCompetition, showHalfTimeScore, small, teamId }: Match) {
    const router = useRouter();

    const showMinutes = useMemo(() => /(in_play|paused|finished)/i.test(status), []);
    const showTime = useMemo(() => status === 'TIMED', []);

    const matchTimeColor = useMemo(() => getMatchTimeColor(status), []);
    const time = useMemo(() => getTimeFormat(utcDate), []);
    const { homeTextColor, awayTextColor } = useMemo(() => getTeamColors(status, score), []);

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        if((event.target as HTMLElement).id !== `prediction-button-${_id}`) return;
        event.preventDefault();
        router.push(`/match/${_id}/prediction`);
    };

    return (
        <Link href={`/match/${_id}`} onClick={handleClick} className={`${rounded ? 'hover:rounded-md' : ''} hover:bg-white-100/5 flex flex-col justify-center gap-2 px-3 py-3 min-h-14 border-b border-white-100/10 last:border-b-transparent hover:border-transparent`}>
            {
                showDateAndCompetition ?
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-3xs text-white-700">{getDateFormat(utcDate)}</span>
                        <span className="flex items-center justify-center gap-2">
                            <span className="text-3xs text-white-700">{competition.name}</span>
                            <span className="flex items-center justify-center w-4 aspect-square rounded-full border border-white-100/20">
                                {
                                    <Image src={competition.emblem} alt={`${competition.name} emblem`} height={10} width={10} className="w-2 max-h-2 aspect-square object-contain" />
                                }
                            </span>
                        </span>
                    </div> :
                    null
            }
            <div className={`text-2xs grid ${showDateAndCompetition ? 'grid-cols-1' : 'grid-cols-[80px,_1fr,_80px]'} items-center`}>
                <div className={showDateAndCompetition ? 'hidden' : ''}>
                    {
                        showMinutes ?
                            <p className={`${matchTimeColor} h-4 min-w-6 w-fit flex items-center justify-center px-1 rounded-full text-3xs font-semibold uppercase`}>
                                {`${minute}${/(paused|finished)/i.test(status) ? "" : "'"}`}
                            </p> :
                            null
                    }
                </div>
                <div className="grid grid-cols-[1fr,_auto,_1fr] items-center justify-center gap-4">
                    <div className={`flex justify-end items-center gap-2 ${homeTextColor}`}>
                        <p className="font-semibold">{small ? homeTeam.shortName : homeTeam.name}</p>
                        <Image src={homeTeam.crest || String(process.env.NEXT_IMAGE_URI)} alt={homeTeam.name} height={24} width={24} className="w-6 aspect-square object-contain" />
                    </div>
                    <div>
                        {
                            showTime ?
                            <span className="font-semibold text-white-600 uppercase">
                                {time}
                            </span> :
                            <div className="flex flex-col items-center justify-center">
                                {
                                    teamId ?
                                        <span className={`${((teamId === String(homeTeam._id) && score?.[showHalfTimeScore ? 'firstHalf' : 'fullTime']?.home > score?.[showHalfTimeScore ? 'firstHalf' : 'fullTime']?.away) || (teamId === String(awayTeam._id) && score?.[showHalfTimeScore ? 'firstHalf' : 'fullTime']?.away > score?.[showHalfTimeScore ? 'firstHalf' : 'fullTime']?.home) ? 'bg-green-600' : score?.[showHalfTimeScore ? 'firstHalf' : 'fullTime']?.home > score?.[showHalfTimeScore ? 'firstHalf' : 'fullTime']?.away ? 'bg-white-600' : 'bg-red-500')} font-semibold text-white-100 flex items-center justify-center gap-1 h-6 rounded-md px-3`}>
                                            {showHalfTimeScore ? <span>{score?.firstHalf?.home}</span> : <span>{score?.fullTime?.home}</span>}
                                            <span>-</span>
                                            {showHalfTimeScore ? <span>{score?.firstHalf?.away}</span> : <span>{score?.fullTime?.away}</span>}
                                        </span> :
                                        <span className="flex items-center gap-1 text-white-500 font-semibold">
                                            {showHalfTimeScore ? <span>{score?.firstHalf?.home}</span> : <span>{score?.fullTime?.home}</span>}
                                            <span>-</span>
                                            {showHalfTimeScore ? <span>{score?.firstHalf?.away}</span> : <span>{score?.fullTime?.away}</span>}
                                        </span>
                                }
                                {
                                    score.secondHalf && !showHalfTimeScore ?
                                        <span className="text-3xs flex items-center justify-center gap-1 text-white-700">
                                            <span>({score?.firstHalf?.home}</span>
                                            <span>-</span>
                                            <span>{score?.firstHalf?.away})</span>
                                        </span> :
                                        null
                                }
                            </div>
                        }
                    </div>
                    <div className={`flex items-center gap-2 ${awayTextColor}`}>
                        <Image src={awayTeam.crest} alt={awayTeam.name} height={24} width={24} className="w-6 aspect-square object-contain" />
                        <p className="font-semibold">{small ? awayTeam.shortName : awayTeam.name}</p>
                    </div>
                </div>
                <div className={`${showDateAndCompetition ? 'hidden' : 'flex'} items-center justify-end`}>
                    {
                            predictionAvailable ?
                                <button id={`prediction-button-${_id}`} className="flex items-center justify-center w-4 aspect-square rounded-full text-white-700 hover:text-white-500">
                                    <IoStatsChart size={10} className="pointer-events-none" />
                                </button> :
                                null
                    }
                </div>
            </div>
        </Link>
    )
};

export default MatchCard
