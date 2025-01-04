"use client";

import MatchPredictionCard from "../_components/MatchPredictionCard";
import { ErrorMessage } from "../_components";
import { useContext, useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Match } from "@/types/global.type";
import { SocketContext } from "../SocketContext";
import { PredictionLoading } from "../_components/loading";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const QUERY = gql`
  query GetMatchPredictions($date: String, $status: String) {
    matchPredictions(from: $date, status: $status) {
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
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const { loading, error, data } = useQuery<{ matchPredictions: { matches: Match[], totalPages: number } }>(QUERY, {
    variables: { status }
  });

  const { socketData } = useContext(SocketContext);
  const matchPredictions = useMemo(() => data?.matchPredictions?.matches?.map((match) => ({
    ...match,
    ...(socketData.matches[match._id] || {})
  })), [socketData, data]);

  return (
    <div className="rounded-xl pb-3 bg-white-100/10 border border-transparent h-fit flex flex-col gap-4">
      <div className="grid grid-cols-[auto,_1fr,auto] gap-2 items-center p-3 ">
        <button className="w-6 aspect-square rounded-full bg-white-100/10 text-white-500 hover:bg-white-100/60 hover:text-black-900 flex items-center justify-center">
          <FiChevronLeft size={14} />
        </button>
        <button className="text-white-500 hover:text-white-600">
          <span className="text-xs font-semibold">Today</span>
        </button>
        <button className="w-6 aspect-square rounded-full bg-white-100/10 text-white-500 hover:bg-white-100/60 hover:text-black-900 flex items-center justify-center">
          <FiChevronRight size={14} />
        </button>
      </div>
      {
        loading ?
          <div className="mt-4 px-3">
            <PredictionLoading size={6} />
          </div> :
          <ul className="flex flex-col gap-3 px-3">
            {
              error ?
                <ErrorMessage /> :
                !matchPredictions ?
                  <div>Nothing to show</div> :
                  matchPredictions.map((match, index) => <MatchPredictionCard {...match} key={index} />)
            }
          </ul>
      }
    </div>
  )
};

export default Matches