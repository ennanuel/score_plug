"use client";

import CompetitionCard from '../_components/CompetitionCard';
import { Competition } from '@/types/global.type';
import { useQuery, gql } from '@apollo/client';
import { ErrorMessage, NothingWasFound } from '../_components';
import { useContext, useMemo, useState } from 'react';
import { SocketContext } from '../SocketContext';
import { CompetitionLoading } from '../_components/loading';
import { BsCaretDownFill } from 'react-icons/bs';

const QUERY = gql`
  query($limit: Float!) {
    competitions(limit: $limit) {
        totalPages
        competitions {
            _id
            name
            emblem
            ranking
            area {
                name
                flag
            }
            recentMatches {
                matches
                hasLiveMatch
            }
        }
    }
  }
`;

const OPTIONS = [
    { title: "By name", value: "name" },
    { title: "By ranking", value: "ranking" },
    { title: "By activity", value: "activity" }
]

const Competitions = () => {
    const [limit, setLimit] = useState(10);
    const [sortType, setSortType] = useState("name");

    const { loading, error, data } = useQuery<{ competitions: { competitions: Competition[]; totalPages: number; } }>(QUERY, { variables: { limit } });

    const { socketData } = useContext(SocketContext);
    const competitions = useMemo(() => data
        ?.competitions
        ?.competitions
        ?.map((competition) => ({
            ...competition,
            recentMatches: { ...competition.recentMatches, hasLiveMatch: socketData.competitions.includes(competition._id) }
        }))
        ?.slice()
        ?.sort((compA, compB) => (
                sortType === 'name' ? 
                    compA.name.toLowerCase().localeCompare(compB.name.toLowerCase()) : 
                        sortType === 'ranking' ? 
                        compA.ranking - compB.ranking : 
                    compB.recentMatches.matches - compA.recentMatches.matches
    )), [socketData, data, sortType]);

    if(error) return <ErrorMessage />

    return (
        <div className="flex flex-col gap-6 items-center">
            <div className="w-full pb-3 flex flex-col gap-4 bg-white-100/10 border border-transparent rounded-xl">
                <div className="flex items-center gap-2 p-3">
                    {
                        OPTIONS.map(({ title, value }) => (
                            <button key={value} onClick={() => setSortType(value)} className={`flex items-center justify-center gap-1 px-2 md:px-3 h-7 md:h-8 rounded-full ${sortType === value ? 'bg-white-100 text-black-900' : 'text-white-500 hover:text-white-300 hover:bg-white-100/5 border border-white-100/10'}`}>
                                <span className="text-2xs font-semibold whitespace-nowrap">{title}</span>
                            </button>
                        ))
                    }
                </div>
                <div className="px-3">
                    {
                        loading ? 
                            <CompetitionLoading size={8} /> :
                            !loading && !competitions?.length ?
                                <NothingWasFound text="Could not find competitions" /> :
                            <ul className="flex flex-col gap-3">
                                { competitions?.map((competition, index) => <CompetitionCard {...competition} key={index} />) }
                            </ul>
                    }
                </div>
            </div>

            {
                Number(data?.competitions?.totalPages) > 1 ?
                    <button onClick={() => setLimit(limit + 10)} className="w-fit flex items-center justify-center gap-2 px-4 h-10 rounded-full bg-white-100/20 text-white-300 hover:bg-white-100/30">
                        <span className="font-semibold text-white-300 text-2xs">Show more</span>
                        <BsCaretDownFill size={10} />
                    </button> :
                    null
            }
        </div>
    )
}

export default Competitions
