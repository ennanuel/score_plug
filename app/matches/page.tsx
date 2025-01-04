"use client";

import { Match } from '@/types/global.type';
import { MatchesContainer } from '../_components';
import { useMemo, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import DateSelector from '../_components/DateSelector';
import { getDay, seperateMatchesByDate } from '../_utils/dateTime';
import { MatchLoading } from '../_components/loading';

const QUERY = gql`
    query GetMatches($status: String, $fromDate: String, $toDate: String) {
        matches(status: $status, from: $fromDate, to: $toDate, limit: 100) {
            totalPages
            matches {
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


function Matches() {
    const [status, setStatus] = useState("");
    const [date, setDate] = useState({ 
        fromDate: (new Date()).toDateString(), 
        toDate: (new Date()).toDateString() 
    });

    const { loading, error, data } = useQuery<{ matches: { matches: Match[], totalPages: number } }>(QUERY, {
        variables: { status, ...date }
    });

    const matchesSeparatedByDate = useMemo(() => seperateMatchesByDate(data?.matches?.matches), [data]);

    return (
        <div className="flex flex-col gap-2 rounded-xl border border-transparent bg-white-100/10 h-fit pb-3">
            <div className="flex flex-col">
                <div className="p-3 pb-2">
                    <DateSelector setDate={setDate} showTwoDates />
                </div>
                <div className="flex items-center gap-2 p-3 py-2">
                    <button className="px-3 h-8 flex items-center justify-center bg-white-100 text-black-900 border border-white-100 rounded-full">
                        <span className="text-2xs font-semibold">By time</span>
                    </button>
                    <button className="px-3 h-8 flex items-center justify-center border border-white-100/10 text-white-600 hover:text-white-500 rounded-full">
                        <span className="text-2xs font-semibold">By round</span>
                    </button>
                    <button className="px-3 h-8 flex items-center justify-center border border-white-100/10 text-white-600 hover:text-white-500 rounded-full">
                        <span className="text-2xs font-semibold">By team</span>
                    </button>
                </div>
            </div>
            <div className="px-3">
                {
                    loading ?
                        <MatchLoading size={10} /> :
                        <ul className="flex flex-col gap-4">
                            {
                                matchesSeparatedByDate.map(([date, matches], index) => (
                                    <li key={index} className="flex flex-col gap-2">
                                        <span className="flex items-center h-8 rounded-lg px-3 bg-white-100/20 text-white-500 text-2xs font-semibold">{getDay(date, true)}</span>
                                        <MatchesContainer matches={matches} roundedMatches />
                                    </li>
                                ))
                            }
                        </ul>
                }
            </div>
        </div>
    )
};

export default Matches