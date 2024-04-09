"use client";

import { MdStarOutline } from 'react-icons/md';
import CompetitionCard from '../_components/CompetitionCard';
import { Competition } from '@/types/competition.type';
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
        <div className="border border-secondary-900/50 bg-primary-500 p-3">
            <div className="flex items-center gap-4 justify-between">
                <h1 className="font-bold">Leagues and Competitions</h1>
                <MdStarOutline size={20} />
            </div>
            
            <ul className="flex flex-col gap-2 mt-6">
                {
                    data?.competitions?.competitions.map((competition, index) => (
                        <li key={index}><CompetitionCard {...competition} /></li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Competitions
