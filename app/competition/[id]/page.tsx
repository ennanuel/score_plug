"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { gql, useQuery } from '@apollo/client';

import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa';

import { ErrorMessage, NothingWasFound, Standings } from '@/app/_components';
import { DetailsHeaderLoading, DetailsLoading } from '@/app/_components/loading';
import TeamOfTheWeek from '@/app/_components/TeamOfTheWeek';

import { getDay, getTimeFormat } from '@/app/_utils/dateTime';

import { Competition } from '@/types/global.type';

const QUERY = gql`
    query GetCompetitions($id: ID!) {
        competition(id: $id) {
            _id
            name
            emblem
            type
            code
            teamCount

            area {
                name
                flag
            }

            teamOfTheWeek {
                goalkeeper { 
                    _id
                    name
                    teamCrest
                }
                defence { 
                    _id
                    name
                    teamCrest
                }
                midfield { 
                    _id
                    name
                    teamCrest
                    position {
                        area
                        specialty
                    }
                }
                offence { 
                    _id
                    name
                    teamCrest
                }
            }
            
            topTeams {
                title
                teams {
                    _id
                    name
                    shortName
                    tla
                    crest
                    position 
                    stat
                }
            }

            matches(limit: 3, sort: -1) {
                _id
                utcDate
                minute
                status
                homeTeam {
                    name
                    shortName
                    crest
                }
                score {
                    fullTime {
                        home 
                        away
                    }
                }
                awayTeam {
                    name
                    shortName
                    crest
                }
            }

            standings {
                stage
                type
                group
                table {
                    position
                    team {
                        _id
                        name
                        shortName
                        crest
                        matches(limit: 1, status: "TIMED") {
                            homeTeam {
                                _id
                                crest
                            }
                            awayTeam {
                                _id
                                crest
                            }
                        }
                    }
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
    }
`;

