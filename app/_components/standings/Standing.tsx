"use client";

import { useMemo } from "react";
import { TeamStanding } from "@/types/team.type";
import Image from "next/image";


function Standing({ highlightedTeams, teamStanding, relegationPositions, topPositions, midPositions }: TeamStanding) {
    const highlightTeam = useMemo(() => highlightedTeams.includes(teamStanding?.team?._id), []);

    const teamPosition = useMemo(() => teamStanding.position <= topPositions ?
        'TOP_TEAM' :
        (teamStanding.position > topPositions && teamStanding.position <= midPositions) ?
            'MID_TEAM' :
            (teamStanding.position >= relegationPositions) ?
                'LOW_TEAM' :
                '',
        []);

    const highlightColors = useMemo(() => highlightTeam ?
        (
            teamPosition === 'TOP_TEAM' ?
                'bg-green-400/10 border-green-500' :
                teamPosition === 'MID_TEAM' ?
                    'bg-yellow-400/10 border-yellow-500' :
                    teamPosition === 'LOW_TEAM' ? 'bg-red-400/10 border-red-500' :
                        'bg-white-100/10 border-white-500'
        ) :
        'border-transparent',
        []);

    const positionColors = useMemo(() => teamPosition === 'TOP_TEAM' ?
        'bg-green-500 text-primary-800' :
        teamPosition === 'MID_TEAM' ?
            'bg-yellow-500 text-primary-800' :
            teamPosition === 'LOW_TEAM' ?
                'bg-red-500 text-primary-800' :
                'text-gray-500',
        []);

    return (
        <tr className={`text-xs text-center h-10 border-l-4 hover:bg-primary-500 ${highlightColors}`}>
            <td className="text-center text-xs">
                <p className={`h-6 m-auto aspect-square rounded-full ${positionColors} font-bold flex items-center justify-center`}>
                    {teamStanding.position}
                </p>
            </td>
            <td className="text-left">
                <Image src={teamStanding.team?.crest || String(process.env.NEXT_IMAGE_URL)} width={18} alt={teamStanding.team?.name} className="aspect-square object-contain float-left mr-2" />
                <p>{teamStanding.team?.name}</p>
            </td>
            <td className="text-secondary-500">{teamStanding.playedGames}</td>
            <td className="text-secondary-500">
                {`${teamStanding.goalDifference > 0 ? '+' : ''}${teamStanding.goalDifference}`}
            </td>
            <td className="text-secondary-500">{teamStanding.points}</td>
        </tr>
    )
};

export default Standing;