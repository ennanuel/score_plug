"use client";

import { useState } from 'react';
import { MdStar } from "react-icons/md";
import CompetitionWithMatches from './_components/CompetitionWithMatches';
import { Competition } from '@/types/global.type';
import { useQuery, gql } from '@apollo/client';
import { ErrorMessage, LoadingMessage } from './_components';

const QUERY = gql`
  query GetActiveCompetitions($status: String!) {
    activeCompetitions {
      _id
      name
      emblem
      area {
        name
      }
      matches (status: $status) {
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

  const { loading, error, data } = useQuery<{ activeCompetitions: Competition[] }>(QUERY, { variables: { status } });

  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return <div>Nothing was found</div>;

  return (
    <main className="border border-secondary-900/50 bg-primary-600 flex flex-col gap-4">
      <div className="p-3">
        <h2 className="font-bold">Today's Matches</h2>
        <div className="flex items-center justify-between px-3">
          <div className="relative flex items-center justify-stretch h-[30px] gap-2 text-sm">
            <button onClick={showAllMatches} className={`relative flex justify-center items-center gap-2 h-full px-3 rounded-sm font-semibold ${status === "" ? 'text-orange-300 bg-orange-400/20': 'bg-black-900/50 text-orange-700'}`}>
              {status === "" && <span className="block w-2 h-4 rounded-md bg-orange-300"></span>}
              <span>All</span>
            </button>
            <button onClick={showLiveMatches} className={`relative flex justify-center items-center gap-2 h-full px-3 rounded-sm font-semibold ${status === "IN_PLAY" ? ' text-green-300 bg-green-400/20': 'bg-black-900/50 text-green-700'}`}>            
              {status === "IN_PLAY" && <span className="block w-2 h-4 rounded-md bg-green-600"></span>}
              <span>Live</span>
            </button>
          </div>
          <MdStar />
        </div>
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