const CompetitionInfo = () => {
    const { id } = useParams();

    const { loading, error, data } = useQuery<{ competition: Competition }>(QUERY, { variables: { id }, fetchPolicy: 'no-cache' });

    if (loading) return (
        <div className="flex flex-col gap-4">
            <div className="col-span-2">
                <DetailsHeaderLoading />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[3fr,_1fr] gap-4">
                <DetailsLoading />
                <DetailsLoading />
                <DetailsHeaderLoading />
            </div>
        </div>
    );
    else if (error) return <ErrorMessage />;
    else if (!data) return <NothingWasFound />;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 px-3 md:px-4 lg:px-6 py-3 md:py-4 rounded-lg bg-white-100/10 border border-transparent">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xs font-semibold text-white-500">Matches</h3>
                    <span className="text-xs font-semibold text-green-400">All matches</span>
                </div>
                <div className="relative flex items-center gap-2">
                    <button className="hidden md:flex items-center justify-center w-8 aspect-square rounded-full border border-white-100/20 text-white-600">
                        <FaAngleLeft size={16} />
                    </button>
                    <div className="flex-1 flex gap-3 lg:gap-4 overflow-x-auto">
                        {   
                            data
                                ?.competition
                                ?.matches
                                ?.reverse()
                                ?.map((match) => (
                                    <Link key={match._id} href={`/match/${match._id}`} className="flex flex-1 justify-center min-w-[240px] gap-1 py-6 rounded-lg border border-white-100/10 hover:opacity-70">
                                        <div className="w-[12ch] flex flex-col justify-between items-center gap-4">
                                            <Image src={match.homeTeam.crest} alt={`${match.homeTeam.name} crest`} height={40} width={40} className="w-8 max-h-8 aspect-square object-contain" />
                                            <span className="max-w-[12ch] truncate font-semibold text-white-500 text-2xs">{match.homeTeam.shortName}</span>
                                        </div>
                                        <div className="flex flex-col justify-between items-center gap-4 py-1">
                                            {
                                                match.status !== 'TIMED' ?
                                                    <span className="flex items-center justify-center gap-1 text-base font-semibold text-white-400">
                                                        <span>{match.score.fullTime.home}</span>
                                                        <span>-</span>
                                                        <span>{match.score.fullTime.away}</span>
                                                    </span> :
                                                    <span className='text-white-400 text-base font-semibold'>{getTimeFormat(match.utcDate)}</span>
                                            }
                                            {
                                                /in_play|paused/i.test(match.status) ?
                                                    <span className='text-xs bg-yellow-400 font-semibold text-black-900 h-4 px-2 flex items-center justify-center rounded-full'>{match.minute === 'FT' || match.minute === 'HT' ? match.minute : `${match.minute}'`}</span> :
                                                    <span className="text-2xs text-white-700">{getDay(match.utcDate)}</span>
                                            }
                                        </div>
                                        <div className="w-[12ch] flex flex-col justify-between items-center gap-4">
                                            <Image src={match.awayTeam.crest} alt={`${match.awayTeam.name} crest`} height={40} width={40} className="w-8 max-h-8 aspect-square object-contain" />
                                            <span className="max-w-[12ch] truncate font-semibold text-white-500 text-2xs">{match.awayTeam.shortName}</span>
                                        </div>
                                    </Link>
                                ))
                        }
                        {
                            [1, 2, 3].slice(data?.competition?.matches?.length, ).map((item, index) => (
                                <div key={index} className={`flex flex-1 min-w-[240px] gap-3 p-6 items-center justify-center border border-white-100/10 rounded-lg`}>
                                    <div className="flex flex-col justify-between items-center gap-4">
                                        <span className="block w-10 aspect-square rounded-full bg-white-100/10"></span>
                                        <span className="w-12 h-3 rounded-sm bg-white-100/10"></span>
                                    </div>
                                    <div className="w-16 flex flex-col justify-between items-center gap-2">
                                        <span className="w-full h-4 rounded-sm bg-white-100/10"></span>
                                        <span className="w-4/5 h-2 rounded-sm bg-white-100/10"></span>
                                    </div>
                                    <div className="w-10 flex flex-col justify-between items-center gap-4">
                                        <span className="block w-10 aspect-square rounded-full bg-white-100/10"></span>
                                        <span className="w-12 h-3 rounded-sm bg-white-100/10"></span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button className="hidden md:flex items-center justify-center w-8 aspect-square rounded-full border border-white-100/20 text-white-600">
                        <FaAngleRight size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr,_320px] gap-4">
                <Standings competition={data.competition} />
                <div>
                    {
                        data?.competition?.teamOfTheWeek ? 
                            <TeamOfTheWeek players={data.competition.teamOfTheWeek} /> : 
                            null
                    }
                </div>
                <div className="rounded-xl overflow-clip grid md:grid-cols-2 lg:grid-cols-3 gap-0 bg-white-100/10 border border-transparent">
                    {
                        data?.competition?.topTeams ?
                            data.competition.topTeams.map(({ title, teams }) => (
                                <div key={title} className="flex flex-col p-6 pb-2 gap-4 border-r border-t lg:border-t-transparent border-white-100/10 lg:last:border-transparent mt-[-1px] lg:mt-0 md:mr-[-1px] lg:mr-0">
                                    <h3 className='text-xs font-semibold text-white-500'>{title}</h3>
                                    <ul className="flex flex-col flex-1 justify-between">
                                        {
                                            teams.map((team, index) => (
                                                <li key={team._id} className="border-b border-white-100/10 last:border-transparent">
                                                    <Link href={`/team/${team._id}`} className="flex gap-2 py-4 hover:opacity-70">
                                                        <span className="flex items-center justify-center w-6 max-h-6 max-w-6 aspect-square rounded-full">
                                                            <Image alt={`${team.name} crest`} src={team.crest} width={20} height={20} className="w-6 aspect-square object-contain" />
                                                        </span>
                                                        <div className="flex-1 flex flex-col">
                                                            <span className="w-full text-2xs text-white-400">{team.name}</span>
                                                            <span className="text-3xs text-white-700">{`${team.position}${team.position % 10 === 1 && team.position !== 11 ? 'st' : team.position % 10 === 2 ? 'nd' : team.position % 10 === 3 ? 'rd' : 'th'} in league`}</span>
                                                        </div>
                                                        <span className={`h-6 px-2 rounded-full ${index === 0 && (team.stat <= 10 ? 'bg-blue-300' : (team.stat > 10 && team.stat <= 20) ? 'bg-blue-400' : (team.stat > 20 && team.stat <= 30) ? 'bg-blue-500' : team.stat > 30 && team.stat <= 50 ? 'bg-blue-600' : 'bg-blue-700')} text-center text-sm text-white-100 font-semibold flex items-center justify-center`}>{team.stat}</span>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )) :
                            null
                    }
                </div>
            </div>
        </div>
    )
};

export default CompetitionInfo
