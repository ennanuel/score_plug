"use client";

import { useState } from "react";
import { TEAM_FORM } from "@/app/_assets/constants/team";
import { FormBox, LoadingMessage, ErrorMessage, Standings, MatchesContainer } from "@/app/_components";
import { Match } from "@/types/global.type";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";

const QUERY = gql`
    query GetCompetitionHead2Head($id: ID!) {
        match(id: $id) {
            _id
            utcDate
            status
            minute

            homeTeam {
                _id
                name
                crest
                halfTime {
                    wins
                    draws
                    goalsConceded
                    goalsScored
                }
                fullTime {
                    wins
                    draws
                    goalsConceded
                    goalsScored
                }
                matches(status: "FINISHED") {
                    _id
                    utcDate
                    status
                    minute

                    score {
                        fullTime {
                            home
                            away
                        }
                    }
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
            awayTeam {
                _id
                name
                crest
                halfTime {
                    wins
                    draws
                    goalsConceded
                    goalsScored
                }
                fullTime {
                    wins
                    draws
                    goalsConceded
                    goalsScored
                }
                matches(status: "FINISHED") {
                    _id
                    utcDate
                    status
                    minute

                    score {
                        fullTime {
                            home
                            away
                        }
                    }
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

            head2head {
                _id
                aggregates {
                    numberOfMatches
                    halfTime {
                        homeTeam {
                            totalGoals
                            wins
                            draws
                            losses
                        }
                        awayTeam {
                            totalGoals
                            wins
                            draws
                            losses
                        }
                    }
                    fullTime {
                        homeTeam {
                            totalGoals
                            wins
                            draws
                            losses
                        }
                        awayTeam {
                            totalGoals
                            wins
                            draws
                            losses
                        }
                    }
                }

                
                matches {
                    _id
                    utcDate
                    status
                    minute

                    score {
                        fullTime {
                            home
                            away
                        }
                    }
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

            predictions {
                fullTime {
                    outcome {
                        homeWin
                        draw
                        awayWin
                    }
                }
            }

            competition {
                
                _id
                name
                emblem
                type
                code

                teams {
                    _id
                }
                area {
                    name
                    flag
                }
                currentSeason {
                    startDate
                    endDate
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
                            crest
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
    }
`

