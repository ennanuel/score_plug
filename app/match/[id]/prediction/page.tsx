"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import { ErrorMessage, NothingWasFound } from "@/app/_components";

import { Match } from "@/types/global.type";
import { DetailsLoading } from "@/app/_components/loading";
import { getMatchTeamColors } from "@/app/_utils/colors";
import Image from "next/image";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

const QUERY = gql`
  query GetMatchPrediction($id: ID!) {
    match(id: $id) {
      _id
      utcDate
      status
      minute
      score {
        firstHalf {
          home
          away
        }
        fullTime {
          home
          away
        }
      }
      competition {
        _id
        name
        area {
          name
          flag
        }
      }
      homeTeam {
        _id 
        name
        crest
        clubColors
      }
      awayTeam {
        _id
        name
        crest
        clubColors
      }
      predictions {
        halfTime {
          outcome {
            homeWin
            draw
            awayWin
          }
          goals {
            _1 {
              over
              under
            }
            _2 {
              over
              under
            }
            _3 {
              over
              under
            }
            _4 {
              over
              under
            }
          }
        }
        fullTime {
          outcome {
            homeWin
            draw
            awayWin
          }
          goals {
            _1 {
              over
              under
            }
            _2 {
              over
              under
            }
            _3 {
              over
              under
            }
            _4 {
              over
              under
            }
          }
        }
      }
    }
  }
`;

const GOALS_OUTCOME = {
  "_1": 0.5,
  "_2": 1.5,
  "_3": 2.5,
  "_4": 3.5
}

