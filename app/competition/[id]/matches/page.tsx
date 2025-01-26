"use client";

import { useMemo, useState } from "react";
import { useParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';

import { ErrorMessage, MatchesContainer, NothingWasFound } from '@/app/_components';
import { MatchLoading } from "@/app/_components/loading";
import DateSelector from "@/app/_components/DateSelector";

import { getDay, seperateMatchesByDate } from "@/app/_utils/dateTime";

import { Competition } from '@/types/global.type';

const QUERY = gql`
    query CompetitionMatches($id: ID!, $fromDate: String, $toDate: String) {
        competition(id: $id, ) {
            matches(from: $fromDate, to: $toDate) {
                _id
                utcDate
                minute
                status
                homeTeam {
                    _id
                    name
                    shortName
                    crest
                }
                awayTeam {
                    _id
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

const CompetitionMatches = () => {
    const { id } = useParams();
    const [sortType, setSortType] = useState("time");

    const [date, setDate] = useState({ 
        fromDate: (new Date()).toDateString(), 
        toDate: (new Date()).toDateString() 
    });

    const { loading, error, data } = useQuery<{ competition: Competition }>(QUERY, {
        variables: { id, ...date }
    });

    const matchesSeparatedByDate = useMemo(() => seperateMatchesByDate(data?.competition?.matches, sortType), [data]);

    if(error) return <ErrorMessage />

    return (
        <div className="flex flex-col gap-2 rounded-xl border border-transparent bg-white-100/10 h-fit pb-3">
            <div className="flex flex-col">
                <div className="p-3 pb-2">
                    <DateSelector setDate={setDate} showTwoDates />
                </div>
                <div className="flex items-center gap-2 p-3 py-2">
                    {
                        OPTIONS.map(({ title, value }) => (
                            <button key={value} onClick={() => setSortType(value)} className={`${value === sortType ? 'bg-white-100 text-black-900' : ' hover:bg-white-100/20 bg-white-100/10 text-white-400'} px-2 sm:px-3 h-7 md:h-8 flex items-center justify-center rounded-full`}>
                                <span className="text-2xs font-semibold">{title}</span>
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className="px-3">
                {
                    loading ?
                        <MatchLoading size={10} /> :
                        !loading && !matchesSeparatedByDate.length ?
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

export default CompetitionMatches