"use client";

import { gql, useQuery } from '@apollo/client';

import { ErrorMessage, MatchesContainer, NothingWasFound, Standings } from '@/app/_components';

import { Match, Team } from '@/types/global.type';
import { useParams } from 'next/navigation';
import { DetailsLoading } from '@/app/_components/loading';
import Image from 'next/image';
import { useMemo } from 'react';
import { getDay, getTimeFormat } from '@/app/_utils/dateTime';
import Link from 'next/link';
import TeamOfTheWeek from '@/app/_components/TeamOfTheWeek';
import { FaAngleLeft } from 'react-icons/fa6';
import { TbSoccerField } from 'react-icons/tb';

const QUERY = gql`
    query GetTeamDetails($id: ID!) {
        team(id: $id) {
            _id
            name
            venue
            address
            founded
            website
            matchesPlayed

            area {
                name
                flag
            }

            coach {
                name
                nationality
            }

            halfTime {
                goalsScored
                goalsConceded
            }

            fullTime {
                goalsScored
                goalsConceded
            }

            squad {
                startingEleven {
                    goalkeeper {
                        name
                        position {
                            area
                            specialty
                        }
                    }
                    defence {
                        name
                        position {
                            area
                            specialty
                        }
                    }
                    midfield {
                        name
                        position {
                            area
                            specialty
                        }
                    }
                    offence {
                        name
                        position {
                            area
                            specialty
                        }
                    }
                }
            }

            league {
                name
                code
                emblem
                type 
                standings {
                    stage
                    type
                    group
                    table {
                        team {
                            _id
                            name
                            shortName
                            tla
                            crest
                            matches(status: "FINISHED", limit: 5, sort: -1) {
                                homeTeam {
                                    _id
                                    name
                                    crest
                                }
                                awayTeam {
                                    _id
                                    name
                                    crest
                                }
                            }
                        }
                        position
                        playedGames
                        form
                        won
                        draw
                        lost
                        points
                        goalsFor
                        goalsAgainst
                        goalDifference
                    }
                }
            }

            matches(status: "FINISHED", limit: 5, sort: -1) {
                _id
                utcDate
                status
                minute
                competition {
                    name
                    emblem
                }

                homeTeam {
                    _id
                    name
                    crest
                    shortName
                }
                awayTeam {
                    _id
                    name
                    crest
                    shortName
                }
                score {
                    fullTime {
                        home
                        away
                    }
                }
            }

            competitions {
                _id
                name
                emblem
            }
        }

        teamNextFixtures(teamId: $id, limit: 1) {
            _id
            minute
            utcDate
            status

            competition {
                name
                emblem
            }
            homeTeam {
                name
                shortName
                crest
            }
            awayTeam {
                name
                shortName
                crest
            }

            score {
                fullTime {
                    home
                    away
                }
                firstHalf {
                    home
                    away
                }
            }
        }
    }
`;

