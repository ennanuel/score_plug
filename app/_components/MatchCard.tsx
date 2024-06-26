"use client";

import Link from "next/link";
import Image from "next/image";
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { Match } from "@/types/global.type";
import { getDateFormat, getTimeFormat } from "../_utils/dateTime";
import { useMemo } from "react";
import { getHighlightBackground, getMatchCardBackground, getMatchTimeColor, getTeamColors } from "../_utils/colors";

function MatchCard ({ _id, status, minute, utcDate, homeTeam, awayTeam, score }: Match) {
    const showMinutes = useMemo(() => /(in_play|paused|finished)/i.test(status), []);
    const showTime = useMemo(() => status === 'TIMED', []);

    const timeTextColor = useMemo(() => getMatchTimeColor(status), []);
    const highlightBackground = useMemo(() => getHighlightBackground(status), []);
    const cardBackground = useMemo(() => getMatchCardBackground(status), []);
    const time = useMemo(() => getTimeFormat(utcDate), []);
    const date = useMemo(() => getDateFormat(utcDate), []);
    const { homeTextColor, awayTextColor } = useMemo(() => getTeamColors(status, score), []);

    return (
        <Link href={`/match/${_id}`} className={`flex items-center border-b border-secondary-900/50 last:border-transparent justify-between ${cardBackground} hover:border-transparent hover:bg-secondary-900/50 p-2`}>
            <div className={`h-[40px] w-[3px] rounded-md ${highlightBackground}`} />
            <p className={`px-4 py-3 ${timeTextColor} text-sm font-semibold w-[80px] text-center`}>
                {showMinutes ? `${minute}${/(paused|finished)/i.test(status) ? "" : "'"}` : showTime ? time : status.slice(0, 4)}
            </p>
            <div className="flex flex-1 flex-col gap-2">
                <div className={`flex items-center gap-2 ${homeTextColor}`}>
                    <Image src={homeTeam.crest || String(process.env.NEXT_IMAGE_URI)} alt={homeTeam.name} height={15} width={15} className="aspect-square object-contain" />
                    <p className="flex-1 text-xs font-semibold">{homeTeam.name}</p>
                    <span className="font-bold text-sm">{score.fullTime.home}</span>
                </div>
                <div className={`flex items-center gap-2 ${awayTextColor}`}>
                    <Image src={awayTeam.crest || String(process.env.NEXT_IMAGE_URI)} alt={awayTeam.name} height={15} width={15} className="aspect-square object-contain" />
                    <p className="flex-1 text-xs font-semibold">{awayTeam.name}</p>
                    <span className="font-bold text-sm">{score.fullTime.away}</span>
                </div>
            </div>
            <div className="flex items-center justify-center w-[60px] ml-2">
                {
                    status === 'FINISHED' ?
                        <p className="text-center text-xs font-semibold text-secondary-800">{date}</p> :
                        <MdOutlineNotificationsActive size={20} />
                }
            </div>
        </Link>
    )
};

export default MatchCard
