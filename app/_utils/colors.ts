import { MatchStatus, MatchScore } from "@/types/match.type";

export function getTeamColors(status: MatchStatus, score: MatchScore) {
    const result = { homeTextColor: 'text-white-300', awayTextColor: 'text-white-400' };
    if (score.fullTime.home < score.fullTime.away) result.homeTextColor = 'text-white-700';
    else if (score.fullTime.away < score.fullTime.home) result.awayTextColor = 'text-white-700';
    else if (status !== 'TIMED' && (score.fullTime.away === score.fullTime.home)) result.homeTextColor = result.awayTextColor = 'text-white-700';
    return result;
};

export function getTeamFormColors(outcome: string) {
    return (
        outcome === 'W' ?
            'bg-green-600/10 border-green-900/50 text-green-500' :
            outcome === 'D' ?
                'bg-white-100/10 border-white-900/50 text-white-800' :
                'bg-red-800/10 border-red-900/50 text-red-500'
    );
}

export function getMatchTimeColor(status: MatchStatus) {
    return status === "IN_PLAY" || status === "PAUSED" ? 
        'bg-yellow-500 text-black-900' : 
        'bg-white-100/20 text-white-100/50';
}

export function getTableRowHighlightColors(isHighlighted: boolean, teamPosition: "TOP_TEAM" | "MID_TEAM" | "LOW_TEAM" |"") {
    return isHighlighted ?
        (
            teamPosition === 'TOP_TEAM' ?
                'bg-green-400/10' :
                teamPosition === 'MID_TEAM' ?
                    'bg-yellow-400/10' :
                    teamPosition === 'LOW_TEAM' ? 'bg-red-400/10' :
                        'bg-white-100/10'
        ) :
        'border-transparent';
};

export function getTablePositionColor(teamPosition: "TOP_TEAM" | "MID_TEAM" | "LOW_TEAM" | "") { 
    return teamPosition === 'TOP_TEAM' ?
        'bg-green-500' :
        teamPosition === 'MID_TEAM' ?
            'bg-yellow-500' :
            teamPosition === 'LOW_TEAM' ?
                'bg-red-500' :
                'bg-tranparent';
};

export const getMatchTeamColors = (clubColors: string) => clubColors?.split('/')?.map(color => color.replace(/\s+/ig, '').toLowerCase()) || ['rgba(255, 255, 255, 0.1)'];