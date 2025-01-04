"use client";

import { MatchesContainer } from "@/app/_components/";
import { gql, useQuery } from "@apollo/client"
import { useParams } from "next/navigation";
import { Team } from "@/types/global.type";
import { useMemo } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import Image from "next/image";
import { getDay, getTimeFormat } from "@/app/_utils/dateTime";
import { getMatchTeamColors } from "@/app/_utils/colors";

const QUERY = gql`
    query GetTeamMatches($id: ID!) {
        team(id: $id) {
            matches(sort: -1, limit: 10) {
                _id
                minute
                utcDate
                status

                competition {
                    _id
                    name
                    emblem
                    area {
                        name
                        flag
                    }
                }

                homeTeam {
                    _id
                    name
                    shortName
                    crest
                    clubColors
                    matchesPlayed
                    tablePosition
                    fullTime {
                        goalsScored
                        goalsConceded
                    }
                }

                awayTeam {
                    _id
                    name
                    shortName
                    crest
                    clubColors
                    matchesPlayed
                    tablePosition
                    fullTime {
                        goalsScored
                        goalsConceded
                    }
                }

                score {
                    fullTime {
                        home
                        away
                    }
                }
            }
        }
    }
`

const TeamMatches = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery<{ team: Team }>(QUERY, { variables: { id } });

    const featureMatch = useMemo(() => data?.team ? data.team.matches[0] : null, [data]);
    const teamColors = useMemo(() => ({ 
        home: getMatchTeamColors(String(featureMatch?.homeTeam?.clubColors))[0], 
        away: getMatchTeamColors(String(featureMatch?.awayTeam?.clubColors))[0]
    }), [featureMatch]);

    if(!data) return;
    
    return (
        <div className="grid grid-cols-[1fr,_360px] gap-4">
            <div className="flex flex-col rounded-xl border border-transparent bg-[#191919] pb-2">
                <div className="flex justify-between gap-4 items-center p-4">
                    <button className="flex items-center justify-center w-6 aspect-square rounded-full bg-white-100/10 hover:bg-white-100 text-white-100 hover:text-black-900">
                        <FaAngleLeft size={16} />
                    </button>
                    <span className="text-xs font-semibold text-white-100">Fixtures</span>
                    <button className="flex items-center justify-center w-6 aspect-square rounded-full bg-white-100/10 hover:bg-white-100 text-white-100 hover:text-black-900">
                        <FaAngleLeft size={16} />
                    </button>
                </div>
                <MatchesContainer teamId={String(id)} loading={loading} error={Boolean(error)} matches={data?.team?.matches} showDateAndCompetition />
            </div>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-transparent bg-[#191919]">
                    <div className="flex justify-between items-center p-4">
                        <span className="text-xs fonts-semibold text-white-100">{featureMatch?.status === 'TIMED' ? 'Next fixture' : 'Last match'}</span>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-2xs text-white-700">{featureMatch?.competition?.name}</span>
                            <div className="flex items-center justify-center w-5 aspect-square max-h-5  rounded-full border border-white-100/20">
                                <Image src={String(featureMatch?.competition?.emblem || process.env.NEXT_IMAGE_URI)} alt={`${featureMatch?.competition?.name} crest`} height={16} width={16} className="w-4 aspect-square max-h-4 object-contain" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] gap-4 border-b border-white-100/10 p-4">
                        <div className="flex flex-col gap-4 items-center justify-center">
                            <Image src={String(featureMatch?.homeTeam?.crest || process.env.NEXT_IMAGE_URI)} alt={`${featureMatch?.homeTeam.name} crest`} width={40} height={40} className="w-8 aspect-square max-h-8 object-contain" />
                            <span className="text-2xs text-white-100">{featureMatch?.homeTeam?.shortName}</span>
                        </div>
                        <div className="flex flex-col">
                            {
                                featureMatch?.status !== 'TIMED' ?
                                    <div className="flex flex-col gap-4">
                                    <span className="flex items-center justify-center gap-1 text-xl font-semibold text-white-400">
                                        <span className="">{featureMatch?.score?.fullTime?.home}</span>
                                        <span className="">-</span>
                                        <span className="">{featureMatch?.score?.fullTime?.away}</span>
                                    </span>
                                    <span className={`text-xs font-normal ${featureMatch?.status === 'IN_PLAY' ? 'text-green-400' : 'text-white-700'}`}>
                                        {
                                        /in_play|finished|paused/i.test(String(featureMatch?.status)) ?
                                            featureMatch?.minute === 'HT' || featureMatch?.minute === 'FT' ? 
                                            featureMatch?.minute === 'HT' ? 
                                                'Half time' : 
                                                'Full time' : 
                                            `${featureMatch?.minute}'` :
                                            featureMatch?.status
                                        }
                                    </span>
                                    </div>:
                                    <div className="flex flex-col gap-4 items-center justify-center">
                                        <span className="font-semibold text-xl text-white-400">{getTimeFormat(String(featureMatch?.utcDate))}</span>
                                        <span className="text-xs font-normal text-white-700">{getDay(String(featureMatch.utcDate))}</span>
                                    </div>
                            }
                        </div>
                        <div className="flex flex-col gap-4 items-center justify-center">
                            <Image src={String(featureMatch?.awayTeam?.crest || process.env.NEXT_IMAGE_URI)} alt={`${featureMatch?.awayTeam.name} crest`} width={40} height={40} className="w-8 aspect-square max-h-8 object-contain" />
                            <span className="text-2xs text-white-100">{featureMatch?.awayTeam?.shortName}</span>
                        </div>
                    </div>
                    <ul className="flex flex-col p-4 gap-4">
                        <li className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                            <div className="flex justify-start h-full">
                                <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                    <span style={{ backgroundColor: Number(featureMatch?.homeTeam?.tablePosition) <= 4 ? teamColors.home : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                    <span className="relative">{featureMatch?.homeTeam?.tablePosition}</span>
                                </span>
                            </div>
                            <span className="text-2xs text-white-700">Table Position</span>
                            <div className="flex justify-end h-full">
                                <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                    <span style={{ backgroundColor: Number(featureMatch?.awayTeam?.tablePosition) <= 4 ? teamColors.away : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                    <span className="relative">{featureMatch?.awayTeam?.tablePosition}</span>
                                </span>
                            </div>
                        </li>
                        <li className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                            <div className="flex justify-start h-full">
                                <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                    <span style={{ backgroundColor: Math.floor(Number(featureMatch?.homeTeam?.fullTime?.goalsScored) / Number(featureMatch?.homeTeam?.matchesPlayed)) >= 1 ? teamColors.home : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                    <span className="relative">{(Number(featureMatch?.homeTeam?.fullTime?.goalsScored) / Number(featureMatch?.homeTeam?.matchesPlayed)).toFixed(2)}</span>
                                </span>
                            </div>
                            <span className="text-2xs text-white-700">Goals per match</span>
                            <div className="flex justify-end h-full">
                                <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                    <span style={{ backgroundColor: Math.floor(Number(featureMatch?.awayTeam?.fullTime?.goalsScored) / Number(featureMatch?.awayTeam?.matchesPlayed)) >= 1 ? teamColors.away : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                    <span className="relative">{(Number(featureMatch?.awayTeam?.fullTime?.goalsScored) / Number(featureMatch?.awayTeam?.matchesPlayed)).toFixed(2)}</span>
                                </span>
                            </div>
                        </li>
                        <li className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                            <div className="flex justify-start h-full">
                                <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                    <span style={{ backgroundColor: Math.floor(Number(featureMatch?.homeTeam?.fullTime?.goalsConceded) / Number(featureMatch?.homeTeam?.matchesPlayed)) >= 1 ? teamColors.home : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                    <span className="relative">{(Number(featureMatch?.homeTeam?.fullTime?.goalsConceded) / Number(featureMatch?.homeTeam?.matchesPlayed)).toFixed(2)}</span>
                                </span>
                            </div>
                            <span className="text-2xs text-white-700">Goals conceded per match</span>
                            <div className="flex justify-end h-full">
                                <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                    <span style={{ backgroundColor: Math.floor(Number(featureMatch?.awayTeam?.fullTime?.goalsConceded) / Number(featureMatch?.homeTeam?.matchesPlayed)) >= 1 ? teamColors.away : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                    <span className="relative">{(Number(featureMatch?.awayTeam?.fullTime?.goalsConceded) / Number(featureMatch?.homeTeam?.matchesPlayed)).toFixed(2)}</span>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TeamMatches