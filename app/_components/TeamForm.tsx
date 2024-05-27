import { Match } from '@/types/global.type';
import React, { useMemo } from 'react';
import FormBox from './FormBox';



function getTeamForm(matches: Match[] | undefined, teamId: string | number): { outcome: string; teamCrest: string; }[] {
    if (!matches) return [];

    const reorderedMatches: { main: { score: number }, other: { score: number, crest: string } }[] = matches.map(match => ({
        main: String(match.homeTeam._id) == teamId ? { score: match.score.fullTime.home } : { score: match.score.fullTime.away },
        other: String(match.homeTeam._id) == teamId ? { score: match.score.fullTime.away, crest: String(match.awayTeam.crest) } : { score: match.score.fullTime.home, crest: String(match.homeTeam.crest) }
    }));

    const teamFormArray = reorderedMatches.map(match => ({
        outcome: match.main.score > match.other.score ? 'W' : match.main.score < match.other.score ? 'L' : 'D',
        teamCrest: match.other.crest
    }));

    return teamFormArray;
};

const TeamForm = ({ matches, teamId }: { matches: Match[], teamId: string | number; }) => {
    const teamForm = useMemo(() => getTeamForm(matches, teamId), []);

    return (
        <div className="flex gap-2 items-center flex-wrap">
            {teamForm.map((form, index) => <FormBox {...form} />)}
        </div>
    );
}

export default TeamForm
