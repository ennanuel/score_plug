"use client";

import { useMemo } from "react";
import { TeamStanding } from "@/types/team.type";
import Image from "next/image";
import { getTeamStandingStatus } from "@/app/_utils/competition";
import { getTablePositionColor, getTableRowHighlightColors } from "@/app/_utils/colors";

import { Match } from "@/types/global.type";
import Link from "next/link";

function getNextTeamCrest(match: Match, teamId: number) {
    if(match.homeTeam._id === teamId) return match.awayTeam.crest;
    else return match.homeTeam.crest;
};

function Standing({ highlightedTeams, teamStanding, relegationPositions, topPositions, midPositions }: TeamStanding) {
    const highlightTeam = useMemo(() => highlightedTeams.includes(teamStanding.team?._id), []);

    const teamPosition = useMemo(() => getTeamStandingStatus({ teamStanding, topPositions, midPositions, relegationPositions }), []);

    const highlightColors = useMemo(() => getTableRowHighlightColors(highlightTeam, teamPosition), []);
    const positionColor = useMemo(() => getTablePositionColor(teamPosition), []);
    const teamNextMatchEmblem = useMemo(() => Boolean(teamStanding?.team?.matches?.length) && getNextTeamCrest(teamStanding.team.matches[0], teamStanding.team._id), []);

    return (
        <Link href={`/team/${teamStanding.team?._id}`} className={`text-center text-2xs font-semibold h-8 rounded-md hover:bg-white-100/10 ${highlightColors} text-white-500 flex items-center gap-1`}>
            <span className={`block w-[2px] h-6 rounded-r-full ${positionColor}`}></span>
            <span className="w-8 pl-2">
                {teamStanding.position}
            </span>
            <span className="flex-1 flex items-center gap-2">
                <Image
                    src={teamStanding.team?.crest || String(process.env.NEXT_IMAGE_URL)}
                    width={18}
                    height={18}
                    alt={teamStanding.team?.name}
                    className="w-4 aspect-square object-contain"
                />
                <p className="text-left">{teamStanding.team?.name}</p>
            </span>
            <span className="w-12">{teamStanding.playedGames}</span>
            <span className="w-12">{teamStanding.goalsFor}-{teamStanding.goalsAgainst}</span>
            <span className="w-12">
                {`${teamStanding.goalDifference > 0 ? '+' : ''}${teamStanding.goalDifference}`}
            </span>
            <span className="w-12">{teamStanding.points}</span>
            <span className="w-12 flex items-center justify-center">
                {
                    teamNextMatchEmblem ?
                        <Image
                            src={teamNextMatchEmblem || String(process.env.NEXT_IMAGE_URL)}
                            width={18}
                            height={18}
                            alt={teamStanding.team?.name}
                            className="w-4 aspect-square object-contain"
                        /> :
                        null
                }
            </span>
        </Link>
    )
};

export default Standing;