"use client";

import { Match } from '@/types/global.type';
import React, { useContext, useMemo } from 'react';
import MatchCard from './MatchCard';
import { SocketContext } from '../SocketContext';
import { MatchLoading } from './loading';
import ErrorMessage from './ErrorMessage';

type Props = { 
    matches: Match[] | undefined; 
    loading?: boolean; 
    error?: boolean; 
    roundedMatches?: boolean; 
    showDateAndCompetition?: boolean; 
    showHalfTimeScore?: boolean;
    small?: boolean;
    teamId?: string;
};

function MatchesContainer({ matches, loading, error, roundedMatches, showDateAndCompetition, showHalfTimeScore, small, teamId }: Props) {
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
        <ul className='flex flex-col'>
            {
                matchesToView.map((match) => 
                (
                    <MatchCard 
                        {...match}
                        key={match._id}  
                        rounded={roundedMatches} 
                        showHalfTimeScore={showHalfTimeScore} 
                        showDateAndCompetition={showDateAndCompetition} 
                        small={small} 
                        teamId={teamId} 
                    />
                ))
            }
        </ul>
    )
}

export default MatchesContainer
