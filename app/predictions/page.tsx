"use client";

import MatchPredictionCard from "../_components/MatchPredictionCard";
import { Match } from "@/types/match.type";
import { DateAndStatusFilter, ErrorMessage, LoadingMessage } from "../_components";
import { Suspense } from "react";
import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query {
    matchPredictions {
        totalPages
        matches {
            _id
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
  const { loading, error, data } = useQuery<{ matchPredictions: { matches: Match[], totalPages: number } }>(QUERY);

  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;


  return (
    <Suspense>
      <div className="border border-secondary-900/50 bg-primary-500 p-3">
        <h2 className="col-span-2 font-bold text-2xl mb-2 mx-3 mt-4">Match Predictions</h2>
        <DateAndStatusFilter />
        <ul className="grid grid-cols-2 gap-4 mt-4">
          {
            data?.matchPredictions?.matches.map((match, index) => <li key={index}><MatchPredictionCard {...match} /></li>)
          }
        </ul>
      </div>
    </Suspense>
  )
};

export default Matches