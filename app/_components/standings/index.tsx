import { TEAM_STANDINGS } from "@/app/_assets/constants/team";
import { MdTag } from "react-icons/md";
import Standing from "./Standing";
import { Competition, CompetitionStandings } from "@/types/competition.type";
import { Match } from "@/types/match.type";

function Standings({ competition, match }: { competition?: Competition, match?: Match }) {
    if (!competition) return null;

    return (
        <div className="flex flex-col gap-4">
            {
                competition.standings.map((standing) => (
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
                                            highlightedTeams={[1208]}
                                            relegationPositions={15}
                                            topPositions={3}
                                            midPositions={5}
                                            teamStanding={teamStanding}
                                        />
                                    ))
                                }
                        </tbody>
                    </table>
                ))
            }
        </div>
    )
};

export default Standings;