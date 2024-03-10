import { MATCHES } from '@/app/_assets/constants/match';
import { DateAndStatusFilter, MatchCard } from '@/app/_components';
import { Match } from '@/types/match.type';
import { Suspense } from 'react';

const CompetitionMatches = () => {
    return (
        <Suspense>
            <div className="p-2">
                <div className="flex flex-col gap-3 mt-4 p-2 border border-secondary-900/50">
                    <DateAndStatusFilter />
                    <ul className="flex gap-1 flex-col">
                        {
                            MATCHES.map((match, index) => (
                                <li key={index}><MatchCard {...(match as Match)} /></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Suspense>
    )
};

export default CompetitionMatches