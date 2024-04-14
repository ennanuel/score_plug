import { DateAndStatusFilter, MatchCard } from "@/app/_components/";
import { Match } from "@/types/global.type";
import { MATCHES } from "@/app/_assets/constants/match";
import { Suspense } from "react";

const TeamMatches = () => {
    return (
        <Suspense>
            <div className="p-2">
                <DateAndStatusFilter />

                <ul className="flex flex-col gap-3 mt-4 p-2 border border-secondary-900/50">
                    {
                        MATCHES.map((match, index) => <li key={index}><MatchCard {...(match as Match)} /></li>)
                    }
                </ul>
            </div>
        </Suspense>
    )
}

export default TeamMatches