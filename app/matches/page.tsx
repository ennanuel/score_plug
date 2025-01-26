"use client";

import { Match } from '@/types/global.type';
import { ErrorMessage, MatchesContainer, NothingWasFound } from '../_components';
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
                matchday

                homeTeam {
                    name
                    shortName
                    crest
                }

                awayTeam {
                    name
                    shortName 
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

const OPTIONS = [
    { title: "By time", value: "time" },
    { title: "By round", value: "round" },
    { title: "By team", value: "team" }
]


function Matches() {
    const [status, setStatus] = useState("");
    const [date, setDate] = useState({ 
        fromDate: (new Date()).toDateString(), 
        toDate: (new Date()).toDateString() 
    });
    const [sortType, setSortType] = useState("time")

    const { loading, error, data } = useQuery<{ matches: { matches: Match[], totalPages: number } }>(QUERY, {
        variables: { status, ...date }
    });

    const matchesSeparatedByDate = useMemo(() => seperateMatchesByDate(data?.matches?.matches, sortType), [data, sortType]);

    if(error) return <ErrorMessage />

    return (
        <div className="flex flex-col gap-2 rounded-xl border border-transparent bg-white-100/10 h-fit pb-3">
            <div className="flex flex-col">
                <div className="p-3 pb-2">
                    <DateSelector setDate={setDate} showTwoDates />
                </div>
                <div className="flex items-center gap-2 p-3 py-2">
                    <button onClick={() => setStatus(status === "IN_PLAY" ? "" : "IN_PLAY")} className={`${status === "IN_PLAY" ? 'bg-green-400 text-black-900' : 'bg-white-100/10 text-white-500 hover:bg-white-100/20'} flex items-center justify-center rounded-full mr-0 md:mr-2 px-2 sm:px-4 h-7 md:h-8`}>
                        <span className="text-3xs md:text-2xs font-semibold">Live</span>
                    </button>
                    {
                        OPTIONS.map(({ title, value }) => (
                            <button key={title} onClick={() => setSortType(value)} className={`${sortType === value ? 'bg-white-100 text-black-900 border-white-100' : 'border-white-100/10 text-white-600 hover:text-white-500'} border px-2 sm:px-3 h-7 sm:h-8 flex items-center justify-center rounded-full`}>
                                <span className="text-3xs md:text-2xs font-semibold">{title}</span>
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className="px-3">
                {
                    loading ?
                        <MatchLoading size={10} /> :
                        !loading && !data?.matches?.matches?.length ?
                            <NothingWasFound text="No matches were found" /> :
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