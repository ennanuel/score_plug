"use client";

import { useState, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ErrorMessage, CompetitionWithMatches } from './_components';
import { CompetitionWithMatchesLoading } from './_components/loading';

import { Competition } from '@/types/global.type';
import { IoFilter } from 'react-icons/io5';
import { getDay } from './_utils/dateTime';
import DateSelector from './_components/DateSelector';

const QUERY = gql`
  query GetActiveCompetitions($isLive: Boolean!, $fromDate: String, $toDate: String) {
    activeCompetitions(isLive: $isLive, from: $fromDate, to: $toDate) {
      _id
      name
      area {
        name
        flag
      }
      matches(from: $fromDate, to: $toDate) {
        _id
        status
        utcDate
        minute
        predictionAvailable
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
  const [date, setDate] = useState({ 
    fromDate: (new Date()).toDateString(), 
    toDate: (new Date()).toDateString()
  });
  
  const dateDisplayText = useMemo(() => (
    /(today|tomorrow|yesterday)/i.test(getDay(date.fromDate, true)) ? 
      `${getDay(date.fromDate, true)}'s matches` : 
      `${getDay(date.fromDate, true)} matches`
  ), [date]);

  const showLiveMatches = () => setStatus("IN_PLAY");
  const showAllMatches = () => setStatus("");

  const toggleMatchStatus = status === 'IN_PLAY' ? showAllMatches : showLiveMatches;

  const { loading, error, data } = useQuery<{ activeCompetitions: Competition[] }>(QUERY, { 
    variables: { 
      isLive: status === 'IN_PLAY',
      ...date
    } 
  });

  if (error) return <ErrorMessage />;

  return (
    <main className="flex flex-col gap-4">
      <div className="flex flex-col rounded-xl overflow-hidden border border-transparent bg-white-100/10">
        <div className="p-3">
          <DateSelector setDate={setDate} displayText={dateDisplayText} useCurrentDate />
        </div>
        <div className="border-t border-white-100/10 flex justify-between gap-2 p-3">
          <div className="flex items-center gap-2">
            <button onClick={toggleMatchStatus} className={`${status === "IN_PLAY" ? 'border-green-400 bg-green-400 text-black-900' : 'text-white-600 border-transparent bg-white-100/10 hover:text-white-500 hover:bg-white-100/20'} flex items-center justify-center gap-2 h-8 rounded-full border px-4`}>
              <span className="text-2xs font-semibold">Live</span>
            </button>
            <button className="flex items-center justify-center gap-2 text-white-600 hover:bg-white-100/20 hover:text-white-500 h-8 rounded-full bg-white-100/10 border border-transparent px-4">
              <span className="text-2xs font-semibold whitespace-nowrap">By time</span>
            </button>
          </div>
          <span className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-white-500 h-8 rounded-full bg-transparent border border-white-100/10 px-3 md:px-4">
            <IoFilter size={12} />
            <input type="text" placeholder="Filter" className='w-full text-2xs font-normal h-full bg-transparent focus:outline-none outline-none text-white-500 placeholder:text-white-600' />
          </span>
        </div>
      </div>
      <section className="flex flex-col gap-4">
        {
          loading ?
            <CompetitionWithMatchesLoading size={2} /> :
            data
            ?.activeCompetitions
            ?.map((competition, index) => (
              <CompetitionWithMatches {...competition} key={index} />
            ))
        }
      </section>
    </main>
  )
}

export default Home
