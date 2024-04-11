import { Match } from '@/types/match.type';
import React from 'react';
import MatchCard from './MatchCard';

function MatchesContainer({ matches }: { matches: Match[] }) {
    return (
        <ul className='flex flex-col rounded-md border border-white-100/5 overflow-hidden pb-[-1px]'>
            {
                matches.map((match) => <MatchCard {...match} />)
            }
        </ul>
    )
}

export default MatchesContainer
