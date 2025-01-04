"use client"

import { gql, useQuery } from '@apollo/client';
import { ErrorMessage, LoadingMessage, MatchHeader } from '../';
import { useParams } from 'next/navigation';

import { Competition } from '@/types/global.type';
import { Match } from "@/types/global.type";
import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDay, getTimeFormat } from '@/app/_utils/dateTime';
import { DetailsHeaderLoading, DetailsLoading } from '../loading';

const QUERY = gql`
  query GetSimilarMatch($id: ID!) {
    match(id: $id) {
      homeTeam {
        name
        crest
      }
      awayTeam {
        name
        crest
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

    similarMatches(id: $id) {
      matches {
        _id
        minute
        status
        utcDate

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
      }
      
      competition {
        _id
        name
        emblem

        currentSeason {
          currentMatchday
        }
      }
    }
  }
`;

type QueryResult = {
  match: Match;
  similarMatches: {
    competition: Competition;
    matches: Match[];
  }
};

const MatchLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { id } = useParams();

  const { loading, error, data } = useQuery<QueryResult>(QUERY, { variables: { id } });

  const { competition, matches } = useMemo(() => data?.similarMatches ? data.similarMatches : { competition: null, matches: [] }, [data]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-[1fr,_240px] lg:grid-cols-[1fr,_320px] gap-4'>
      <div className="flex flex-col gap-4">
        <MatchHeader />
        {children}
      </div>
      {
        loading ? 
          <div className="flex flex-col gap-4">
            <DetailsHeaderLoading />
            <DetailsLoading />
          </div> :
          <div className="flex flex-col gap-4">
            {
              data?.match?.predictions?.fullTime?.outcome?.homeWin && data?.match?.predictions?.fullTime?.outcome?.awayWin  ?
                <div className="flex flex-col p-4 gap-4 items-center justify-center rounded-xl bg-white-100/10 border border-transparent">
                  <span className="text-sm font-semibold text-white-500">Who will win?</span>
                  <div className="mt-4 w-full flex justify-between items-between gap-2 px-6">
                    <div className="flex flex-col items-center justify-center gap-4 w-10">
                      <span className="w-6 aspect-square flex items-center justify-center">
                        <Image src={data.match.homeTeam.crest} alt={`${data.match.homeTeam.name} crest`} width={24} height={24} className="w-full h-full object-contain" />
                      </span>
                      <span className="text-sm text-white-500">{Math.round(Number(data.match.predictions?.fullTime?.outcome?.homeWin))}%</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 w-10">
                      <span className="flex w-6 aspect-square items-center justify-center text-lg font-semibold text-white-700">X</span>
                      <span className="text-sm text-white-700">{Math.round(Number(data.match.predictions?.fullTime?.outcome?.draw))}%</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 w-10">
                      <span className="w-6 aspect-square flex items-center justify-center">
                        <Image src={data.match.awayTeam.crest} alt={`${data.match.awayTeam.name} crest`} width={24} height={24} className="w-full h-full object-contain" />
                      </span>
                      <span className="text-sm text-white-500">{Math.round(Number(data.match.predictions?.fullTime?.outcome?.awayWin))}%</span>
                    </div>
                  </div>
                  <Link href={`/match/${id}/prediction`} className='text-2xs text-white-700 hover:underline hover:text-white-600'>Show all predictions</Link>
                </div> :
                null
            }
            {
              matches.length ?
                <div className="rounded-xl bg-white-100/10 border border-transparent">
                  <div className="p-3 flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-white-400">{competition?.name}</span>
                      <span className="text-white-700 text-2xs">Round {competition?.currentSeason?.currentMatchday}</span>
                    </div>
                    <span className="flex items-center justify-center w-10 max-h-10 aspect-square rounded-full border border-white-100/10">
                      <Image 
                        src={String(competition?.emblem || process.env.NEXT_IMAGE_URI)} 
                        height={40} 
                        width={40} 
                        alt={`${competition?.name} emblem`} className="w-6 aspect-square object-contain" 
                      />
                    </span>
                  </div>
                  <ul className="flex flex-col">
                    {
                      matches.map((match) => (
                        <li key={match._id} className='p-2 border-t border-white-100/10'>
                          <Link href={`/match/${match._id}`} className={`${Number(id) == match._id && 'bg-white-100/10'} p-3 grid grid-cols-3 gap-3 rounded-lg hover:bg-white-100/5`}>
                            <div className="flex flex-col col-span-2 gap-3">
                              <div className="flex gap-2 items-center">
                                <Image src={match.homeTeam.crest} alt={`${match.homeTeam.name} crest`} width={20} height={20} className="w-4 max-h-4 aspect-square object-contain" />
                                <span className="flex-1 text-white-400 text-2xs font-semibold">{match.homeTeam.name}</span>
                                <span className="text-white-400 text-2xs font-semibold">{match.score.fullTime.home}</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <Image src={match.awayTeam.crest} alt={`${match.awayTeam.name} crest`} width={20} height={20} className="w-4 max-h-4 aspect-square object-contain" />
                                <span className="flex-1 text-white-400 text-2xs font-semibold">{match.awayTeam.name}</span>
                                <span className="text-white-400 text-2xs font-semibold">{match.score.fullTime.away}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-center border-l border-white-100/10 pl-4">
                              {
                                match.status !== 'TIMED' ?
                                  <span className={`${/in_play|paused/i.test(match.status) ? 'text-green-400' : 'text-white-700'} text-2xs`}>
                                    {
                                      /in_play|paused|finished/i.test(match.status) ?
                                        `${match.minute}${match.minute === 'HT' || match.minute === 'FT' ? "'" : ""}` :
                                        match.status.substring(0, 4)
                                    }
                                  </span> :
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="text-2xs font-semibold text-white-400">{getDay(match.utcDate)}</span>
                                    <span className="text-3xs text-white-700">{getTimeFormat(match.utcDate)}</span>
                                  </div>
                              }
                            </div>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div> :
                null
            }
          </div>
      }
    </div>
  )
}

export default MatchLayout
