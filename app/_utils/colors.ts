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
    if (score.fullTime.homeTeam < score.fullTime.awayTeam) result.homeTextColor = 'text-secondary-700';
    else if (score.fullTime.awayTeam < score.fullTime.homeTeam) result.awayTextColor = 'text-secondary-700';
    else if (status !== 'TIMED' && (score.fullTime.awayTeam === score.fullTime.homeTeam)) result.homeTextColor = result.awayTextColor = 'text-secondary-700';
    return result;
}