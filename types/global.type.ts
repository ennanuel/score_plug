import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { HeadToHeadAggregate, MatchHalfPrediction, MatchScore, MatchStatus, MatchTimeRemaining } from "./match.type";
import { CompetitionStandings, CompetitionSeason, TeamOfTheWeek, CompetitionTeamStat } from "./competition.type";
import { TeamMatchOutcome } from "./team.type";
import { Player } from "./player.type";

type Area = {
    name: string;
    flag: string | StaticImport
}


export type HeadToHead = {
    _id: string;
    aggregates: HeadToHeadAggregate;
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
    predictionAvailable?: boolean;
    matchday?: number;
    predictions?: {
        halfTime?: MatchHalfPrediction,
        fullTime?: MatchHalfPrediction
    };
    rounded?: boolean;
    wasUpdated?: boolean;
    scoreWasUpdated?: boolean;
    referees: Player[];
    showDateAndCompetition?: boolean;
    showHalfTimeScore?: boolean;
    small?: boolean;
    teamId?: string;
};

export type Competition = {
    _id: number;
    code: string;
    area: Area
    name: string;
    type: string;
    emblem: string | StaticImport;
    currentSeason: CompetitionSeason;
    matches: Match[];
    teamCount?: number;
    teamOfTheWeek?: TeamOfTheWeek;
    topTeams?: CompetitionTeamStat[];
    fullTeamStats: {
        headTitle: string;
        stats: CompetitionTeamStat[]
    }[];
    highlightMatches?: {
        matches: Match[];
        totalPages: number;
    };
    recentMatches: {
        matches: number;
        hasLiveMatch: boolean;
    };
    isFavorite?: boolean;
    teams: Team[];
    standings: CompetitionStandings[];
};


export type Team = {
    _id: number;
    area: Area;
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
    coach: Player;
    squad: {
        startingEleven: {
            goalkeeper: Player[];
            defence: Player[];
            midfield: Player[];
            offence: Player[];
        }
        otherPlayers: Player[];
    };
    hasOngoingMatch: boolean;
    matches: Match[];
    league: Competition;
    tablePosition: number;
    competitions: Competition[];
    averageSquadAge: number;
};