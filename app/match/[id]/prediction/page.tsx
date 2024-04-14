"use client";

import { useState, useMemo } from "react";
import { describeArc } from "@/app/_utils/shape";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import { ErrorMessage, LoadingMessage } from "@/app/_components";

import { Match } from "@/types/global.type";

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
      }
      awayTeam {
        _id
        name
        crest
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

const goalsOutcome = {
  "_1": 0.5,
  "_2": 1.5,
  "_3": 2.5,
  "_4": 3.5
}

const convertToPercentageOf360 = (value: number) => Number(((value / 100) * 360).toFixed(2));

const MatchPrediction = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery<{ match: Match }>(QUERY, { variables: { id } });
  
  const [timePeriod, setTimePeriod] = useState<"halfTime" | "fullTime">("halfTime");

  const homeArc = useMemo(() => data ? describeArc({ x: 45, y: 45, radius: 40, startAngle: 0, endAngle: convertToPercentageOf360(data?.match.predictions[timePeriod].outcome?.homeWin)}) : '360', [data, timePeriod]);
  const awayArc = useMemo(() => data ? describeArc({ x: 45, y: 45, radius: 40, startAngle: 0, endAngle: convertToPercentageOf360(data?.match.predictions[timePeriod].outcome?.awayWin)}) : '360', [data, timePeriod]);
  const drawArc = useMemo(() => data ? describeArc({ x: 45, y: 45, radius: 40, startAngle: 0, endAngle: convertToPercentageOf360(data?.match.predictions[timePeriod].outcome?.draw)}) : '360', [data, timePeriod]);

  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return <div>Nothing was found</div>;

  return (
    <div className="mt-2 p-2">
      <ul className="mx-3 mt-4 flex items-center gap-3">
        <button onClick={() => setTimePeriod("halfTime")} className={`h-[30px] rounded-md px-4 ${timePeriod === 'halfTime' ? 'bg-secondary-400 text-primary-600 font-semibold' : 'bg-secondary-900/50 text-secondary-700'} text-sm hover:text-secondary-500`}>Half-time</button>
        <button onClick={() => setTimePeriod("fullTime")} className={`h-[30px] rounded-md px-4 ${timePeriod === 'fullTime' ? 'bg-secondary-400 text-primary-600 font-semibold' : 'bg-secondary-900/50 text-secondary-700'} text-sm hover:text-secondary-500`}>Full-time</button>      </ul>
      <div className="p-2 mt-3">
        <h3 className='font-bold text-base mx-3'>Outcome</h3>
        <div className="p-4 mt-3 border border-white-100/10 rounded-md flex items-center justify-around gap-1">
            <div className="flex flex-col gap-1 items-center justify-center">
              <svg width="90px" height="90px">
                <circle className="stroke-[6px] stroke-secondary-900" fill="transparent" cx={45} cy={45} r={38} />
                <path className='stroke-[8px] stroke-highlight-400' fill="transparent" d={homeArc} />
              <text className='fill-highlight-300 font-bold text-lg translate-y-[2px]' x="50%" y="50%" textAnchor='middle' dominantBaseline="middle">
                {data.match.predictions[timePeriod].outcome.homeWin}%
              </text>
              </svg>
              <p className="text-sm text-secondary-600">Home</p>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <svg width="90px" height="90px">
                <circle className="stroke-[6px] stroke-secondary-900" fill="transparent" cx={45} cy={45} r={38} />
                <path className='stroke-[8px] stroke-highlight-600' fill="transparent" d={drawArc} />
              <text className='fill-highlight-300 font-bold text-lg translate-y-[2px]' x="50%" y="50%" textAnchor='middle' dominantBaseline="middle">
                {data.match.predictions[timePeriod].outcome.draw}%
              </text>
              </svg>
              <p className="text-sm text-secondary-600">Draw</p>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <svg width="90px" height="90px">
                <circle className="stroke-[6px] stroke-secondary-900" fill="transparent" cx={45} cy={45} r={38} />
                <path className='stroke-[8px] stroke-highlight-700' fill="transparent" d={awayArc} />
              <text className='fill-highlight-300 font-bold text-lg translate-y-[2px]' x="50%" y="50%" textAnchor='middle' dominantBaseline="middle">
                {data.match.predictions[timePeriod].outcome.awayWin}%
              </text>
              </svg>
              <p className="text-sm text-secondary-600">Away</p>
            </div>
          </div>

        <h3 className='font-bold text-base mt-6 mx-3'>Goals</h3>
        <ul className="flex flex-col mt-3 border border-white-100/10 rounded-md">
          {
            data.match.predictions[timePeriod].goals ?
              Object.entries(data.match.predictions[timePeriod].goals)
                .filter(([key, { over, under }]) => over || under)
                .map(([key, value]) => (
                  <li className="flex flex-col gap-1 p-4 border-b last:border-b-0 border-white-100/10">
                    <div className="flex items-center gap-2">
                      <p className="w-14 text-xs text-secondary-600">Ov. {goalsOutcome[key as keyof typeof goalsOutcome]}</p>
                      <div style={{ width: `calc(${value.over}% - 60px)` }} className="w-full min-w-[60px] h-[25px] flex items-center justify-end border border-highlight-400 bg-highlight-400/10 px-2">
                        <p className="text-highlight-400 font-semibold text-xs">{value.over?.toFixed(2)} <span className="font-normal">%</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="w-14 text-xs text-secondary-600">Un. {goalsOutcome[key as keyof typeof goalsOutcome]}</p>
                      <div style={{ width: `calc(${value.under}% - 60px)` }} className="w-full min-w-[60px]  h-[25px] flex items-center justify-end border border-highlight-600 bg-highlight-600/10 px-2">
                        <p className="text-highlight-600 font-semibold text-xs">{value.under?.toFixed(2)} <span className="font-normal">%</span></p>
                      </div>
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
