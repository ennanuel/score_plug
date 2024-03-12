"use client";

import { useState } from 'react';
import { MdStar } from "react-icons/md";
import CompetitionWithMatches from './_components/CompetitionWithMatches';
import { Competition } from '@/types/competition.type';
import { useQuery, gql } from '@apollo/client';
import { ErrorMessage, LoadingMessage } from './_components';

// const getCompetitionData = ({ page, status }: { page: number; status: "IN_PLAY" | "" }) => gql`
//   query (page: ${page}, status: ${status}) {
const QUERY = gql`
  query {
    competitions {
      totalPages
      currentPage
      competitions {
        _id
        name
        emblem
        area {
          name
          flag
        }
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
          status
          utcDate
          score {
            fullTime {
              home
              away
            }
          }
          minute
        }
      }
    }
  }
`;

function Home() {
  const [status, setStatus] = useState<"IN_PLAY" | "">("");
  const [page, setPage] = useState(0);
  const showLiveMatches = () => setStatus("IN_PLAY");
  const showAllMatches = () => setStatus("");

  const { loading, error, data } = useQuery<{ competitions: { competitions: Competition[]; totalPages: number; page: number; } }>(QUERY);

  if (loading) return <LoadingMessage />
  
  if (error) return <ErrorMessage />;

  return (
    <main className="border border-secondary-900/50 bg-primary-500 p-3">
      <div className="flex items-center justify-between px-3">
        <div className="relative flex items-center justify-stretch h-[30px] gap-2">
          <button onClick={showAllMatches} className={`relative flex justify-center items-center gap-2 h-full px-3 rounded-md font-semibold ${status === "" ? 'text-orange-300 bg-orange-400/20': 'bg-black-900/50 text-orange-700'}`}>
            {status === "" && <span className="block w-2 aspect-square rounded-md bg-orange-300"></span>}
            <span>All</span>
          </button>
          <button onClick={showLiveMatches} className={`relative flex justify-center items-center gap-2 h-full px-3 rounded-md font-semibold ${status === "IN_PLAY" ? ' text-green-300 bg-green-400/20': 'bg-black-900/50 text-green-700'}`}>            
            {status === "IN_PLAY" && <span className="block w-2 aspect-square rounded-md bg-green-600"></span>}
            <span>Live</span>
          </button>
        </div>
        <MdStar />
      </div>
     
        <div className="bg-primary-800 py-3 px-4 rounded-lg mt-6">
        <h2 className="font-bold">Popular Leagues</h2>
        <ul className="flex flex-col gap-4">
          {
            data?.competitions?.competitions?.map((competition, index) => <li key={index}><CompetitionWithMatches {...competition} /></li>)
          }
        </ul>
      </div>

    </main>
  )
}

export default Home
