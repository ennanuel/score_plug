import { Match } from "@/types/match.type";
import Link from "next/link";
import Image from "next/image";
import { getTimeFormat } from "../_utils/dateTime";

function MatchPredictionCard({ _id, homeTeam, competition, awayTeam, utcDate, status, outcome, score, minute }: Match) {
  const time = getTimeFormat(utcDate);

  return (
    <Link href={`/match/${_id}/prediction`} className="grid grid-cols-3 bg-primary-800 py-2 px-4 rounded-md gap-2 shadow-lg">
      {
        status === 'IN_PLAY' || status === 'PAUSED' ? 
          <div className="col-span-3 text-highlight-300 text-xs flex items-center gap-1">
            <div className="w-[4px] aspect-square rounded-full bg-highlight-300" />
            <span>Live</span>
          </div> : 
          <div className="col-span-3 text-highlight-300 text-xs flex items-center gap-1 font-semibold">
            <div className="w-[4px] h-full rounded-lg bg-highlight-300" />
            <span>{competition.name}</span>
          </div>
      }
      <div className="flex flex-col justify-between items-center gap-2">
        <Image src={homeTeam.crest} alt={homeTeam.name} width={50} className="aspect-square object-contain" />
        <span className="truncate text-sm w-full font-semibold text-secondary-500">{homeTeam.name}</span>
      </div>
      {
        status === 'TIMED' ? 
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-bold text-secondary-400">v</span>
            <span className="text-secondary-700 font-semibold text-center">{time}</span>
          </div> :
          <div className="flex flex-col items-center justify-center">
            <span className={`${/in_play|paused/i.test(status) ? 'text-highlight-400' : 'text-secondary-500'} text-3xl font-bold`}>
              {score.fullTime.homeTeam} - {score.fullTime.awayTeam}
            </span>
            <span className={`${/in_play|paused/i.test(status) ? 'text-highlight-500' : 'text-secondary-600'} font-semibold`}>{minute}'</span>
          </div>
      }
          <div className="flex flex-col justify-between items-center gap-2">
            <Image src={awayTeam.crest} alt={awayTeam.name} width={50} className="aspect-square object-contain" />
            <span className="truncate text-sm w-full font-semibold text-secondary-500">{awayTeam.name}</span>
          </div>
          <div className="col-span-3">
            <div className="relative mt-1 mb-2 h-2 rounded-lg bg-secondary-900 overflow-clip">
              <div className="absolute top-0 left-0 w-[100%] h-full rounded-r-lg bg-highlight-700 shadow-lg" />
              <div style={{ width: `${outcome.draw + outcome.homeWin}%`}} className="absolute top-0 left-0 h-full rounded-r-lg bg-highlight-500 shadow-lg" />
              <div style={{ width: `${outcome.homeWin}%`}} className="absolute top-0 left-0 h-full rounded-r-lg bg-highlight-300" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex flex-col gap-[2px] text-center">
                <span className="text-[.7em] text-secondary-600">Home</span>
                        <p className="text-sm font-semibold text-secondary-500 border border-highlight-400/40 bg-highlight-400/20 p-1">{outcome.homeWin}%</p>
              </div>
              <div className="flex-1 flex flex-col gap-[2px] text-center">
                <span className="text-[.7em] text-secondary-600">Draw</span>
                <p className="text-sm font-semibold text-secondary-500 border border-highlight-500/40 bg-highlight-500/20 p-1">{outcome.draw}%</p>
              </div>
              <div className="flex-1 flex flex-col gap-[2px] text-center">
                <span className="text-[.7em] text-secondary-600">Away</span>
                <p className="text-sm font-semibold text-secondary-500 border border-highlight-700/50 bg-highlight-700/20 p-1">{outcome.awayWin}%</p>
              </div>
            </div>
          </div>
    </Link>
  )
};

export default MatchPredictionCard;