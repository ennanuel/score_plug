"use client";

import { gql, useQuery } from "@apollo/client";
import { Match } from "@/types/global.type";
import ErrorMessage from "./ErrorMessage";
import MatchPredictionCard from "./MatchPredictionCard";
import FeaturedMatchCard from "./FeaturedMatchCard";
import { useContext, useMemo } from "react";
import { SocketContext } from "../SocketContext";
import { PredictionLoading } from "./loading";
import NothingWasFound from "./NothingWasFound";


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
      featuredPrediction: data.matches.matches[0] &&
        { ...(data.matchPredictions.matches[0]), ...(socketData.matches[data.matchPredictions.matches[0]?._id] || {}) },
      featuredMatch: data.matchPredictions.matches[0] &&
        { ...(data.matches.matches[0]), ...(socketData.matches[data.matches.matches[0]?._id] || {}) },
    } :
    {},
    [data, socketData]
  );

  return (
    <div className="sticky top-[50px] flex flex-col gap-2">
      <div className="border-b border-secondary-900/50 p-3">
        <h2 className="font-bold text-white-300 mb-4">Featured Match</h2>
        {
          loading ?
            <PredictionLoading size={1} full={true} /> :
            error ?
              <ErrorMessage /> :
              featuredMatch ?
                <FeaturedMatchCard {...(featuredMatch as Match)} /> :
                <NothingWasFound text="Not available today" />
        }
      </div>

      <div className="p-3">
        <h2 className="font-bold text-white-300 mb-4">Featured Prediction</h2>
        {
          loading ?
            <PredictionLoading size={1} full={true} /> :
            error ?
              <ErrorMessage /> :
              featuredPrediction ?
                <MatchPredictionCard {...(featuredPrediction as Match)} /> :
                <NothingWasFound text="Not available today" />
        }
      </div>
    </div>
  )
}

export default Rightbar
