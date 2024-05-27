import { MatchStatus, MatchScore } from "@/types/match.type";
import { MATCH_CARD_BACKGROUNDS, HIGHLIGHT_BACKGROUNDS } from "../_assets/constants/match";

export function getHighlightBackground(matchStatus: MatchStatus): string { 
    const index = matchStatus.toLowerCase() as keyof typeof HIGHLIGHT_BACKGROUNDS;
    return HIGHLIGHT_BACKGROUNDS[index] || 'bg-white-100/5';
};

export function getMatchCardBackground(matchStatus: MatchStatus): string { 
    const index = matchStatus.toLowerCase() as keyof typeof MATCH_CARD_BACKGROUNDS;
    return MATCH_CARD_BACKGROUNDS[index] || 'bg-transparent';
};

export function getTeamColors(status: MatchStatus, score: MatchScore) {
    const result = { homeTextColor: 'text-secondary-300', awayTextColor: 'text-secondary-400' };
    if (score.fullTime.home < score.fullTime.away) result.homeTextColor = 'text-secondary-700';
    else if (score.fullTime.away < score.fullTime.home) result.awayTextColor = 'text-secondary-700';
    else if (status !== 'TIMED' && (score.fullTime.away === score.fullTime.home)) result.homeTextColor = result.awayTextColor = 'text-secondary-700';
    return result;
};

export function getTeamFormColors(outcome: string) {
    return (
        outcome === 'W' ?
            'bg-green-500/50 text-green-500' :
            outcome === 'D' ?
                'bg-secondary-800/50 text-secondary-800' :
                'bg-red-500/50 text-red-500'
    );
}

export function getMatchTimeColor(status: MatchStatus) {
    return status !== 'IN_PLAY' ?
        (status === 'PAUSED' ? 'text-highlight-600' : 'FINISHED' ? 'text-secondary-800' : 'text-secondary-500') :
        'text-highlight-400';
}

export function getTableRowHighlightColors(isHighlighted: boolean, teamPosition: "TOP_TEAM" | "MID_TEAM" | "LOW_TEAM" |"") {
    return isHighlighted ?
        (
            teamPosition === 'TOP_TEAM' ?
                'bg-green-400/10 border-green-500' :
                teamPosition === 'MID_TEAM' ?
                    'bg-yellow-400/10 border-yellow-500' :
                    teamPosition === 'LOW_TEAM' ? 'bg-red-400/10 border-red-500' :
                        'bg-white-100/10 border-white-500'
        ) :
        'border-transparent';
};

export function getTablePositionColor(teamPosition: "TOP_TEAM" | "MID_TEAM" | "LOW_TEAM" | "") { 
    return teamPosition === 'TOP_TEAM' ?
        'bg-green-500 text-primary-800' :
        teamPosition === 'MID_TEAM' ?
            'bg-yellow-500 text-primary-800' :
            teamPosition === 'LOW_TEAM' ?
                'bg-red-500 text-primary-800' :
                'text-gray-500';
};

export const getMatchTeamColors = (clubColors: string) => clubColors?.split('/')?.map(color => color.replace(/\s+/ig, '').toLowerCase() || []);