import { CompetitionTable } from "@/types/competition.type";



export function getTeamStandingStatus({ teamStanding, topPositions, midPositions, relegationPositions }: { teamStanding: CompetitionTable, topPositions: number, midPositions: number, relegationPositions: number }) {
    return teamStanding.position <= topPositions ?
        'TOP_TEAM' :
        (teamStanding.position > topPositions && teamStanding.position <= midPositions) ?
            'MID_TEAM' :
            (teamStanding.position >= relegationPositions) ?
                'LOW_TEAM' :
                '';
}