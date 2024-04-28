"use client";

import { Match } from '@/types/global.type';
import { DateAndStatusFilter, ErrorMessage, LoadingMessage, MatchesContainer } from '../_components';
import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { MdStarOutline } from 'react-icons/md';

const QUERY = gql`
    query GetMatches($status: String, $from: String) {
        matches(status: $status, from: $from, limit: 100) {
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
        variables: { status, from: date }
    });

    return (
        <div className="p-4 flex flex-col gap-4">
            <h1 className='font-bold text-3xl px-4'>Matches</h1>
            <DateAndStatusFilter setDate={setDate} setMatchStatus={setStatus} />
            {
                loading ? 
                    <LoadingMessage /> :
                    error ?
                        <ErrorMessage /> :
                        !data ?
                            <div>Nothing was found</div> :
                            <MatchesContainer matches={data.matches.matches} />
            }
        </div>
    )
};

export default Matches