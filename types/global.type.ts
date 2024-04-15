import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { H2HAggregate, MatchGoals, MatchOutcome, MatchScore, MatchStatus, MatchTimeRemaining, Referee } from "./match.type";
import { CompetitionStandings } from "./competition.type";
import { TeamMatchOutcome } from "./team.type";


export type HeadToHead = {
    _id: string;
    aggregates: {
        numberOfMatches: number;
        homeTeam: number,
        awayTeam: number,
        halfTime: H2HAggregate,
        fullTime: H2HAggregate
    }
    matches: Match[];
}

export type Match = {
    _id: number;
    status: MatchStatus;
    minute: string;
    competition: Competition;
    timeRemaining: MatchTimeRemaining;
    utcDate: string,
    homeTeam: Team;
    awayTeam: Team;
    head2head: HeadToHead;
    venue: string;
    score: MatchScore;
    predictions: {
        halfTime: {
            outcome: MatchOutcome;
            goals: MatchGoals;
        },
        fullTime: {
            outcome: MatchOutcome;
            goals: MatchGoals;
        }
    }
    referees: Referee[];
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


export type Team = {
    _id: number;
    area: {
        name: string;
        flag: string | StaticImport;
    }
    name: string;
    shortName: string;
    tla: string;
    crest: string | StaticImport;
    address: string;
    website: string;
    founded: string;
    clubColors: string;
    venue: string;
    matchesPlayed: number;
    halfTime: TeamMatchOutcome;
    fullTime: TeamMatchOutcome;
    coach: Referee;
    hasOngoingMatch: boolean;
    matches: Match[]
};