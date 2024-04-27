"use client";

import { Match } from '@/types/global.type';
import React, { useContext, useMemo } from 'react';
import MatchCard from './MatchCard';
import { SocketContext } from '../SocketContext';

function MatchesContainer({ matches }: { matches: Match[] }) {
    const { socketData } = useContext(SocketContext);
    const matchesToView = useMemo(() => matches.map(match => {
        const socketMatch = socketData.matches[match._id];
        const updatedMatch = {
            ...match,
            status: socketMatch?.status || match.status,
            minute: socketMatch?.minute || match.minute,
            score: socketMatch?.score || match.score,
            timeRemaining: socketMatch?.timeRemaining || match.timeRemaining
        }
        return updatedMatch;
    }), [socketData]);

    return (
        <ul className='flex flex-col rounded-md border border-white-100/5 overflow-hidden'>
            {
                matchesToView.map((match) => <MatchCard {...match} />)
            }
        </ul>
    )
}

export default MatchesContainer
