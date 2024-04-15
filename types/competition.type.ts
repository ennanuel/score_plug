import { Team } from "./global.type";

export type CompetitionTable = {
    position: number;
    team: Team;
    playedGames: number;
    form: string;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
};

export type CompetitionStandings = {
    stage: string;
    type: string;
    group: string;
    table: CompetitionTable[];
};