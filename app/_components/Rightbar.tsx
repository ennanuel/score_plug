"use client";

import { gql, useQuery } from "@apollo/client";
import { Match } from "@/types/global.type";
import ErrorMessage from "./ErrorMessage";
import MatchPredictionCard from "./MatchPredictionCard";
import FeaturedMatchCard from "./FeaturedMatchCard";
import { useContext, useMemo } from "react";
import { SocketContext } from "../SocketContext";
import { PredictionLoading } from "./loading";


type QueryResult = {
  matches: { matches: Match[] };
  matchPredictions: {matches: Match[]};
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
`;

const Rightbar = () => {
  const { socketData } = useContext(SocketContext);

  const { loading, error, data } = useQuery<QueryResult>(QUERY);

  const { featuredMatch, featuredPrediction } = useMemo(() => data ?
    {
      featuredPrediction: { ...(data.matches.matches[0]), ...(socketData.matches[data.matches.matches[0]?._id] || {}) },
      featuredMatch: { ...(data.matchPredictions.matches[0]), ...(socketData.matches[data.matchPredictions.matches[0]?._id] || {}) },
    } :
    {},
    [data, socketData]
  );

  console.log(data);

  if (error) return <div className="col-span-1"><ErrorMessage /></div>;

  return (
    <div className="sticky top-[50px] flex flex-col gap-2">
      <div className="border-b border-secondary-900/50 p-3">
        <h2 className="font-bold text-white-300 mb-4">Featured Match</h2>
        {
          loading ?
            <PredictionLoading size={1} full={true} /> :
            featuredMatch ?
              <FeaturedMatchCard {...(featuredMatch as Match)} /> :
              <p className="border border-secondary-900/50 p-6 h-[160px]">Nothing to show</p>
        }
      </div>

      <div className="p-3">
        <h2 className="font-bold text-white-300 mb-4">Featured Prediction</h2>
        {
          loading ?
            <PredictionLoading size={1} full={true} /> :
            featuredPrediction ?
              <MatchPredictionCard {...(featuredPrediction as Match)} /> :
              <p className="border border-secondary-900/50 p-6 h-[160px]">Nothing to show</p>
        }
      </div>
    </div>
  )
}

export default Rightbar
