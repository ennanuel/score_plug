"use client";

import { gql, useQuery } from "@apollo/client";
import { Match } from "@/types/global.type";
import LoadingMessage from "./LoadingMessage";
import ErrorMessage from "./ErrorMessage";
import MatchPredictionCard from "./MatchPredictionCard";
import FeaturedMatchCard from "./FeaturedMatchCard";
import { useContext, useMemo } from "react";
import { SocketContext } from "../SocketContext";


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

        timeRemaining {
          days
          hours
          minutes
        }
      }
    }
  }
`

const Rightbar = () => {
  const { socketData } = useContext(SocketContext);

  const { loading, error, data } = useQuery<{ matchPredictions: { matches: Match[] }, matches: { matches: Match[] } }>(QUERY);

  const { match, prediction } = useMemo(() => data && ({
    match: { ...(data.matches.matches[0]), ...(socketData.matches[data.matches.matches[0]?._id] || {}) },
    prediction: { ...(data.matchPredictions.matches[0]), ...(socketData.matches[data.matchPredictions.matches[0]?._id] || {}) },
  }), [data, socketData]);

  if (loading) return <div className="col-span-1"><LoadingMessage /></div>;
  else if (error) return <div className="col-span-1"><ErrorMessage /></div>;
  else if (!data) return <div className="col-span-1">Nothing to show!</div>;

  return (
    <div className="sticky top-[50px] flex flex-col gap-2">
      <div className="border-b border-secondary-900/50 p-3">
        <h2 className="font-bold text-white-300 mb-4">Featured Match</h2>
        {
          data?.matches?.matches?.map((match) => <FeaturedMatchCard key={match._id} {...match} />)
        }
      </div>

      <div className="p-3">
        <h2 className="font-bold text-white-300 mb-4">Featured Prediction</h2>
        {
          data?.matchPredictions?.matches?.map((match) => <MatchPredictionCard key={match._id} {...match} />)
        }
      </div>

    </div>
  )
}

export default Rightbar
