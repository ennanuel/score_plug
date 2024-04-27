import { Match } from '@/types/global.type';
import React, { useContext, useMemo } from 'react';
import MatchCard from './MatchCard';
import { SocketContext } from '../SocketContext';

function MatchesContainer({ matches }: { matches: Match[] }) {
    const { socketData } = useContext(SocketContext);
    const matchesToView = useMemo(() => matches.map(match => ({ ...match, ...(socketData.matches[match._id] || {}) })), [socketData]);

    return (
        <ul className='flex flex-col rounded-md border border-white-100/5 overflow-hidden'>
            {
                matchesToView.map((match) => <MatchCard {...match} />)
            }
        </ul>
    )
}

export default MatchesContainer
