"use client";

import { useMemo } from "react";
import { TeamStanding } from "@/types/team.type";
import Image from "next/image";
import { getTeamStandingStatus } from "@/app/_utils/competition";
import { getTablePositionColor, getTableRowHighlightColors } from "@/app/_utils/colors";


function Standing({ highlightedTeams, teamStanding, relegationPositions, topPositions, midPositions }: TeamStanding) {
    const highlightTeam = useMemo(() => highlightedTeams.includes(teamStanding.team?._id), []);

    const teamPosition = useMemo(() => getTeamStandingStatus({ teamStanding, topPositions, midPositions, relegationPositions }), []);

    const highlightColors = useMemo(() => getTableRowHighlightColors(highlightTeam, teamPosition), []);
    const positionColors = useMemo(() => getTablePositionColor(teamPosition), []);

    return (
        <tr className={`text-xs text-center h-10 border-l-4 hover:bg-primary-500 ${highlightColors}`}>
            <td className="text-center text-xs">
                <p className={`h-6 m-auto aspect-square rounded-full ${positionColors} font-bold flex items-center justify-center`}>
                    {teamStanding.position}
                </p>
            </td>
            <td className="text-left">
                <Image
                    src={teamStanding.team?.crest || String(process.env.NEXT_IMAGE_URL)}
                    width={18}
                    alt={teamStanding.team?.name}
                    className="aspect-square object-contain float-left mr-2"
                />
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