import { Match } from '@/types/global.type';
import React from 'react';
import MatchCard from './MatchCard';

function MatchesContainer({ matches }: { matches: Match[] }) {
    return (
        <ul className='flex flex-col rounded-md border border-white-100/5 overflow-hidden'>
            {
                matches.map((match) => <MatchCard {...match} />)
            }
        </ul>
    )
}

export default MatchesContainer
