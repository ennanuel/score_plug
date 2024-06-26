"use client";

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ErrorMessage, NothingWasFound, CompetitionWithMatches } from './_components';
import { CompetitionWithMatchesLoading } from './_components/loading';

import { Competition } from '@/types/global.type';

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

  if (error) return <ErrorMessage />;

  return (
    <main className="pb-4 bg-primary-600">
      <div className="flex items-center justify-between border-b border-secondary-900/50">
        <h2 className="font-bold px-4">Today's Matches</h2>
        <div className="h-[50px] flex items-stretch justify-stretch text-sm">
          <button onClick={showAllMatches} className={`flex justify-center items-center gap-4 px-4 min-w-[100px] font-semibold ${status === "" ? 'text-orange-300 bg-orange-400/20' : 'border-l border-secondary-900/50 text-orange-700'}`}>
            {status === "" && <span className="block w-1 h-4 rounded-md bg-orange-300"></span>}
            <span>All</span>
          </button>
          <button onClick={showLiveMatches} className={`flex justify-center items-center gap-4 px-4 min-w-[100px] font-semibold ${status === "IN_PLAY" ? 'border-l text-green-300 bg-green-400/20' : 'border-r border-secondary-900/50 text-green-700'}`}>
            {status === "IN_PLAY" && <span className="block w-1 h-4 rounded-md bg-green-600"></span>}
            <span>Live</span>
          </button>
        </div>
      </div>

      {
        loading ?
          <CompetitionWithMatchesLoading size={4} /> :
          data?.activeCompetitions?.length === 0 ?
            <NothingWasFound /> :
            <ul className="flex flex-col">
              {
                data?.activeCompetitions.map((competition, index) => <CompetitionWithMatches key={index} {...competition} />)
              }
            </ul>
      }
    </main>
  )
}

export default Home
