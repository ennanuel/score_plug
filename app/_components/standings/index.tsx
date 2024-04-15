"use client";

import { useMemo } from "react";
import { MdTag } from "react-icons/md";
import Standing from "./Standing";
import { Competition } from "@/types/global.type";
import { COMPETITIONS_STANDINGS_STRUCTURE } from "@/app/_assets/constants/competition";

function Standings({ competition, teams = [] }: { competition?: Competition, teams?: number[] }) {
    const { relegationPositions, topPositions, midPositions } = useMemo(() => {
        const structureKeys = Object.keys(COMPETITIONS_STANDINGS_STRUCTURE);
        const key = structureKeys.find(key => (new RegExp(key)).test(String(competition?.code)));
        return COMPETITIONS_STANDINGS_STRUCTURE[(key as keyof typeof COMPETITIONS_STANDINGS_STRUCTURE) || "CL"];
    }, [])
    
    if (!competition) return null;

    return (
        <div className="flex flex-col">
            {
                competition.standings.map((standing) => (
                <div className="last: border-b last:border-white-100/10">
                    {competition.type === 'CUP' && <h3 className="p-2 px-4 border-t border-white-100/5 bg-white-100/5 font-semibold text-sm">{standing.group}</h3>}
                    <table className="w-full">
                        <thead className="text-xs text-secondary-700 h-8 border-y border-secondary-900/50">
                        <th className="w-[50px] font-semibold text-center">
                            <span className="flex items-center justify-center w-full">
                            <MdTag />
                            </span>
                        </th>
                            <th className="text-left font-semibold">Team</th>
                            <th className="w-[50px] font-semibold">PL</th>
                            <th className="w-[50px] font-semibold">DIFF</th>
                            <th className="w-[50px] font-semibold">PTS</th>
                        </thead>
                            <tbody>
                                {
                                    standing.table.map((teamStanding, index) => (
                                        <Standing
                                            key={index}
                                            highlightedTeams={teams}
                                            relegationPositions={relegationPositions}
                                            topPositions={topPositions}
                                            midPositions={midPositions}
                                            teamStanding={teamStanding}
                                        />
                                    ))
                                }
                        </tbody>
                    </table>
                </div>
                ))
            }
        </div>
    )
};

export default Standings;