
import Link from "next/link";
import Image from "next/image";

import { Match } from "@/types/global.type";
import { getDay, getTimeFormat } from "../_utils/dateTime";


export default function MatchCardAlt({ id, match }: { id?: string; match: Match; }) {
    return (
        <Link href={`/match/${match._id}`} className={`${Number(id) == match._id && 'bg-white-100/10'} p-3 grid grid-cols-3 gap-3 rounded-lg hover:bg-white-100/5`}>
            <div className="flex flex-col col-span-2 gap-3">
                <div className="flex gap-2 items-center">
                    <Image src={match.homeTeam.crest} alt={`${match.homeTeam.name} crest`} width={20} height={20} className="w-4 max-h-4 aspect-square object-contain" />
                    <span className="flex-1 text-white-400 text-2xs font-semibold">{match.homeTeam.name}</span>
                    <span className="text-white-400 text-2xs font-semibold">{match.score.fullTime.home}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Image src={match.awayTeam.crest} alt={`${match.awayTeam.name} crest`} width={20} height={20} className="w-4 max-h-4 aspect-square object-contain" />
                    <span className="flex-1 text-white-400 text-2xs font-semibold">{match.awayTeam.name}</span>
                    <span className="text-white-400 text-2xs font-semibold">{match.score.fullTime.away}</span>
                </div>
            </div>
            <div className="flex items-center justify-center border-l border-white-100/10 pl-4">
                {
                    match.status !== 'TIMED' ?
                    <span className={`${/in_play|paused/i.test(match.status) ? 'text-green-400' : 'text-white-700'} text-2xs`}>
                        {
                        /in_play|paused|finished/i.test(match.status) ?
                            `${match.minute}${match.minute === 'HT' || match.minute === 'FT' ? "'" : ""}` :
                            match.status.substring(0, 4)
                        }
                    </span> :
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-2xs font-semibold text-white-400">{getDay(match.utcDate)}</span>
                        <span className="text-3xs text-white-700">{getTimeFormat(match.utcDate)}</span>
                    </div>
                }
            </div>
        </Link>
    )
}