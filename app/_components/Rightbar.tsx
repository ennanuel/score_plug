"use client";

import Image from "next/image";
import { getDateFormat, getTimeFormat, getTimeRemaining } from "../_utils/dateTime";

import { gql, useQuery } from "@apollo/client";
import { Match } from "@/types/global.type";
import LoadingMessage from "./LoadingMessage";
import ErrorMessage from "./ErrorMessage";


const QUERY = gql`
  query GetMatchAndPrediction {
    matchPredictions(limit: 1) {
      matches {
        _id
        status
        utcDate
        minute

        competition {
          _id
          name
          emblem
          area {
            name
            flag
          }
        }

        homeTeam {
          _id
          name
          crest
        }
        awayTeam {
          _id
          name
          crest
        }
        
        score {
          fullTime {
            home
            away
          }
        }

        predictions {
          fullTime {
            outcome {
              homeWin
              draw
              awayWin
            }
          }
        }
      }
    }

    matches(limit: 1) {
      matches {
        _id
        status
        utcDate
        minute
        venue

        competition {
          _id
          name
          emblem
          area {
            name
            flag
          }
        }

        homeTeam {
          _id
          name
          crest
        }
        awayTeam {
          _id
          name
          crest
        }
        
        score {
          fullTime {
            home
            away
          }
        }
      }
    }
  }
`

