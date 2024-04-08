"use client";

import MatchCard from '../_components/MatchCard';
import { Match } from '@/types/match.type';
import { DateAndStatusFilter, ErrorMessage, LoadingMessage } from '../_components';
import { Suspense } from 'react';
import { useQuery, gql } from '@apollo/client';
import { MdStarOutline } from 'react-icons/md';

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

    if (loading) return <LoadingMessage />
    else if (error) return <ErrorMessage />

    return (
        <Suspense>
            <div className="border border-secondary-900/50 bg-primary-500 p-3">
                <div className="flex justify-between items-center gap-4">
                    <h1 className='font-bold text-2xl'>Matches</h1>
                    <button className='d-flex align-items-center rounded-md text-white-100'>
                        <MdStarOutline size={20} />
                    </button>
                </div>
                <DateAndStatusFilter />

                <ul className="flex flex-col gap-1">
                    {
                        data?.matches?.matches.map((match, index) => (
                            <li><MatchCard key={index} {...match} /></li>
                        ))
                    }
                </ul>
            </div>
        </Suspense>
    )
};

export default Matches