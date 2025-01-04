import { Team } from "./global.type";
import { Player } from "./player.type";

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

export type CompetitionSeason = {
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: number;
};

export type TeamOfTheWeek = {
    goalkeeper: Player[];
    defence: Player[];
    midfield: Player[];
    offence: Player[]
};

export type CompetitionTeamStat = {
    title: string;
    teams: {
        _id: number;
        name: string;
        shortName: string;
        tla: string;
        crest: string;
        position: number;
        stat: number;
    }[]
}