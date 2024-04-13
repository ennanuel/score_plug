import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Match } from "./match.type";
import { Team } from "./team.type";

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

export type Competition = {
    _id: number;
    code: string;
    area: {
        name: string;
        flag: string | StaticImport;
    };
    name: string;
    type: string;
    emblem: string | StaticImport;
    currentSeason: {
        startDate: string;
        endDate: string;
        currentMatchday: number;
        winner: number;
    };
    hasLiveMatch: boolean;
    noOfMatches: number;
    matches: Match[];
    recentMatches: {
        matches: number;
        hasLiveMatch: boolean;
    };
    isFavorite: boolean;
    teams: Team[];
    standings: CompetitionStandings[];
};