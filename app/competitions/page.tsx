"use client";

import CompetitionCard from '../_components/CompetitionCard';
import { Competition } from '@/types/global.type';
import { useQuery, gql } from '@apollo/client';
import { ErrorMessage } from '../_components';
import { useContext, useMemo, useState } from 'react';
import { SocketContext } from '../SocketContext';
import { CompetitionLoading } from '../_components/loading';
import { FiArrowDown, FiArrowUp, FiChevronDown } from 'react-icons/fi';
import { BsCaretDownFill } from 'react-icons/bs';

const QUERY = gql`
  query($limit: Float!) {
    competitions(limit: $limit) {
        totalPages
        competitions {
            _id
            name
            emblem
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

const Competitions = () => {
    const [limit, setLimit] = useState(10);

    const { loading, error, data } = useQuery<{ competitions: { competitions: Competition[]; totalPages: number; } }>(QUERY, { variables: { limit } });

    const { socketData } = useContext(SocketContext);
    const competitions = useMemo(() => data?.competitions?.competitions?.map((competition) => ({
        ...competition,
        recentMatches: { ...competition.recentMatches, hasLiveMatch: socketData.competitions.includes(competition._id) }
    })), [socketData, data])

    return (
        <div className="flex flex-col gap-6 items-center">
            <div className="w-full pb-3 flex flex-col gap-4 bg-white-100/10 border border-transparent rounded-xl">
                <div className="flex items-center justify-between gap-4 p-3">
                    <div className="hidden md:flex items-center gap-2">
                        {
                            ['By name', 'By ranking', 'By activity'].map((sortType, index) => (
                                <button key={index} className={`flex items-center justify-center gap-1 px-3 h-8 rounded-full ${index === 0 ? 'bg-white-100 text-black-900' : 'text-white-500 hover:text-white-300 hover:bg-white-100/5 border border-white-100/10'}`}>
                                    <span className="text-2xs font-semibold whitespace-nowrap">{sortType}</span>
                                </button>
                            ))
                        }
                    </div>
                    <div className="flex md:hidden relative">
                        <button className='flex items-center justify-center gap-1 h-8 px-3 rounded-full bg-white-100/10 text-white-600 focus:bg-white-100 focus:text-black-900'>
                            <span className="text-2xs font-semibold whitespace-nowrap">By name</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center w-6 aspect-square rounded-full bg-white-100/10 text-white-500 hover:bg-white-100/60 hover:text-black-900">
                            <FiArrowUp size={14} />
                        </button>
                        <button className="flex items-center justify-center w-6 aspect-square rounded-full bg-white-100 text-black-900">
                            <FiArrowDown size={14} />
                        </button>
                    </div>
                </div>
                <div className="px-3">
                    {
                        loading ? (
                            error ?
                                <ErrorMessage /> :
                                <CompetitionLoading size={8} />
                        ) :
                        <ul className="flex flex-col gap-3">
                            {
                                competitions?.map((competition, index) => <CompetitionCard {...competition} key={index} />)
                            }
                        </ul>
                    }
                </div>
            </div>

            {
                Number(data?.competitions?.totalPages) > 1 ?
                    <button onClick={() => setLimit(20)} className="w-fit flex items-center justify-center gap-2 px-4 h-10 rounded-full bg-white-100/20 text-white-300 hover:bg-white-100/30">
                        <span className="font-semibold text-white-300 text-2xs">Show more</span>
                        <BsCaretDownFill size={10} />
                    </button> :
                    null
            }
        </div>
    )
}

export default Competitions
