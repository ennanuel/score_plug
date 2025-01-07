import { Match } from "@/types/global.type";
import Link from "next/link";
import Image from "next/image";
import { getTimeFormat } from "../_utils/dateTime";
import { useMemo } from "react";

function MatchPredictionCard({ _id, homeTeam, competition, awayTeam, utcDate, status, predictions, score, minute }: Match) {
  const time = useMemo(() => getTimeFormat(utcDate), []);

  return (
    <li className="rounded-lg bg-white-100/5 hover:bg-white-100/10">
      <Link href={`/match/${_id}/prediction`} className="grid grid-cols-2 grid-rows-[auto,_auto,_1fr] md:grid-rows-[auto,_1fr] gap-3 p-3">
        <div className="col-span-2 text-white-700 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-3xs font-semibold">{competition?.name}</span>
            <span className="text-3xs font-semibold">-</span>
            <span className="text-3xs font-semibold">{time}</span>
          </div>
          <span className="h-3 block">
            {
              status && /in_play|paused|finished/i.test(status) ?
                <span className={`${minute != 'FT' ? 'bg-yellow-400 text-black-900' : 'bg-white-100/10 text-white-100/50'} text-tiny font-semibold h-full rounded-full flex items-center justify-center px-1`}>
                  {/\w/i.test(minute) ? minute : `${minute}'`}
                </span> :
                status !== 'TIMED' ?
                  <span className="flex items-center justify-center bg-white-100/10 rounded-full h-full px-2 text-tiny font-semibold capitalize">
                    {status}
                  </span> :
                  null
            }
          </span>
        </div>
        <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
          <div className="grid grid-cols-[auto,_1fr,auto] items-center gap-2">
            <Image src={homeTeam?.crest || String(process.env.NEXT_IMAGE_URL)} width={16} height={16} alt={homeTeam?.name} className="w-5 max-h-5 aspect-square object-contain" />
            <span className="truncate text-2xs font-semibold text-white-500">{homeTeam?.name}</span>
            <span className="font-semibold text-2xs text-white-300">{score?.fullTime?.home}</span>
          </div>
          <div className="grid grid-cols-[auto,_1fr,auto] items-center gap-2">
            <Image src={awayTeam?.crest || String(process.env.NEXT_IMAGE_URL)} width={16} height={16} alt={awayTeam?.name} className="w-5 max-h-5 aspect-square object-contain" />
            <span className="truncate text-2xs font-semibold text-white-500">{awayTeam?.name}</span>
            <span className="font-semibold text-2xs text-white-300">{score?.fullTime?.away}</span>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 flex items-center gap-2">
          {
            [
              { title: "Home", outcome: predictions?.fullTime?.outcome?.homeWin }, 
              { title: "Draw", outcome: predictions?.fullTime?.outcome?.draw }, 
              { title: "Away", outcome: predictions?.fullTime?.outcome?.awayWin }
            ]
              .map((prediction, index) => (
                <div key={index} className="flex-1 flex items-center justify-center flex-col px-3 py-1 gap-1 rounded-md border bg-white-100/5 border-white-100/5">
                  <span className="text-3xs text-white-700">{prediction.title}</span>
                  <span className="text-2xs text-white-300">{prediction.outcome?.toFixed(2)}%</span>
                </div>
              ))
          }
        </div>
      </Link>
    </li>
  )
}

export default MatchPredictionCard;