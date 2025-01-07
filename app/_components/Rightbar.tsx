"use client";

import { gql, useQuery } from "@apollo/client";
import { Match, Team } from "@/types/global.type";

import { useContext, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

import { CompetitionLoading, PredictionLoading } from "./loading";

import { SocketContext } from "../SocketContext";
import { getDay, getTimeFormat, getTimeRemaining } from "../_utils/dateTime";
import ErrorSidebar from "./ErrorSidebar";

type QueryResult = {
  matchPredictions: { matches: Match[] };
  topTeams: { teams: Team[]; };
}

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

        timeRemaining {
          days
          hours
          minutes
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

    topTeams(limit: 10) {
      limit
      teams {
        _id
        name
        crest
        area {
          name
          flag
        }
      }
    }
  }
`;

const Rightbar = () => {
  const { socketData } = useContext(SocketContext);

  const { loading, error, data } = useQuery<QueryResult>(QUERY);

  const { teams, featuredPrediction } = useMemo(() => data ?
    {
      featuredPrediction: Boolean(data.matchPredictions.matches.length) ? data?.matchPredictions.matches[0] : null,
      teams: Boolean(data?.topTeams?.teams?.length) ? data.topTeams.teams : null,
    } :
    {},
    [data, socketData]
  );

  if(error) return <ErrorSidebar />

  return (
    <div className="flex flex-col gap-4">
      {
        featuredPrediction ?
          <div className="flex flex-col bg-white-100/10 border border-transparent rounded-xl">
            <Link href="/predictions" className="p-3 flex items-center justify-center font-semibold text-sm text-white-400 hover:text-white-600">
              <span className="text-xs text-center">Featured match</span>
            </Link>
            {
              loading ?
              <PredictionLoading size={1} full /> :
              featuredPrediction ?
                <Link href={`match/${featuredPrediction._id}`} className="flex flex-col gap-2 p-2 pt-0">
                  <div className="grid grid-cols-[1fr,_auto,_1fr] gap-2 shadow-lg p-2 min-h-20 rounded-lg bg-white-100/5">
                    <div className="flex flex-col justify-center items-center gap-1">
                        <Image src={featuredPrediction.homeTeam.crest || String(process.env.NEXT_IMAGE_URL)} width={40} height={40} alt={featuredPrediction.homeTeam.name} className="aspect-square w-10 max-h-10 object-contain" />
                        <span className="truncate text-3xs max-w-[10ch] text-center w-full font-semibold text-white-300">{featuredPrediction.homeTeam.name}</span>
                    </div>
                    {
                        /in_play|paused|finished/i.test(featuredPrediction.status) ?
                            <div className="flex flex-col items-center justify-center">
                                <div className={`text-base flex items-center justify-center gap-1 text-white-400`}>
                                    <span className="font-bold">{featuredPrediction.score.fullTime.home}</span>
                                    <span>-</span>
                                    <span className="font-bold">{featuredPrediction.score.fullTime.away}</span>
                                </div>
                                <span className={`text-2xs ${featuredPrediction.minute == 'FT' ? 'text-white-700' : 'text-yellow-500'} font-semibold`}>{/\w/i.test(featuredPrediction.minute) ? featuredPrediction.minute : `${featuredPrediction.minute}'`}</span>
                            </div> :
                            featuredPrediction.status === 'TIMED' ?
                              <p className="flex flex-col items-center justify-start">
                                <span className="text-sm font-semibold text-white-500">{getTimeFormat(featuredPrediction.utcDate)}</span>
                                <span className="text-3xs text-white-700">{getDay(featuredPrediction.utcDate)}</span>
                                <span className="font-semibold text-3xs text-white-700">{Object.values(getTimeRemaining(featuredPrediction.timeRemaining)).reverse().join(' ')}</span>
                              </p> :
                              <p className="text-white-400 font-bold flex items-center justify-center">
                                  {featuredPrediction.status.substring(0, 4)}
                              </p>
                    }
                    <div className="flex flex-col justify-center items-center gap-1">
                        <Image src={featuredPrediction.awayTeam.crest || String(process.env.NEXT_IMAGE_URL)} width={40} height={40} alt={featuredPrediction.awayTeam.name} className="aspect-square w-10 max-h-10 object-contain" />
                        <span className="truncate text-3xs max-w-[10ch] text-center w-full font-semibold text-white-300">{featuredPrediction.awayTeam.name}</span>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-1 p-2 rounded-lg bg-gradient-to-r from-white-100/10 to-white-400/20">
                    <span className="text-tiny text-white-300">Predictions</span>
                    <div className="flex gap-1">
                      <div className="flex-1 flex flex-col justify-center items-center bg-white-100/5 rounded-md px-2 h-8 border border-white-100/5">
                        <span className="text-tiny text-white-600">Home</span>
                        <span className="text-3xs text-white-500">10.04%</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-center bg-white-100/5 rounded-md px-2 h-8 border border-white-100/5">
                        <span className="text-tiny text-white-600">Draw</span>
                        <span className="text-3xs text-white-500">30.22%</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-center bg-white-100/5 rounded-md px-2 h-8 border border-white-100/5">
                        <span className="text-tiny text-white-600">Away</span>
                        <span className="text-3xs text-white-500">59.74%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-tiny text-white-700">Predictions can be wrong</span>
                      <button className="text-tiny text-white-500 hover:text-white-600">More matches</button>
                    </div>
                  </div>
                </Link> :
                null
            }
          </div> :
          null
      }
      <div className="flex flex-col gap-4 bg-white-100/10 border border-transparent rounded-xl pb-2">
        <div className="p-4 pb-0 flex items-center justify-between font-semibold text-sm text-white-300 hover:text-white-600">
          <span className="text-xs">Top Teams</span>
        </div>
        <ul className="flex flex-col">
          {
            loading ?
              <CompetitionLoading size={8} small /> :
              teams
                ?.map((team) => (
                  <li key={team._id}>
                    <Link href={`/team/${team._id}`} className="flex items-center gap-4 px-4 h-8 text-white-500 hover:bg-white-100/10">
                      <Image src={team.crest} alt={`${team.name} crest`} width={20} height={20} className="w-4 aspect-square object-contain rounded-full" />
                      <span className="text-2xs flex-1">{team.name}</span>
                    </Link>
                  </li>
                ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Rightbar
