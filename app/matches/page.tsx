"use client";

import { Match } from '@/types/global.type';
import { DateAndStatusFilter, ErrorMessage, LoadingMessage, MatchesContainer } from '../_components';
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

    if (loading) return <LoadingMessage />;
    else if (error) return <ErrorMessage />;
    else if (!data) return <div>Nothing was found!</div>;

    return (
        <Suspense>
            <div className="border border-secondary-900/50 p-3 flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                    <h1 className='font-bold text-3xl px-4'>Matches</h1>
                    <button className='d-flex align-items-center rounded-md text-white-100'>
                        <MdStarOutline size={20} />
                    </button>
                </div>
                <DateAndStatusFilter />
                <MatchesContainer matches={data.matches.matches} />
            </div>
        </Suspense>
    )
};

export default Matches