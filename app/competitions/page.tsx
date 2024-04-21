"use client";

import { MdStarOutline } from 'react-icons/md';
import CompetitionCard from '../_components/CompetitionCard';
import { Competition } from '@/types/global.type';
import { useQuery, gql } from '@apollo/client';
import { LoadingMessage, ErrorMessage } from '../_components';

const QUERY = gql`
  query {
    competitions {
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
    const { loading, error, data } = useQuery<{ competitions: { competitions: Competition[] } }>(QUERY);

    if (loading) return <LoadingMessage />;
    else if (error) return <ErrorMessage />;

    return (
        <div className="p-4">
            <div className="flex items-center gap-4 justify-between">
                <h1 className="font-bold">Leagues and Competitions</h1>
                <MdStarOutline size={20} />
            </div>
            
            <ul className="flex flex-col mt-6 border border-secondary-900/50 rounded-md overflow-hidden">
                {
                    data?.competitions?.competitions.map((competition, index) => <CompetitionCard {...competition} key={index} />)
                }
            </ul>
        </div>
    )
}

export default Competitions
