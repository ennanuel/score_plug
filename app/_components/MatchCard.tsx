"use client";

import Link from "next/link";
import Image from "next/image";
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { Match, MatchScore, MatchStatus } from "@/types/match.type";
import { HIGHLIGHT_BACKGROUNDS, MATCH_CARD_BACKGROUNDS } from "../_assets/constants/match";
import { getDateFormat, getTimeFormat } from "../_utils/dateTime";

function getHighlightBackground(matchStatus: MatchStatus): string { 
    const index = matchStatus.toLowerCase() as keyof typeof HIGHLIGHT_BACKGROUNDS;
    return HIGHLIGHT_BACKGROUNDS[index] || 'bg-white-100/5';
};

function getMatchCardBackground(matchStatus: MatchStatus): string { 
    const index = matchStatus.toLowerCase() as keyof typeof MATCH_CARD_BACKGROUNDS;
    return MATCH_CARD_BACKGROUNDS[index] || 'bg-transparent';
};

function getTeamColors(status: MatchStatus, score: MatchScore) {
    const result = { homeTextColor: 'text-secondary-300', awayTextColor: 'text-secondary-400' };
    if (score.fullTime.homeTeam < score.fullTime.awayTeam) result.homeTextColor = 'text-secondary-700';
    else if (score.fullTime.awayTeam < score.fullTime.homeTeam) result.awayTextColor = 'text-secondary-700';
    else if (status !== 'TIMED' && (score.fullTime.awayTeam === score.fullTime.homeTeam)) result.homeTextColor = result.awayTextColor = 'text-secondary-700';
    return result;
}

function MatchCard ({ _id, status, minutes, utcDate, homeTeam, awayTeam, score }: Match) {
    const showMinutes = /(in_play|paused|finished)/i.test(status);
    const showTime = status === 'TIMED';
    const timeTextColor = status !== 'IN_PLAY' ?
        (status === 'PAUSED' ? 'text-highlight-600' : 'FINISHED' ? 'text-secondary-800' : 'text-secondary-500') :
        'text-highlight-400';
    const highlightBackground = getHighlightBackground(status);
    const cardBackground = getMatchCardBackground(status);
    const time = getTimeFormat(utcDate);
    const date = getDateFormat(utcDate);
    const { homeTextColor, awayTextColor } = getTeamColors(status, score);

    return (
        <Link href={`/match/${_id}`} className={`flex items-center justify-between ${cardBackground} hover:bg-secondary-900/80 rounded-md p-2`}>
            <div className={`h-[50px] w-[6px] rounded-md ${highlightBackground}`} />
            <p className={`px-4 py-3 ${timeTextColor} ${showMinutes ? 'text-base' : 'text-sm'} font-semibold w-[80px] text-center`}>
                {showMinutes ? `${minutes}'` : showTime ? time : status.slice(0, 4)}
            </p>
            <div className="flex flex-1 flex-col gap-2">
                <div className={`flex items-center gap-2 ${homeTextColor}`}>
                    <Image src={homeTeam.crest} alt={homeTeam.name} width={20} />
                    <p className="flex-1 text-sm font-semibold">{homeTeam.name}</p>
                    <span className="font-bold text-sm">{score.fullTime.homeTeam}</span>
                </div>
                <div className={`flex items-center gap-2 ${awayTextColor}`}>
                    <Image src={awayTeam.crest} alt={awayTeam.name} width={20} />
                    <p className="flex-1 text-sm font-semibold">{awayTeam.name}</p>
                    <span className="font-bold text-sm">{score.fullTime.awayTeam}</span>
                </div>
            </div>
            <div className="flex items-center justify-center w-[60px] ml-2">
                {
                    status === 'FINISHED' ?
                        <p className="text-center text-xs font-semibold text-secondary-800">21 Mar. 2023</p> :
                        <MdOutlineNotificationsActive size={20} />
                }
            </div>
        </Link>
    )
};

export default MatchCard