const TeamInfo = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery<{ team: Team, teamNextFixtures: Match[] }>(QUERY, { variables: { id } });

    const nextFixture = useMemo(() => data?.teamNextFixtures && data.teamNextFixtures[0] ? { ...data.teamNextFixtures[0] } : null, [data]);

    if (loading) return <DetailsLoading />;
    else if (error) return <ErrorMessage />;
    else if (!data) return <NothingWasFound />;

    return (
        <div className="grid grid-cols-[1fr,_360px] gap-4">
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-6 rounded-xl bg-white-100/10 border border-transparent p-6">
                        <h3 className="text-sm text-white-100 font-semibold">Team Form</h3>
                        <ul className="flex justify-between gap-4">
                            {
                                data.team.matches.map(({ _id, homeTeam, awayTeam, score }) => (
                                    <li key={_id} className="flex flex-col items-center justify-center gap-4">
                                        <span className={`${(String(homeTeam._id) === String(id) && score.fullTime.home > score.fullTime.away) || (String(awayTeam._id) === String(id) && score.fullTime.away > score.fullTime.home) ? 'bg-green-600' : score.fullTime.home === score.fullTime.away ? 'bg-gray-500' : 'bg-red-500'} px-2 h-6 relative flex items-center justify-center text-2xs font-semibold text-white-100 rounded-md after:absolute ${(String(homeTeam._id) === String(id) && score.fullTime.home > score.fullTime.away) || (String(awayTeam._id) === String(id) && score.fullTime.away > score.fullTime.home) ? 'after:bg-green-600' : ''} after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-[calc(100%_-_16px)] after:h-[2px] after:rounded-full`}>{score.fullTime.home} - {score.fullTime.away}</span>
                                        <Image src={String(homeTeam._id) === String(id) ? awayTeam.crest : homeTeam.crest} alt={`${data.team.name} crest`} width={24} height={24} className="w-6 aspect-square object-contain" />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <Link href={`/match/${(nextFixture ? nextFixture : data.team.matches[0])?._id}`} className="group flex flex-col gap-8 rounded-xl bg-white-100/10  border border-transparent p-4 pb-6">
                        <div className="flex items-center justify-between gap-4">
                            <h3 className="text-sm text-white-100 font-semibold">{nextFixture ? 'Next match' : 'Last match'}</h3>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xs text-white-700">{(nextFixture ? nextFixture : data.team.matches[0])?.competition?.name}</span>
                                <span className="flex items-center justify-center w-6 aspect-square max-h-6 rounded-full border border-white-100/20">
                                    <Image src={(nextFixture ? nextFixture : data.team.matches[0])?.competition?.emblem} alt={`${(nextFixture ? nextFixture : data.team.matches[0])?.competition?.name} crest`} height={24} width={24} className="w-4 max-h-4 aspect-square obtain-cover" />
                                </span>
                            </div>
                        </div>
                        <div className="group-hover:opacity-60 grid grid-cols-[1fr,_auto,_1fr] gap-6">
                            <div className="flex flex-col items-center justify-end gap-4">
                                <Image src={(nextFixture ? nextFixture : data.team.matches[0])?.homeTeam?.crest} alt={`${(nextFixture ? nextFixture : data.team.matches[0])?.homeTeam?.name} crest`} height={24} width={24} className="w-6 max-h-6 aspect-square object-contain" />
                                <span className="text-2xs text-white-100">{(nextFixture ? nextFixture : data.team.matches[0])?.homeTeam?.shortName}</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="text-3xl font-semibold text-white-100">
                                    {
                                        (nextFixture ? nextFixture : data.team.matches[0])?.status === 'TIMED' ?
                                        <span>{getTimeFormat((nextFixture ? nextFixture : data.team.matches[0])?.utcDate)}</span> :
                                        <span>{`${(nextFixture ? nextFixture : data.team.matches[0]).score.fullTime.home} - ${(nextFixture ? nextFixture : data.team.matches[0]).score.fullTime.away}`}</span>
                                    }
                                </span>
                                <span className="text-2xs flex items-center justify-center">
                                    {
                                        (nextFixture ? nextFixture : data.team.matches[0])?.status === "TIMED" ?
                                            <span className="text-white-700">{getDay((nextFixture ? nextFixture : data.team.matches[0])?.utcDate)}</span> :
                                            /in_play|finished|paused/i.test((nextFixture ? nextFixture : data.team.matches[0])?.status) ?
                                            <span className={`${(nextFixture ? nextFixture : data.team.matches[0])?.status !== 'FINISHED' ? 'text-yellow-400' : 'text-white-700'}`}>
                                                {
                                                    (nextFixture ? nextFixture : data.team.matches[0])?.minute === 'FT' ? 
                                                        'Full time' :
                                                        (nextFixture ? nextFixture : data.team.matches[0])?.minute === 'HT' ?
                                                            'Half time' :
                                                    `${(nextFixture ? nextFixture : data.team.matches[0])?.minute}'`
                                                }
                                            </span> :
                                            <span className="text-white-700">{(nextFixture ? nextFixture : data.team.matches[0])?.status?.toLowerCase()}</span>
                                    }
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-start gap-4">
                                <Image src={(nextFixture ? nextFixture : data.team.matches[0])?.awayTeam?.crest} alt={`${(nextFixture ? nextFixture : data.team.matches[0])?.awayTeam?.name} crest`} height={24} width={24} className="w-6 max-h-6 aspect-square object-contain" />
                                <span className="text-2xs text-white-100">{(nextFixture ? nextFixture : data.team.matches[0])?.awayTeam?.shortName}</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <Standings competition={data.team.league} teams={[data.team._id]} showCompetition />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <TeamOfTheWeek players={data.team.squad.startingEleven} hideTeamCrest>
                        <div className="flex items-center justify-between gap-2 px-6 py-4">
                            <span className="text-xs font-semibold text-white-100">Squad</span>
                            <span className="text-2xs text-white-700">Possible starting XI </span>
                        </div>
                    </TeamOfTheWeek>
                </div>
                <div className="flex flex-col rounded-xl border border-transparent bg-[#191919] pb-2">
                    <div className="flex justify-between gap-4 items-center p-4">
                        <button className="w-6 rounded-full aspect-square flex items-center justify-center bg-white-100/10 text-white-100 hover:bg-white-100 hover:text-black-900">
                            <FaAngleLeft size={16} />
                        </button>
                        <span className="text-xs font-semibold text-white-100">Fixtures</span>
                        <button className="w-6 rounded-full aspect-square flex items-center justify-center bg-white-100/10 text-white-100 hover:bg-white-100 hover:text-black-900">
                            <FaAngleLeft size={16} />
                        </button>
                    </div>
                    <MatchesContainer 
                        matches={[...data.teamNextFixtures, ...data.team.matches.slice(0, 5 - data.teamNextFixtures.length)]} 
                        showDateAndCompetition 
                        small
                    />
                </div>
                <div className="flex flex-col rounded-xl border border-transparent bg-[#191919] p-4 gap-6">
                    <h3 className="text-xs font-semibold text-white-100">Stadium</h3>
                    <div className="flex items-center justify-start gap-3">
                        <TbSoccerField size={20} className="text-white-100" />
                        <div className="flex flex-col">
                            <span className="text-xs text-white-100">{data.team.venue}</span>
                            <span className="text-2xs text-white-700">{data.team.address}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TeamInfo
