"use client";

import { ErrorMessage, MatchesContainer, NothingWasFound } from "@/app/_components";
import { Match } from "@/types/global.type";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { DetailsLoading } from "@/app/_components/loading";
import { getMatchTeamColors } from "@/app/_utils/colors";
import { useMemo, useState } from "react";
import { IoIosHelpCircle } from "react-icons/io";

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
                shortName
                tla
                crest
                clubColors
                matchesPlayed

                halfTime {
                    wins
                    draws
                    losses
                    goalsConceded
                    goalsScored
                }
                fullTime {
                    wins
                    draws
                    losses
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
                shortName
                tla
                crest
                clubColors
                matchesPlayed

                halfTime {
                    wins
                    draws
                    losses
                    goalsConceded
                    goalsScored
                }
                fullTime {
                    wins
                    draws
                    losses
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
                    homeTeam
                    awayTeam
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

                    competition {
                        name
                        emblem
                    }

                    score {
                        firstHalf {
                            home
                            away
                        }
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

        }
    }
`

const H2H = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery<{ match: Match }>(QUERY, { variables: { id } });
    const [statPeriod, setStatPeriod] = useState<"halfTime" | "fullTime">("fullTime");

    const { homeTeamPrevWins, homeTeamPrevLosses, homeTeamPrevDraws, homeTeamPrevGoalsScored, homeTeamPrevGoalsConceded, homeTeamExpectedGoals, awayTeamPrevWins, awayTeamPrevLosses, awayTeamPrevDraws, awayTeamPrevGoalsScored, awayTeamPrevGoalsConceded, awayTeamExpectedGoals } = useMemo(() => (
        data?.match ? 
            {
                homeTeamPrevWins: data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'][statPeriod].wins,
                homeTeamPrevLosses: data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'][statPeriod].losses,
                homeTeamPrevDraws: data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'][statPeriod].draws,
                homeTeamPrevGoalsScored: data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'][statPeriod].goalsScored,
                homeTeamPrevGoalsConceded: data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'][statPeriod].goalsConceded,
                homeTeamExpectedGoals: (data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'][statPeriod].goalsScored / data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'].matchesPlayed),
                awayTeamPrevWins: data.match[data.match.awayTeam._id == data.match.head2head.aggregates.awayTeam ? 'awayTeam' : 'homeTeam'][statPeriod].wins,
                awayTeamPrevLosses: data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'awayTeam' : 'homeTeam'][statPeriod].losses,
                awayTeamPrevDraws: data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'awayTeam' : 'homeTeam'][statPeriod].draws,
                awayTeamPrevGoalsScored: data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'awayTeam' : 'homeTeam'][statPeriod].goalsScored,
                awayTeamPrevGoalsConceded: data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'awayTeam' : 'homeTeam'][statPeriod].goalsConceded,
                awayTeamExpectedGoals: (data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'awayTeam' : 'homeTeam'][statPeriod].goalsScored / data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'awayTeam' : 'homeTeam'].matchesPlayed),
            } :
            { homeTeamPrevWins: 0, homeTeamPrevLosses: 0, homeTeamPrevDraws: 0, homeTeamPrevGoalsScored: 0, homeTeamPrevGoalsConceded: 0, homeTeamExpectedGoals: 0, awayTeamPrevWins: 0, awayTeamPrevLosses: 0, awayTeamPrevDraws: 0, awayTeamPrevGoalsScored: 0, awayTeamPrevGoalsConceded: 0, awayTeamExpectedGoals: 0 }
    ), [data, statPeriod]);

    const { homeTeamH2HWins, homeTeamH2HLosses, homeTeamH2HDraws, homeTeamH2HGoals, awayTeamH2HWins, awayTeamH2HLosses, awayTeamH2HDraws, awayTeamH2HGoals } = useMemo(() => (
        data?.match ?
        {
            homeTeamH2HWins: data.match.head2head.aggregates[statPeriod][data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'].wins,
            homeTeamH2HLosses: data.match.head2head.aggregates[statPeriod][data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'].losses,
            homeTeamH2HDraws: data.match.head2head.aggregates[statPeriod][data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'].draws,
            homeTeamH2HGoals: data.match.head2head.aggregates[statPeriod][data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'].totalGoals,
            awayTeamH2HWins: data.match.head2head.aggregates[statPeriod][data.match.awayTeam._id == data.match.head2head.aggregates.awayTeam ? 'awayTeam' : 'homeTeam'].wins,
            awayTeamH2HLosses: data.match.head2head.aggregates[statPeriod][data.match.awayTeam._id == data.match.head2head.aggregates.awayTeam ? 'awayTeam' : 'homeTeam'].losses,
            awayTeamH2HDraws: data.match.head2head.aggregates[statPeriod][data.match.awayTeam._id == data.match.head2head.aggregates.awayTeam ? 'awayTeam' : 'homeTeam'].draws,
            awayTeamH2HGoals: data.match.head2head.aggregates[statPeriod][data.match.awayTeam._id == data.match.head2head.aggregates.awayTeam ? 'awayTeam' : 'homeTeam'].totalGoals,
        } :
        { homeTeamH2HWins: 0, homeTeamH2HLosses: 0, homeTeamH2HDraws: 0, homeTeamH2HGoals: 0, awayTeamH2HWins: 0, awayTeamH2HLosses: 0, awayTeamH2HDraws: 0, awayTeamH2HGoals: 0 }
    ), [data, statPeriod])
    const { homeTeamColor, homeTeamWinPercentage, awayTeamColor, awayTeamWinPercentage } = useMemo(() => (data?.match ? 
        { 
            homeTeamColor: getMatchTeamColors(data.match[data.match.homeTeam._id == data.match.head2head.aggregates.homeTeam ? 'homeTeam' : 'awayTeam'].clubColors)[0],
            awayTeamColor: getMatchTeamColors(data.match[data.match.awayTeam._id == data.match.head2head.aggregates.awayTeam ? 'awayTeam' : 'homeTeam'].clubColors)[0],
            homeTeamWinPercentage: `${Math.round((homeTeamH2HWins / (homeTeamH2HWins + awayTeamH2HWins)) * 100)}%`,
            awayTeamWinPercentage: `${Math.round((awayTeamH2HWins / (homeTeamH2HWins + awayTeamH2HWins)) * 100)}%`,
        } : 
        { homeTeamColor: "", homeTeamWinPercentage: "", awayTeamColor: "", awayTeamWinPercentage: "" }
    ), [data, statPeriod])

    if (loading) return <DetailsLoading />;
    else if (error) return <ErrorMessage />;
    else if (!data) return <NothingWasFound noBackground />;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col rounded-xl bg-[#191919] border border-transparent">
                <div className="flex justify-evenly gap-3 sm:gap-6 px-3 sm:px-6 p-6">
                    <span className="flex gap-2 sm:gap-6">
                        <Image src={data.match.homeTeam.crest} alt={`${data.match.homeTeam.name} crest`} height={48} width={48} className="hidden sm:block w-10 max-h-10 aspect-square object-contain" />
                        <div className="flex flex-col gap-2 sm:gap-3 justify-center items-center text-white-100">
                            <span className="relative overflow-hidden h-10 flex items-center justify-center rounded-full bg-white-100/10 w-16">
                                <span style={{ backgroundColor: homeTeamColor }} className="absolute top-0 left-0 opacity-50 block w-full h-full bg-white-100/10" />
                                <span className="relative text-lg font-bold">
                                    {
                                        data
                                            .match
                                            .head2head
                                            .aggregates
                                            [statPeriod]
                                            [Number(data.match.homeTeam._id) == Number(data.match.head2head.aggregates.homeTeam) ? 'homeTeam' : 'awayTeam']
                                            .wins
                                    }
                                </span>
                            </span>
                            <span className="text-sm font-semibold">Wins</span>
                        </div>
                    </span>
                    <div className="flex flex-col gap-2 sm:gap-3 justify-center items-center text-white-100">
                        <span className="h-10 flex items-center justify-center rounded-full bg-white-100/10 w-10 sm:w-16">
                            <span className="text-lg font-bold">
                                {
                                    data
                                        .match
                                        .head2head
                                        .aggregates
                                        [statPeriod]
                                        .homeTeam
                                        .draws
                                }
                            </span>
                        </span>
                        <span className="text-sm font-semibold">Draws</span>
                    </div>
                    <span className="flex gap-2 sm:gap-6">
                        <div className="flex flex-col gap-2 sm:gap-3 justify-center items-center text-white-100">
                            <span className="relative overflow-hidden h-10 flex items-center justify-center rounded-full bg-white-100/10 w-16">
                                <span style={{ backgroundColor: awayTeamColor }} className="absolute top-0 left-0 opacity-50 block w-full h-full bg-white-100/10" />
                                <span className="relative text-lg font-bold">
                                    {
                                        data
                                            .match
                                            .head2head
                                            .aggregates
                                            [statPeriod]
                                            [Number(data.match.awayTeam._id) == Number(data.match.head2head.aggregates.awayTeam) ? 'awayTeam' : 'homeTeam']
                                            .wins
                                    }
                                </span>
                            </span>
                            <span className="text-sm font-semibold">Wins</span>
                        </div>
                        <Image src={data.match.awayTeam.crest} alt={`${data.match.awayTeam.name} crest`} height={48} width={48} className="hidden sm:block w-10 max-h-10 aspect-square object-contain" />
                    </span>
                </div>
                {
                    data.match.head2head.matches.length ?
                        <div className="flex flex-col pb-2">
                            <div className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-3 border-y border-white-100/10">
                                {
                                    [{ title: "Full time", value: "fullTime" }, { title: "Half time", value: "halfTime" }]
                                        .map(({ title, value }) => (
                                            <button 
                                                key={value}
                                                onClick={() => setStatPeriod(value as "halfTime" | "fullTime")} 
                                                className={`${value === statPeriod ? 'bg-white-100 text-black-900' : 'bg-white-100/10 text-white-600 hover:bg-white-100/20 hover:text-white-500'} h-7 rounded-full px-4 flex items-center justify-center`}
                                                >
                                                <span className="text-2xs">{title}</span>
                                            </button>
                                        ))
                                }
                            </div>
                            <MatchesContainer matches={data.match.head2head.matches} showDateAndCompetition showHalfTimeScore={statPeriod === 'halfTime'} />
                        </div> :
                        null
                }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#191919] rounded-xl border border-transparent">
                <div className="flex flex-col gap-4 p-6 border-b sm:mb-[-1px] mr-[-1px] sm:border-r-white-100/10 sm:border-r border-white-100/10">
                    <h3 className="text-xs font-semibold text-white-100 text-center">Head-to-Head stats</h3>
                    <span className="text-3xs text-white-400 text-center mt-2">Win percentage</span>
                    <div className="flex gap-[2px] h-8 rounded-full overflow-hidden">
                        <span 
                            style={{ width: homeTeamWinPercentage }} 
                            className="relative h-full flex justify-start items-center min-w-10 max-w-[calc(100%_-_40px)] px-3"
                        >
                        <span style={{ backgroundColor: homeTeamColor }} className="bg-white-100/10 absolute top-0 left-0 w-full h-full opacity-70"></span>
                            <span className="relative text-sm font-semibold text-white drop-shadow-lg text-white-400">{homeTeamWinPercentage}</span>
                        </span>
                        <span 
                            style={{ width: awayTeamWinPercentage }} 
                            className="relative h-full flex justify-end items-center drop-shadow-lg drop-shadow-black-900/50 min-w-10 max-w-[calc(100%_-_40px)] px-3"
                        >
                            <span style={{ backgroundColor: awayTeamColor }} className="bg-white-100/10 absolute top-0 left-0 w-full h-full opacity-70"></span>
                            <span className="relative text-sm font-semibold text-white drop-shadow-lg text-white-400">{awayTeamWinPercentage}</span>
                        </span>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: homeTeamH2HWins > 0 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{homeTeamH2HWins}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Games won</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: awayTeamH2HWins > 0 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{awayTeamH2HWins}</span>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: homeTeamH2HLosses > 1 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{homeTeamH2HLosses}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Games lost</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: awayTeamH2HLosses > 1 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{awayTeamH2HLosses}</span>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: homeTeamH2HDraws > 0 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{homeTeamH2HDraws}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Games drawn</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: awayTeamH2HDraws > 0 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{awayTeamH2HDraws}</span>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: homeTeamH2HGoals > 4 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{homeTeamH2HGoals}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Goals scored</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: awayTeamH2HGoals > 4 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{awayTeamH2HGoals}</span>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: awayTeamH2HGoals > 1 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{awayTeamH2HGoals}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Goals conceded</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: homeTeamH2HGoals > 1 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{homeTeamH2HGoals}</span>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: Math.floor(homeTeamH2HWins / data.match.head2head.aggregates.numberOfMatches) > 0 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{(homeTeamH2HGoals / data.match.head2head.aggregates.numberOfMatches).toFixed(2)}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Expected goals (xG)</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: Math.floor(awayTeamH2HWins / data.match.head2head.aggregates.numberOfMatches) > 0 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{(awayTeamH2HGoals / data.match.head2head.aggregates.numberOfMatches).toFixed(2)}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-6">
                    <h3 className="text-xs font-semibold text-white-100 text-center">Individual team stats</h3>
                    <div className="grid mt-2 grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: homeTeamPrevWins > 0 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{homeTeamPrevWins}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Games won</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: awayTeamPrevWins > 0 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{awayTeamPrevWins}</span>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: homeTeamPrevLosses > 1 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{homeTeamPrevLosses}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Games lost</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: awayTeamPrevLosses > 1 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{awayTeamPrevLosses}</span>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: homeTeamPrevDraws > 0 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{homeTeamPrevDraws}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Games drawn</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: awayTeamPrevDraws > 0 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{awayTeamPrevDraws}</span>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: homeTeamPrevGoalsScored > 4 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{homeTeamPrevGoalsScored}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Goals scored</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: awayTeamPrevGoalsScored > 4 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{awayTeamPrevGoalsScored}</span>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: homeTeamPrevGoalsConceded > 1 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{homeTeamPrevGoalsConceded}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Goals conceded</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: awayTeamPrevGoalsConceded > 1 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{awayTeamPrevGoalsConceded}</span>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-3 h-5">
                        <div className="flex justify-start h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: Math.floor(homeTeamExpectedGoals) > 0 ? homeTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{(homeTeamExpectedGoals).toFixed(2)}</span>
                            </span>
                        </div>
                        <span className="text-3xs font-semibold text-white-100">Expected goals (xG)</span>
                        <div className="flex justify-end h-full">
                            <span className="relative flex items-center justify-center px-1 min-w-5 text-3xs font-semibold text-white-100">
                                <span style={{ backgroundColor: Math.floor(awayTeamExpectedGoals) > 0 ? awayTeamColor : "" }} className="absolute top-0 left-0 w-full h-full block rounded-full opacity-60"></span>
                                <span className="relative">{(awayTeamExpectedGoals).toFixed(2)}</span>
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex items-end">
                        <div className="w-full flex text-white-700 items-center justify-center gap-1 hover:underline">
                            <span className="text-3xs">What does Expect Goals(xG) mean?</span>
                            <IoIosHelpCircle size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default H2H
