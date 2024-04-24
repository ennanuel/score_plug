"use client";

import { Match } from '@/types/global.type';
import { DateAndStatusFilter, ErrorMessage, LoadingMessage, MatchesContainer } from '../_components';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { MdStarOutline } from 'react-icons/md';

const QUERY = gql`
    query GetMatches($status: String, $from: String) {
        matches(status: $status, from: $from) {
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
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");

    const { loading, error, data } = useQuery<{ matches: { matches: Match[], totalPages: number } }>(QUERY, {
        variables: { status, from: date },
        fetchPolicy: 'no-cache'
    });

    if (loading) return <LoadingMessage />;
    else if (error) return <ErrorMessage />;
    else if (!data) return <div>Nothing was found!</div>;

    return (
        <div className="border border-secondary-900/50 p-3 flex flex-col gap-4">
            <div className="flex justify-between items-center gap-4">
                <h1 className='font-bold text-3xl px-4'>Matches</h1>
                <button className='d-flex align-items-center rounded-md text-white-100'>
                    <MdStarOutline size={20} />
                </button>
            </div>
            <DateAndStatusFilter setDate={setDate} setMatchStatus={setStatus} />
            <MatchesContainer matches={data.matches.matches} />
        </div>
    )
};

export default Matches