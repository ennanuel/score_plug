"use client";

import { MdStarOutline } from 'react-icons/md';
import { MATCHES } from '../_assets/constants/match';
import MatchCard from '../_components/MatchCard';
import { Match } from '@/types/match.type';
import { DateAndStatusFilter, ErrorMessage, LoadingMessage } from '../_components';
import { Suspense } from 'react';
import { useQuery, gql } from '@apollo/client';

const QUERY = gql`
  query {
    matches {
        totalPages
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


function Matches() {
    const { loading, error, data } = useQuery<{ matches: { matches: Match[], totalPages: number } }>(QUERY);

    return (
        <Suspense>
            <div className="border border-secondary-900/50 bg-primary-500 p-3">
                <DateAndStatusFilter />
                <ul className="bg-primary-800 py-3 px-4 rounded-lg mt-6">
                    <li className='flex flex-col gap-3'>
                        <div className='flex items-center gap-3 p-2'>
                            <div className="w-5 aspect-square border-2 border-secondary-800" />
                            <div className="flex-1 flex flex-col">
                                <span className="font-semibold text-secondary-500 text-sm">Premier League</span>
                                <span className="text-[.7em] text-secondary-700">England</span>
                            </div>
                            <MdStarOutline size={20} />
                        </div>

                        <ul className="flex flex-col gap-1">
                            {
                                data?.matches?.matches.map((match, index) => (
                                    <li><MatchCard key={index} {...(match as Match)} /></li>
                                ))
                            }
                        </ul>
                    </li>
                </ul>
            </div>
        </Suspense>
    )
};

export default Matches