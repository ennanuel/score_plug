import { CompetitionTable } from "./competition.type";


export type TeamMatchOutcome = {
    wins: number,
    draws: number,
    losses: number,
    goalsScored: number,
    goalsConceded: number
}

export type TeamStanding = {
    teamStanding: CompetitionTable;
    highlightedTeams: number[];
    relegationPositions: number;
    topPositions: number;
    midPositions: number;
};