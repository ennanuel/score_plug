"use client";

import { Match } from '@/types/global.type';
import React, { useContext, useMemo } from 'react';
import MatchCard from './MatchCard';
import { SocketContext } from '../SocketContext';
import { MatchLoading } from './loading';
import ErrorMessage from './ErrorMessage';

function MatchesContainer({ matches, loading, error }: { matches: Match[] | undefined, loading?: boolean; error?: boolean; }) {
    const { socketData } = useContext(SocketContext);
    const matchesToView = useMemo(() => matches?.map(match => {
        const socketMatch = socketData.matches[match._id];
        const updatedMatch = {
            ...match,
            status: socketMatch?.status || match.status,
            minute: socketMatch?.minute || match.minute,
            score: socketMatch?.score || match.score,
            timeRemaining: socketMatch?.timeRemaining || match.timeRemaining
        }
        return updatedMatch;
    }) || [], [socketData, matches]);

    if (loading) return <MatchLoading size={6} />;
    else if (error) return <ErrorMessage />;

    return (
        <ul className='flex flex-col rounded-md border border-secondary-900/50 overflow-hidden'>
            {
                matchesToView.map((match) => <MatchCard key={match._id} {...match} />)
            }
        </ul>
    )
}

export default MatchesContainer
