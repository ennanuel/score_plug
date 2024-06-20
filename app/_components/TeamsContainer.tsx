"use client";

import { Team } from '@/types/global.type';
import React, { useContext, useMemo } from 'react';
import { SocketContext } from '../SocketContext';
import { TeamLoading } from './loading';

import ErrorMessage from './ErrorMessage';
import TeamCard from './TeamCard';

function TeamsContainer({ teams, loading, error }: { teams: Team[] | undefined, loading?: boolean; error?: boolean; }) {
    const { socketData } = useContext(SocketContext);
    const teamsToView = useMemo(() => teams?.map(
        (team) => {
            const hasOngoingMatch = socketData.teams.includes(team._id);
            const updatedTeam = { ...team, hasOngoingMatch: hasOngoingMatch || team.hasOngoingMatch };
            return updatedTeam;
        }
    ) || [], [socketData, teams]);
    
    if (loading) return <TeamLoading size={6} />;
    else if (error) return <ErrorMessage />;

    return (
        <ul className='grid grid-cols-5 gap-4 overflow-hidden'>
            {
                teamsToView.map((team) => <TeamCard {...team} />)
            }
        </ul>
    )
}

export default TeamsContainer
