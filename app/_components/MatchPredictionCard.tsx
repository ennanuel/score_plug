import { Match } from "@/types/global.type";
import Link from "next/link";
import Image from "next/image";
import { getTimeFormat } from "../_utils/dateTime";
import { useMemo } from "react";

function MatchPredictionCard({ _id, homeTeam, competition, awayTeam, utcDate, status, predictions, score, minute }: Match) {
  const time = useMemo(() => getTimeFormat(utcDate), []);

  console.log(predictions, 'featured prediction');

  return (
    <Link href={`/match/${_id}/prediction`} className="flex flex-col gap-2">
      <div className="grid grid-cols-3 border border-secondary-900/50 rounded-md shadow-lg">
        <div className="col-span-3 border-b border-secondary-900/50 p-2 text-highlight-300 text-xs flex items-center gap-1 font-semibold">
          <div className="w-[4px] h-full rounded-lg bg-highlight-300" />
          <span>{competition.name}</span>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 p-2">
          <Image src={homeTeam.crest || String(process.env.NEXT_IMAGE_URL)} width={60} alt={homeTeam.name} className="aspect-square object-contain" />
          <span className="truncate text-sm text-center w-full font-semibold text-secondary-500">{homeTeam.name}</span>
        </div>
        {
          /in_play|paused|finished/i.test(status) ?
            <div className="flex flex-col border-x border-secondary-900/50">
              <div className={`flex flex-[2] items-center justify-center gap-1 text-[1.7rem] ${minute == 'FT' ? 'text-secondary-600' : 'text-highlight-400'} border-b border-secondary-900/50`}>
                <span className="font-bold">{score.fullTime.home}</span>
                <span>-</span>
                <span className="font-bold">{score.fullTime.away}</span>
              </div>
              <span className={`${minute != 'FT' ? 'bg-highlight-700/20 text-highlight-500' : 'bg-secondary-900/30 text-secondary-800'} font-semibold flex-1 flex items-center justify-center`}>{/\w/i.test(minute) ? minute : `${minute}'`}</span>
            </div> :
            <p className="text-2xl font-bold flex flex-col border-x border-secondary-900/50">
              <span className="text-2xl font-bold flex-[2] flex items-center justify-center border-b border-secondary-900/50">
                {status === 'TIMED' ? 'VS' : status.substring(0, 4)}
              </span>
              <span className="text-sm text-secondary-700 flex-1 flex items-center justify-center">{time}</span>
            </p>
        }
        <div className="flex flex-col justify-between items-center gap-2 p-2">
          <Image src={awayTeam.crest || String(process.env.NEXT_IMAGE_URL)} width={60} alt={awayTeam.name} className="aspect-square object-contain" />
          <span className="truncate text-sm text-center w-full font-semibold text-secondary-500">{awayTeam.name}</span>
        </div>
      </div>
      <div>
        <div className="relative mt-1 mb-2 h-2 rounded-lg bg-secondary-900 overflow-clip">
          <div className="absolute top-0 left-0 w-[100%] h-full rounded-r-lg bg-highlight-700 shadow-lg" />
          <div style={{ width: `${predictions.fullTime.outcome.draw + predictions.fullTime.outcome.homeWin}%` }} className="absolute top-0 left-0 w-[80%] h-full rounded-r-lg bg-highlight-500 shadow-lg" />
          <div style={{ width: `${predictions.fullTime.outcome.homeWin}%` }} className="absolute top-0 left-0 w-[50%] h-full rounded-r-lg bg-highlight-300" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex flex-col gap-[2px] text-center">
            <span className="text-[.7em] text-secondary-600">Home</span>
            <p className="text-sm font-semibold text-secondary-500 border border-highlight-400/40 bg-highlight-400/20 p-1">{predictions.fullTime.outcome.homeWin}%</p>
          </div>
          <div className="flex-1 flex flex-col gap-[2px] text-center">
            <span className="text-[.7em] text-secondary-600">Draw</span>
            <p className="text-sm font-semibold text-secondary-500 border border-highlight-500/40 bg-highlight-500/20 p-1">{predictions.fullTime.outcome.draw}%</p>
          </div>
          <div className="flex-1 flex flex-col gap-[2px] text-center">
            <span className="text-[.7em] text-secondary-600">Away</span>
            <p className="text-sm font-semibold text-secondary-500 border border-highlight-700/50 bg-highlight-700/20 p-1">{predictions.fullTime.outcome.awayWin}%</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MatchPredictionCard;