const Rightbar = () => {
  const { loading, error, data } = useQuery<{ matchPredictions: { matches: Match[] }, matches: { matches: Match[] } }>(QUERY);

  if (loading) return <div className="col-span-1"><LoadingMessage /></div>;
  else if (error) return <div className="col-span-1"><ErrorMessage /></div>;
  else if (!data) return <div className="col-span-1">Nothing to show!</div>;

  return (
    <div className="col-span-1 p-4 flex flex-col gap-6">
    <div className="border border-secondary-900/50 bg-primary-500 p-3">
        <h2 className="font-bold text-white-300 mb-2">Featured Match</h2>
        {
          data?.matches?.matches?.map((match) => (
            <div key={match._id}>
              <div className="grid grid-cols-3 bg-primary-800 py-2 px-4 rounded-md gap-2 shadow-lg">
                <span className="col-span-3 text-highlight-300 text-xs flex items-center gap-1">
                  <div className="w-[4px] aspect-square rounded-full bg-highlight-300" />
                  <span>Live</span>
                </span>
                <div className="flex flex-col justify-between ai-center gap-2">
                  <Image src={match.homeTeam.crest || String(process.env.NEXT_IMAGE_URL)} width={60} alt={match.homeTeam.name} className="aspect-square object-contain" />
                  <span className="truncate text-sm w-full font-semibold text-secondary-500">{match.homeTeam.name}</span>
                </div>
                {
                  /in_play|paused|finished/i.test(match.status) ?
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-highlight-400">
                        <span className="font-bold">{match.score.fullTime.home}</span>
                        <span>-</span>
                        <span className="font-bold">{match.score.fullTime.away}</span>
                      </span>
                      <span className="text-highlight-500 font-semibold">{/\w/i.test(match.minute) ? match.minute : `${match.minute}'`}</span>
                    </div> :
                    <p className="text-2xl font-bold flex items-center justify-center">
                      <span>V</span>
                    </p>
                }
                <div className="flex flex-col justify-between ai-center gap-2">
                  <Image src={match.awayTeam.crest || String(process.env.NEXT_IMAGE_URL)} width={60} alt={match.awayTeam.name} className="aspect-square object-contain" />
                  <span className="truncate text-sm w-full font-semibold text-secondary-500">{match.awayTeam.name}</span>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-secondary-800/10 to-secondary-800/30 shadow-lg p-3 mt-4">
                <div className="flex-[2] flex flex-col">
                  <span className="text-sm font-semibold text-secondary-400">{match.competition.name}</span>
                  <span className="text-xs text-secondary-600 border-l-2 border-highlight-500 pl-2">{match.venue || 'Venue unavailable'}</span>
                </div>
                <div className="w-[2px] h-[40px] mx-2 bg-secondary-200/20 rounded-md" />
                <div className="flex-[1] flex flex-col items-center jc-center">
                  <span className="text-md font-bold text-secondary-400">{getTimeFormat(match.utcDate)}</span>
                  {
                    match.status === "TIMED" ?
                      <span className="text-xs text-secondary-600 font-semibold">
                        <span>Starts in </span>
                        <span>{getTimeRemaining(match.timeRemaining).timeRemainder} {getTimeRemaining(match.timeRemaining).timeUnit}</span>
                      </span> :
                      <span className="text-xs text-secondary-600 font-semibold">{getDateFormat(match.utcDate)}</span>
                  }
                </div>
              </div>
            </div>
          ))
        }
    </div>

      <div className="border border-secondary-900/50 bg-primary-500 p-3">
        <h2 className="font-bold text-white-300 mb-2">Featured Prediction</h2>
        {
          data?.matchPredictions?.matches?.map((match) => (
            <div key={match._id} className="grid grid-cols-3 bg-primary-800 py-2 px-4 rounded-md gap-2 shadow-lg">
              <div className="col-span-3 text-highlight-300 text-xs flex items-center gap-1 font-semibold">
                <div className="w-[4px] h-full rounded-lg bg-highlight-300" />
                <span>{match.competition.name}</span>
              </div>
              <div className="flex flex-col justify-between ai-center gap-2">
                <div className="aspect-square rounded-2xl bg-white-100/5 flex items-center justify-center"></div>
                <span className="truncate text-sm w-full font-semibold text-secondary-500">{match.homeTeam.name}</span>
              </div>
                {
                  /in_play|paused|finished/i.test(match.status) ? 
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-3xl font-bold text-secondary-400">v</span>
                      <span className="text-secondary-700 font-semibold">12:00</span>
                    </div>:
                    <p className="text-2xl font-bold flex items-center justify-center">
                      <span>V</span>
                    </p>
                }
              <div className="flex flex-col justify-between ai-center gap-2">
                <div className="aspect-square rounded-2xl bg-white-100/5 flex items-center justify-center"></div>
                <span className="truncate text-sm w-full font-semibold text-secondary-500">{match.awayTeam.name}</span>
              </div>
              <div className="col-span-3">
                <div className="relative mt-1 mb-2 h-2 rounded-lg bg-secondary-900 overflow-clip">
                  <div className="absolute top-0 left-0 w-[100%] h-full rounded-r-lg bg-highlight-700 shadow-lg" />
                  <div style={{ width: `${match.predictions.fullTime.outcome.draw + match.predictions.fullTime.outcome.awayWin}%` }} className="absolute top-0 left-0 w-[80%] h-full rounded-r-lg bg-highlight-500 shadow-lg" />
                  <div style={{ width: `${match.predictions.fullTime.outcome.awayWin}%` }} className="absolute top-0 left-0 w-[50%] h-full rounded-r-lg bg-highlight-300" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex flex-col gap-[2px] text-center">
                    <span className="text-[.7em] text-secondary-600">Home</span>
                    <p className="text-sm font-semibold text-secondary-500 border border-highlight-400/40 bg-highlight-400/20 p-1">{match.predictions.fullTime.outcome.homeWin}%</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-[2px] text-center">
                    <span className="text-[.7em] text-secondary-600">Draw</span>
                    <p className="text-sm font-semibold text-secondary-500 border border-highlight-500/40 bg-highlight-500/20 p-1">{match.predictions.fullTime.outcome.draw}%</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-[2px] text-center">
                    <span className="text-[.7em] text-secondary-600">Away</span>
                    <p className="text-sm font-semibold text-secondary-500 border border-highlight-700/50 bg-highlight-700/20 p-1">{match.predictions.fullTime.outcome.awayWin}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Rightbar