const H2H = () => {
    const { id } = useParams();
    const [showHomeSide, setShowHomeSide] = useState(true);

    const { loading, error, data } = useQuery<{ match: Match }>(QUERY, { variables: { id } });

    if (loading) return <LoadingMessage />;
    if (error) return <ErrorMessage />
    else if (!data) return <div>Nothing was found</div>;

    return (
        <div className='mt-2 p-4'>
            <p className='font-semibold text-s mt-6'>Overall Stats</p>
            <div className='flex flex-col items-center gap-2 p-2 px-5 pt-[40px] m-auto mt-2 border border-secondary-900/50'>
                <div className="flex w-[80%]">
                    <div style={{ width: `${data.match.predictions.fullTime.outcome.homeWin}%`}} className="relative top-0 left-0 w-[33.33%] h-2 rounded-l-[5px] bg-highlight-300">
                        <p className="absolute bottom-[calc(100%_+_5px)] left-[50%] flex items-center justify-center gap-1 translate-x-[-50%] text-[.7em] text-secondary-600">
                            <span>Home</span>
                            <span>({data.match.predictions.fullTime.outcome.homeWin}%)</span>
                        </p>
                    </div>
                    <div style={{ width: `${data.match.predictions.fullTime.outcome.draw}%`}} className="relative top-0 left-0 w-[33.34%] h-2 border-x border-primary-800 bg-highlight-500">
                        <p className="absolute bottom-[calc(100%_+_5px)] left-[50%] flex items-center justify-center gap-1 translate-x-[-50%] text-[.7em] text-secondary-600">
                            <span>Draw</span>
                            <span>({data.match.predictions.fullTime.outcome.draw}%)</span>
                        </p>
                    </div>
                    <div style={{ width: `${data.match.predictions.fullTime.outcome.awayWin}%` }} className="relative top-0 left-0 w-[33.33%] h-2 rounded-r-[5px] bg-highlight-700">
                        <p className="absolute bottom-[calc(100%_+_5px)] left-[50%] flex items-center justify-center gap-1 translate-x-[-50%] text-[.7em] text-secondary-600">
                            <span>Away</span>
                            <span>({data.match.predictions.fullTime.outcome.awayWin}%)</span>
                        </p>
                    </div>
                </div>

                <div className="flex w-full items-center justify-between gap-4 mt-2">
                    <p className='text-sm font-semibold text-secondary-500'>Matches Played</p>
                    <span className='font-bold'>{data.match.head2head?.aggregates?.numberOfMatches}</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                    <p className='text-xs text-secondary-600'>{data.match.homeTeam.name} Wins</p>
                    <span className='font-semibold text-sm'>{data.match.head2head?.aggregates?.fullTime?.homeTeam?.wins}</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                    <p className='text-xs text-secondary-600'>Matches Drawn</p>
                    <span className='font-semibold text-sm'>{data.match.head2head?.aggregates?.fullTime?.awayTeam?.draws}</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                    <p className='text-xs text-secondary-600'>{data.match.awayTeam.name} Wins</p>
                    <span className='font-semibold text-sm'>{data.match.head2head?.aggregates?.fullTime?.awayTeam?.wins}</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4 mt-2">
                    <p className='text-sm font-semibold text-secondary-500'>Goals Scored</p>
                    <span className='font-bold'>{data.match.head2head?.aggregates?.fullTime?.awayTeam?.totalGoals + data.match?.head2head?.aggregates?.fullTime?.homeTeam?.totalGoals}</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                    <p className='text-xs text-secondary-600'>{data.match.homeTeam.name} Goals</p>
                    <span className='font-semibold text-sm'>{data.match.head2head?.aggregates?.fullTime?.homeTeam?.totalGoals}</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                    <p className='text-xs text-secondary-600'>{data.match.homeTeam.name} United Goals</p>
                    <span className='font-semibold text-sm'>{data.match.head2head?.aggregates?.fullTime?.awayTeam?.totalGoals}</span>
                </div>
            
                <div className="flex flex-col gap-4 w-full mb-3">
                    <p className='font-semibold text-sm mt-6'>Previous Encounters</p>
                    <MatchesContainer matches={data.match.head2head.matches || []} />
                </div>
            </div>

            <p className='font-semibold mt-[60px]'>Individual Stats</p>
            <div className="flex items-center p-2 gap-3 mt-2">
                <button onClick={() => setShowHomeSide(true)} className={`px-4 h-[35px] rounded-md text-sm font-bold ${showHomeSide ? 'bg-secondary-100/10 border-secondary-100/10' : 'border-transparent bg-secondary-100/5'} border`}>
                    <Image src={data.match.homeTeam.crest || String(process.env.NEXT_IMAGE_URL)} alt={data.match.homeTeam.name} width={20} height={20} />
                </button>
                <button onClick={() => setShowHomeSide(false)} className={`px-4 h-[35px] rounded-md text-sm font-bold ${!showHomeSide ? 'bg-secondary-100/10 border-secondary-100/10' : 'border-transparent bg-secondary-100/5'} border`}>
                    <Image src={data.match.awayTeam.crest || String(process.env.NEXT_IMAGE_URL)} alt={data.match.homeTeam.name} width={20} height={20} />
                </button>
            </div>

            <div className="mt-2 border border-secondary-900/50">
                <div className="flex justify-between items-end gap-3 p-4">
                    <p className="text-sm font-semibold">Team Form</p>
                    <div className="flex gap-2 items-center justify-center">
                        {
                            TEAM_FORM.map((outcome) => <FormBox outcome={outcome} />)
                        }
                    </div>
                </div>
                
                <div className="flex justify-between items-center gap-3 py-2 px-4">
                    <p className="text-xs text-secondary-600">Average Goals Scored</p>
                    <p className="text-sm font-semibold">{data.match[showHomeSide ? 'homeTeam' : 'awayTeam'].fullTime.goalsScored}</p>
                </div>
                
                <div className="flex justify-between items-center gap-3 py-2 px-4">
                    <p className="text-xs text-secondary-600">Average Goals Conceded</p>
                    <p className="text-sm font-semibold">{data.match[showHomeSide ? 'homeTeam' : 'awayTeam'].fullTime.goalsConceded}</p>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                    <p className='font-semibold text-sm px-4'>Previous Matches</p>
                    <MatchesContainer matches={data.match.head2head.matches || []} />
                </div>

                <div className="flex flex-col mt-6 gap-6">
                    <p className='font-semibold text-smpx-4'>Team Standing</p>
                    <Standings competition={data?.match.competition} teams={[data.match.homeTeam._id, data.match.awayTeam._id]} />
                </div>
            </div>
        </div>
    )
};

export default H2H
