"use client";

import MatchPredictionCard from "../_components/MatchPredictionCard";
import { DateAndStatusFilter, ErrorMessage, LoadingMessage } from "../_components";
import { useContext, useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Match } from "@/types/global.type";
import { SocketContext } from "../SocketContext";
import { PredictionLoading } from "../_components/loading";

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
    variables: { date, status }
  });

  const { socketData } = useContext(SocketContext);
  const matchPredictions = useMemo(() => data?.matchPredictions?.matches?.map((match) => ({
    ...match,
    ...(socketData.matches[match._id] || {})
  })), [socketData, data]);

  return (
    <div className="p-4">
      <h2 className="col-span-2 font-bold text-2xl mb-2 mx-3 mt-4">Match Predictions</h2>
      <DateAndStatusFilter setDate={setDate} setMatchStatus={setStatus} />
      {
        true ?
          <div className="mt-4">
            <PredictionLoading size={6} />
          </div> :
          <ul className="grid grid-cols-2 gap-4 mt-4">
            {
              error ?
                <ErrorMessage /> :
                !matchPredictions ?
                  <div>Nothing to show</div> :
                  matchPredictions?.map((match, index) => <li key={index}><MatchPredictionCard {...match} /></li>)
            }
          </ul>
      }
    </div>
  )
};

export default Matches