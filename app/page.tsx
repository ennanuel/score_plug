"use client";

import { useState } from 'react';
import { MdStar } from "react-icons/md";
import CompetitionWithMatches from './_components/CompetitionWithMatches';
import { Competition } from '@/types/global.type';
import { useQuery, gql } from '@apollo/client';
import { ErrorMessage, LoadingMessage } from './_components';

const QUERY = gql`
  query GetActiveCompetitions($isLive: Boolean!) {
    activeCompetitions(isLive: $isLive) {
      _id
      name
      emblem
      area {
        name
      }
      matches {
        _id
        status
        utcDate
        minute
        homeTeam {
          name
          crest
        }
        awayTeam {
          name 
          crest
        }
         score {
          fullTime {
            home
            away
          }
        }
      }
    }
  }
`;

function Home() {
  const [status, setStatus] = useState<"IN_PLAY" | "">("");
  const showLiveMatches = () => setStatus("IN_PLAY");
  const showAllMatches = () => setStatus("");

  const { loading, error, data } = useQuery<{ activeCompetitions: Competition[] }>(QUERY, { variables: { isLive: status === 'IN_PLAY' } });

  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return <div>Nothing was found</div>;

  return (
    <main className="py-4 bg-primary-600">
      <div className="flex items-center justify-between px-6 mt-4">
        <h2 className="font-bold">Today's Matches</h2>
        <MdStar />
      </div>
      <div className="mt-4 h-[50px] border-t border-secondary-900/50 flex items-stretch justify-stretch text-sm">
        <button onClick={showAllMatches} className={`flex justify-center items-center gap-2 px-4 min-w-[120px] font-semibold ${status === "" ? 'text-orange-300 bg-orange-400/20': 'border-r border-secondary-900/50 text-orange-700'}`}>
          {status === "" && <span className="block w-1 h-4 rounded-md bg-orange-300"></span>}
          <span>All</span>
        </button>
        <button onClick={showLiveMatches} className={`flex justify-center items-center gap-2 px-4 min-w-[120px] font-semibold ${status === "IN_PLAY" ? 'border-r border-secondary-900/50 text-green-300 bg-green-400/20': 'border-r border-secondary-900/50 text-green-700'}`}>            
          {status === "IN_PLAY" && <span className="block w-1 h-4 rounded-md bg-green-600"></span>}
          <span>Live</span>
        </button>
      </div>
      <ul className="flex flex-col">
          {
            data?.activeCompetitions.map((competition, index) => <li key={index}><CompetitionWithMatches {...competition} /></li>)
          }
      </ul>
    </main>
  )
}

export default Home
