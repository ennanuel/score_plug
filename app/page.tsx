"use client";

import { useState } from 'react';
import { MdStar } from "react-icons/md";
import { COMPETITIONS } from './_assets/constants/competition';
import CompetitionWithMatches from './_components/CompetitionWithMatches';
import { Competition } from '@/types/competition.type';import { useQuery, gql } from '@apollo/client';

const GET_COMPETITION_DATA = gql`
  query {
    competitions {
      limit
      totalCompetitions
      page
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
  const [live, setLive] = useState(false);
  const onLive = () => setLive(true);
  const offLive = () => setLive(false);

  const { loading, error, data } = useQuery(GET_COMPETITION_DATA);

  console.log(data);

  return (
    <main className="border border-secondary-900/50 bg-primary-500 p-3">
      <div className="flex items-center justify-between px-3">
        <div className="relative flex items-center justify-stretch h-[30px] gap-2">
          <button onClick={offLive} className={`relative flex justify-center items-center gap-2 h-full px-3 rounded-md font-semibold ${!live ? 'text-orange-300 bg-orange-400/20': 'bg-black-900/50 text-orange-700'}`}>
            {!live && <span className="block w-2 aspect-square rounded-md bg-orange-300"></span>}
            <span>All</span>
          </button>
          <button onClick={onLive} className={`relative flex justify-center items-center gap-2 h-full px-3 rounded-md font-semibold ${live ? ' text-green-300 bg-green-400/20': 'bg-black-900/50 text-green-700'}`}>            
            {live && <span className="block w-2 aspect-square rounded-md bg-green-600"></span>}
            <span>Live</span>
          </button>
        </div>
        <MdStar />
      </div>
     
        <div className="bg-primary-800 py-3 px-4 rounded-lg mt-6">
        <h2 className="font-bold">Popular Leagues</h2>
        <ul className="flex flex-col gap-4">
          {
            COMPETITIONS.map((competition, index) => <li key={index}><CompetitionWithMatches {...(competition as Competition)} /></li>)
          }
        </ul>
      </div>

    </main>
  )
}

export default Home
