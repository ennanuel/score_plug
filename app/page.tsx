"use client";

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ErrorMessage, NothingWasFound, CompetitionWithMatches } from './_components';
import { CompetitionWithMatchesLoading } from './_components/loading';

import { Competition } from '@/types/global.type';
import { FiChevronLeft } from 'react-icons/fi';
import { FaAngleRight } from 'react-icons/fa6';
import { BiCaretDown } from 'react-icons/bi';
import { FaAngleLeft } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';

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
    <main className="flex flex-col gap-4">
      <div className="flex flex-col rounded-lg overflow-hidden border border-white-100/10 bg-white-100/5">
        <div className="flex items-center justify-between gap-4 p-3">
            <button className="flex items-center justify-center bg-white-100/10 rounded-full w-6 aspect-square text-white-500">
              <FaAngleLeft size={12} />
            </button>
            <button className="flex items-center justify-center w-fit gap-2 px-2 text-white-400 hover:text-white-600">
              <span className="font-bold text-sm">Today's matches</span>
              <BiCaretDown size={12} />
            </button>
          <button className="flex items-center justify-center bg-white-100/10 rounded-full w-6 aspect-square text-white-500">
            <FaAngleRight size={12} />
          </button>
        </div>
        <div className="border-t border-white-100/5 flex justify-between gap-2 p-3">
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center gap-2 text-white-500 h-8 rounded-full bg-white/10 border border-white-100/10 px-4">
              <span className="text-xs font-semibold">Live</span>
            </button>
            <button className="flex items-center justify-center gap-2 text-white-500 h-8 rounded-full bg-white/10 border border-white-100/10 px-4">
              <span className="text-xs font-semibold">By Time</span>
            </button>
          </div>
          <span className="flex-1 flex items-center justify-center gap-3 text-white-500 h-8 rounded-full bg-white/10 border border-white-100/10 px-4">
            <IoFilter size={14} />
            <input type="text" placeholder="Filter" className='flex-1 text-xs font-semibold h-full bg-transparent focus:outline-none outline-none text-white-500 placeholder:text-white-600' />
          </span>
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