const MatchPrediction = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery<{ match: Match }>(QUERY, { variables: { id } });
  
  const [timePeriod, setTimePeriod] = useState<"halfTime" | "fullTime">("fullTime");

  const { homeTeamColor, awayTeamColor } = useMemo(() => (
    data ? {
      homeTeamColor: getMatchTeamColors(data.match.homeTeam.clubColors)[0],
      awayTeamColor: getMatchTeamColors(data.match.awayTeam.clubColors)[0]
    } : { homeTeamColor: '', awayTeamColor: '' }
  ), [data]);

  const { homeWin, draw, awayWin } = useMemo(() => (
    data?.match?.predictions?.[timePeriod]?.outcome?.homeWin && data?.match?.predictions?.[timePeriod]?.outcome?.awayWin && data?.match?.predictions?.[timePeriod]?.outcome?.draw ?
      {
        homeWin: data.match.predictions[timePeriod].outcome.homeWin,
        awayWin: data.match.predictions[timePeriod].outcome.awayWin,
        draw: data.match.predictions[timePeriod].outcome.draw
      } :
      { homeWin: 0, draw: 0, awayWin: 0 }
  ), [data, timePeriod]);

  if (loading) return <DetailsLoading />;
  else if (error) return <ErrorMessage />;
  else if (!data) return <NothingWasFound />;

  return (
    <div className="rounded-xl border border-transparent bg-[#191919]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white-100/10">
        {
          [{ title: "Full time", value: "fullTime" }, { title: "Half time", value: "halfTime" }].map(({ title, value }) => (
            <button 
              onClick={() => setTimePeriod(value as "halfTime" | "fullTime")} 
              className={`h-7 rounded-full px-3 flex items-center justify-center ${timePeriod === value ? 'bg-white-400 text-black-900' : 'bg-white-100/10 text-white-600'} hover:text-secondary-500`}
            >
              <span className="text-xs">{title}</span>
            </button>
          ))
        }
      </div>
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className='font-semibold text-white-100 text-sm'>Match outcome</h3>
          <span className="relative flex items-center justify-center h-6 px-3 rounded-full border border-white-100/20 text-white-600">
            <span className="text-2xs">{(homeWin > awayWin && homeWin > draw) ? 'Home win' : (awayWin > homeWin && awayWin > draw) ? 'Away win' : 'Draw'}</span>
          </span>
        </div>
        <div className="mt-6 flex gap-[2px]">
          <div style={{ width: `${homeWin}%` }} className="flex flex-col items-start gap-2 max-w-[calc(100%_-_128px)] min-w-16">
            <span className="relative h-12 w-full flex items-center justify-start px-4">
              <span style={{ backgroundColor: homeTeamColor }} className="rounded-l-full opacity-70 absolute top-0 left-0 w-full h-full block"></span>
              <span className="relative text-sm font-semibold text-white-100">{homeWin}%</span>
            </span>
            <Image src={data.match.homeTeam.crest} alt={`${data.match.homeTeam.name} crest`} width={24} height={24} className="ml-4 w-6 max-h-6 aspect-square object-contain" />
          </div>
          <div style={{ width: `${draw}%` }} className="flex flex-col gap-2 items-center max-w-[calc(100%_-_128px)] min-w-16">
            <span className="relative h-12 w-full flex items-center justify-center px-4">
              <span className="bg-white-100/10 absolute top-0 left-0 w-full h-full block"></span>
              <span className="relative text-sm font-semibold text-white-100">{draw}%</span>
            </span>
            <span className="text-xs font-semibold text-white-600">Draw</span>
          </div>
          <div style={{ width: `${awayWin}%` }} className="flex flex-col items-end gap-2 max-w-[calc(100%_-_128px)] min-w-16">
            <span className="relative h-12 w-full flex items-center justify-end px-4">
              <span style={{ backgroundColor: awayTeamColor }} className="rounded-r-full opacity-70 absolute top-0 left-0 w-full h-full block"></span>
              <span className="relative text-sm font-semibold text-white-100">{awayWin}%</span>
            </span>
          <Image src={data.match.awayTeam.crest} alt={`${data.match.awayTeam.name} crest`} width={24} height={24} className="mr-4 w-6 max-h-6 aspect-square object-contain" />
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 mt-8">
          <h3 className='font-semibold text-sm text-white-100 text-center'>Goals to be scored</h3>
          <span className="px-3 flex items-center justify-center h-6 border border-white-100/10 text-white-600 rounded-full">
            <span className="text-2xs">Over 2.5</span>
          </span>
        </div>
        <ul className="flex flex-col mt-4 rounded-md">
          {
            data?.match?.predictions?.[timePeriod]?.goals ?
              Object.entries(data.match.predictions[timePeriod].goals)
                .filter(([key, { over, under }]) => over || under)
                .map(([key, value]) => (
                  <li className="flex flex-col gap-1 py-3 border-b last:border-b-transparent border-white-100/10">
                    <div title={`Over ${GOALS_OUTCOME[key as keyof typeof GOALS_OUTCOME]} goals`} className="group grid grid-cols-[36px,_1fr,_64px] items-center gap-2">
                      <span className="w-14 text-white-700 group-hover:text-white-100 flex items-center justify-start gap-1">
                        <span className="text-2xs">{GOALS_OUTCOME[key as keyof typeof GOALS_OUTCOME]}</span>
                        <GoArrowUp size={12} />
                      </span>
                      <div>
                        <div style={{ width: `calc(${value.over}% - 60px)`, opacity: `${value.over || 20}%` }} className="w-full min-w-6 h-4 rounded-full flex items-center justify-end bg-white-100 group-hover:opacity-[100%_!important] px-2"></div>
                      </div>
                      <p className={`${Number(value.over) > Number(value.under) ? 'bg-white-100/20 text-white-100' : 'text-white-700'} group-hover:bg-white-100 group-hover:text-black-900 h-6 rounded-full flex items-center justify-center text-2xs`}>{value.over?.toFixed(2)}%</p>
                    </div>
                    <div title={`Under ${GOALS_OUTCOME[key as keyof typeof GOALS_OUTCOME]} goals`} className="group grid grid-cols-[36px,_1fr,_64px] items-center gap-2">
                      <span className="w-14 text-white-700 group-hover:text-white-100 flex items-center justify-start gap-1">
                        <span className="text-2xs">{GOALS_OUTCOME[key as keyof typeof GOALS_OUTCOME]}</span>
                        <GoArrowDown size={12} />
                      </span>
                      <div>
                        <div style={{ width: `calc(${value.under}% - 60px)`, opacity: `${Number(value.under) || 20}%` }} className="w-full min-w-6 h-4 rounded-full flex items-center justify-end bg-white-100 group-hover:opacity-[100%_!important] px-2"></div>
                      </div>
                      <p className={`${Number(value.under) > Number(value.over) ? 'bg-white-100/20 text-white-100' : 'text-white-700'} group-hover:bg-white-100 group-hover:text-black-900 h-6 rounded-full flex items-center justify-center text-2xs`}>{value.under?.toFixed(2)}%</p>
                    </div>
                  </li>
                )) :
                null
          }
        </ul>
      </div>
    </div>
  )
}

export default MatchPrediction
