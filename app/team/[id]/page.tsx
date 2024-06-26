"use client";

import { gql, useQuery } from '@apollo/client';

import { ErrorMessage, MatchesContainer, NothingWasFound, TeamForm } from '@/app/_components';

import { Team } from '@/types/global.type';
import { useParams } from 'next/navigation';
import { DetailsLoading } from '@/app/_components/loading';

import { loadImage } from "@/app/_utils/competition";

import Link from 'next/link';
import Image from 'next/image';
import { BsDot } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';

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

            matches(status: "FINISHED") {
                _id
                utcDate
                status
                minute

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
    }
`;

const TeamInfo = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery<{ team: Team }>(QUERY, { variables: { id } });

    if (loading) return <DetailsLoading />;
    else if (error) return <ErrorMessage />;
    else if (!data) return <NothingWasFound />;

    return (
        <div className="p-4 flex flex-col gap-4">
            <ul className="border border-secondary-900/50 rounded-md">
                <li className="flex items-center justify-between gap-4 p-2 border-t border-secondary-900/50">
                    <span className="text-xs font-semibold">Region</span>
                    <div className="flex items-center gap-1">
                        <Image src={data.team.area.flag} alt="Team area flag" width={15} height={15} className='object-contain aspect-square' />
                        <span className="text-xs text-secondary-600">{data.team.area.name}</span>
                    </div>
                </li>
                <li className="flex items-center justify-between gap-4 p-2 border-t border-secondary-900/50">
                    <span className="text-xs font-semibold">Venue</span>
                    <span className="text-xs text-secondary-600">{data.team.venue || "Not available"}</span>
                </li>
                <li className="p-2 border-t border-secondary-900/50">
                    <a href={data.team.website || "#"} target={data.team.website && '_blank'} className="flex items-center justify-between group gap-4">
                        <span className="font-semibold text-xs">Website</span>
                        {data.team.website ? <FiExternalLink size={20} /> : <span className="text-xs text-secondary-600 group-hover:underline">Not Available</span>}
                    </a>
                </li>
                <li className="flex items-center justify-between gap-4 p-2 border-t border-secondary-900/50">
                    <span className="text-xs font-semibold">Founded</span>
                    <span className="text-secondary-600 text-xs">{data.team.founded}</span>
                </li>
                <li className="flex items-center justify-between gap-4 p-2 border-t border-secondary-900/50">
                    <span className="text-xs font-semibold">Coach</span>
                    {
                        data.team.coach.name ? 
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-secondary-600">{data.team.coach.name}</span>
                                <BsDot size={20} />
                                <span className="text-xs text-secondary-600 font-semibold">{data.team.coach.nationality || 'Country not available'}</span>
                            </div> :
                            <p className="text-xs text-secondary-600">Not available</p>
                    }
                </li>
                <li className="flex items-center flex-wrap gap-2 p-2 border-t border-secondary-900/50">
                    {
                        data.team.competitions.map((competition) => (
                            <Link href={`/competition/${competition._id}`} className="flex items-center gap-2 px-2 h-[40px] border border-secondary-900/50 hover:bg-secondary-900/50">
                                <Image src={competition.emblem} width={25} height={25} loader={loadImage} alt={`${data.team.name} emblem`} className="object-contain aspect-square" />
                                <span className='text-xs text-secondary-600'>{competition.name}</span>
                            </Link>
                        ))
                    }
                </li>
            </ul>

            <ul className="border border-secondary-900/50 rounded-md">
                <li className="flex justify-between items-end gap-3 p-2 m-2">
                    <p className="text-sm font-semibold">Matches Played</p>
                    <span className="text-sm font-semibold">{data.team.matchesPlayed}</span>
                </li>
        
                <li className="flex justify-between items-center gap-3 p-2 px-4 border-t border-secondary-900/50">
                    <p className="text-xs text-secondary-600">Goals Scored</p>
                    <p className="text-xs font-bold">{data.team.fullTime.goalsScored}</p>
                </li>
        
                <li className="flex justify-between items-center gap-3 p-2 px-4 border-t border-secondary-900/50">
                    <p className="text-xs text-secondary-600">Goals Conceded</p>
                    <p className="text-xs font-bold">{data.team.fullTime.goalsConceded}</p>
                </li>
                
                <li className="flex justify-between items-center gap-3 p-2 px-4 border-t border-secondary-900/50">
                    <p className="text-xs">Team Form</p>
                    <TeamForm matches={data.team.matches} teamId={String(id)} />
                </li>
            </ul>

            <p className='font-semibold text-sm text-center m-2 mt-6'>Previous Matches</p>
            <MatchesContainer loading={loading} error={Boolean(error)} matches={data.team.matches} />
        </div>
    )
};

export default TeamInfo
