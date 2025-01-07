"use client";

import { useMemo, useState } from "react";
import { MdTag } from "react-icons/md";
import Standing from "./Standing";
import { Competition } from "@/types/global.type";
import { COMPETITIONS_STANDINGS_STRUCTURE } from "@/app/_assets/constants/competition";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";

const OPTIONS = [
    { 
        title: "All",
        value: "position"
    },
    { 
        title: "Goals scored",
        value: "goalsFor"
    },
    { 
        title: "Goals conceded",
        value: "goalsAgainst"
    },
    { 
        title: "xG",
        value: "expectedGoals"
    },
];

type StandingProps = { 
    competition?: Competition, 
    teams?: number[]; 
    showOptions?: boolean; 
    showCompetition?: boolean; 
}

function Standings({ competition, teams = [], showOptions, showCompetition }: StandingProps) {
    const [sortType, setSortType] = useState(OPTIONS[0]);
    const [showMobileOptions, setShowMobileOptions] = useState(false);

    const chooseOption = ({ title, value }: { title: string; value: string }) => {
        setSortType({ title, value });
        setShowMobileOptions(false);
    }

    const { relegationPositions, topPositions, midPositions, positions } = useMemo(() => {
        const structureKeys = Object.keys(COMPETITIONS_STANDINGS_STRUCTURE);
        const key = structureKeys.find(key => (new RegExp(key)).test(String(competition?.code)));
        return COMPETITIONS_STANDINGS_STRUCTURE[(key as keyof typeof COMPETITIONS_STANDINGS_STRUCTURE) || "CL"];
    }, []);

    
    if (!competition) return null;

    return (
        <div className="flex flex-col gap-4">
            {
                competition.standings.map((standing, index) => (
                    <div key={index} className="rounded-xl overflow-hidden bg-white-100/10 border border-transparent flex flex-col">
                        {
                            index === 0 && showOptions ?
                                <div>
                                    <div className="hidden md:flex items-center gap-2 px-5 py-3 border-b border-white-100/10">
                                        {
                                            OPTIONS.map(({ title, value }) => (
                                                <button onClick={() => chooseOption({ title, value })} className={`${sortType.value === value ? 'bg-white-100 text-black-900' : 'bg-white-100/5 text-white-400 hover:bg-white-100/10 hover:text-white-400'} flex items-center justify-center px-4 rounded-full h-7`}>
                                                    <span className="text-2xs font-semibold">{title}</span>
                                                </button>
                                            ))
                                        }
                                    </div>
                                    <div className="relative md:hidden flex flex-col p-3">
                                        <button onClick={() => setShowMobileOptions(!showMobileOptions)} className={`${showMobileOptions ? ' bg-white-100/10 text-white-600' : 'bg-white-100 text-black-900'} h-6 rounded-full flex items-center justify-center gap-1 px-3 w-fit`}>
                                            <span className="text-2xs font-semibold">{sortType.title}</span>
                                            <IoMdArrowDropdown size={12} />
                                        </button>
                                        <div className="absolute z-[1] top-[calc(100%_+_4px)] left-0 flex flex-col gap-1 w-fit rounded-lg bg-[#202020] shadow-lg shadow-black-900/60">
                                            {
                                                OPTIONS
                                                    .filter((option) => option.value !== sortType.value)
                                                    .map(({ title, value }) => (
                                                        <button key={value} onClick={() => chooseOption({ title, value })} className="flex px-3 py-2 text-white-400 border-b border-white-100/10 last:border-transparent">
                                                            <span className="text-2xs font-semibold">{title}</span>
                                                        </button>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </div> :
                                null
                        }
                        
                        {
                        showCompetition ?
                                    <div className="flex items-center gap-2 px-5 py-3 border-b border-white-100/10">
                                        <Image src={competition.emblem} alt={`${competition.name}'s emblem`} width={20} height={20} className="w-4 aspect-square max-h-4 object-contain" />
                                        <span className="text-xs font-semibold text-white-100">{competition.name}</span>
                                    </div> :
                                    null
                        }
                        <div className="flex flex-col gap-4">
                            <span>
                                {
                                    competition.type === 'CUP' ?
                                        <h3 className="py-3 px-6 bg-white-100/5 font-semibold text-white-600 text-xs">{standing.group}</h3> :
                                        null
                                }
                            </span>
                            <div className="text-2xs font-semibold text-white-700 text-center h-8 flex gap-1">
                                <span className="w-[2px]"></span>
                                <span className="w-8 pl-2 flex items-center justify-center">
                                    <MdTag size={12} />
                                </span>
                                <span className="flex-1"></span>
                                <span className="w-12 flex items-center justify-center">PL</span>
                                <span className="w-12 hidden sm:flex items-center justify-center">+/-</span>
                                <span className="w-12 flex items-center justify-center">GD</span>
                                <span className="w-12 flex items-center justify-center">PTS</span>
                                <span className="w-12 hidden md:flex items-center justify-center">Next</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            {
                                standing
                                    .table
                                    .slice()
                                    .sort((teamA, teamB) => (
                                        sortType.value === 'position' ?
                                            teamA.position :
                                            sortType.value === 'goalsFor' ?
                                                teamB.goalsFor - teamA.goalsFor :
                                                sortType.value === 'goalsAgainst' ?
                                                teamA.goalsAgainst - teamB.goalsAgainst :
                                            teamB.goalDifference - teamA.goalDifference
                                    ))
                                    .map((teamStanding) => (
                                    <Standing
                                        key={teamStanding.team._id}
                                        highlightedTeams={teams}
                                        relegationPositions={relegationPositions}
                                        topPositions={topPositions}
                                        midPositions={midPositions}
                                        teamStanding={teamStanding}
                                    />
                                ))
                            }
                        </div>
                        <div className="flex gap-3 items-center pt-4 pb-3 px-6">
                            {
                                positions
                                    .slice()
                                    .map((position, index) => (
                                    <span key={position} className="flex items-center gap-2">
                                        <span className={`w-[6px] aspect-square rounded-full ${index === 0 ? 'bg-green-400' : index < positions.length - 1 ? 'bg-yellow-400' : 'bg-red-500' }`}></span>
                                        <span className="text-3xs text-white-700">{position}</span>
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default Standings;