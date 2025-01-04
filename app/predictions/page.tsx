"use client";

import MatchPredictionCard from "../_components/MatchPredictionCard";
import { ErrorMessage } from "../_components";
import { useContext, useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Match } from "@/types/global.type";
import { SocketContext } from "../SocketContext";
import { PredictionLoading } from "../_components/loading";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import DateSelector from "../_components/DateSelector";

const QUERY = gql`
  query GetMatchPredictions($fromDate: String, $toDate: String, $status: String) {
    matchPredictions(from: $fromDate, to: $toDate, status: $status) {
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

  const { loading, error, data } = useQuery<{ matchPredictions: { matches: Match[], totalPages: number } }>(QUERY, {
    variables: { ...date }
  });

  const { socketData } = useContext(SocketContext);
  const matchPredictions = useMemo(() => data?.matchPredictions?.matches?.map((match) => ({
    ...match,
    ...(socketData.matches[match._id] || {})
  })), [socketData, data]);

  return (
    <div className="rounded-xl pb-3 bg-white-100/10 border border-transparent h-fit flex flex-col gap-4">
      <div className="gap-2 items-center p-3 ">
        <DateSelector setDate={setDate} />
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