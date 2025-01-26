"use client";

import MatchPredictionCard from "../_components/MatchPredictionCard";
import { ErrorMessage, NothingWasFound } from "../_components";
import { useContext, useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Match } from "@/types/global.type";
import { SocketContext } from "../SocketContext";
import { PredictionLoading } from "../_components/loading";
import DateSelector from "../_components/DateSelector";
import { BsCaretDownFill } from "react-icons/bs";

const QUERY = gql`
  query GetMatchPredictions($fromDate: String, $toDate: String, $status: String, $limit: Float) {
    matchPredictions(from: $fromDate, to: $toDate, status: $status, limit: $limit) {
        totalPages
        matches {
            _id
            minute
            status
            utcDate
            homeTeam {
              name
              crest
            }
            awayTeam {
              name
              crest
            }
            competition {
              name
              emblem
              area {
                  name
                  flag
              }
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
  }
`;


const Matches = () => {
  const [date, setDate] = useState({ fromDate: "", toDate: "" });
  const [limit, setLimit] = useState(10);

  const { loading, error, data } = useQuery<{ matchPredictions: { matches: Match[], totalPages: number } }>(QUERY, {
    variables: { ...date, limit }
  });

  const { socketData } = useContext(SocketContext);
  const matchPredictions = useMemo(() => data?.matchPredictions?.matches?.map((match) => ({
    ...match,
    ...(socketData.matches[match._id] || {})
  })), [socketData, data]);

  if(error) return <ErrorMessage />

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl pb-3 bg-white-100/10 border border-transparent h-fit flex flex-col gap-4">
        <div className="gap-2 items-center p-3 ">
          <DateSelector setDate={setDate} useCurrentDate />
        </div>
        {
          loading ?
            <div className="mt-4 px-3">
              <PredictionLoading size={6} />
            </div> :
            !loading && !matchPredictions?.length ?
              <NothingWasFound /> :
            <ul className="flex flex-col gap-3 px-3">
              {matchPredictions?.map((match, index) => <MatchPredictionCard {...match} key={index} />)}
            </ul>
        }
      </div>
      {
          Number(data?.matchPredictions?.totalPages) > 1 ?
              <button onClick={() => setLimit(limit + 10)} className="m-auto w-fit flex items-center justify-center gap-2 px-4 h-10 rounded-full bg-white-100/20 text-white-300 hover:bg-white-100/30">
                  <span className="font-semibold text-white-300 text-2xs">Show more</span>
                  <BsCaretDownFill size={10} />
              </button> :
              null
      }
    </div>
  )
};

export default Matches