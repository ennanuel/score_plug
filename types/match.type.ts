import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type MatchStatus = "TIMED" | "PAUSED" | "IN_PLAY" | "FINISHED" | "CANCELLED" | "POSTPONED";

export type MatchScore = {
    duration: string;
    winner: null | "HOME_TEAM" | "AWAY_TEAM" | "DRAW";
    firstHalf: Score;
    secondHalf: Score;
    fullTime: Score;
};

export type Score = {
    home: number;
    away: number;
}

export type MatchGoals = {
    _1: GoalsOutcome;
    _2: GoalsOutcome;
    _3: GoalsOutcome;
    _4: GoalsOutcome
};

export type GoalsOutcome = {
    over: number;
    under: number;
};

export type MatchOutcome = {
    homeWin: number;
    draw: number;
    awayWin: number;
};

export type Referee = {
    name: string;
    type: string;
    nationality: string;
}

export type Match = {
    _id: number;
    status: MatchStatus;
    minute: string;
    competition: {
        _id: number;
        name: string;
        emblem: string | StaticImport;
        area: {
            name: string;
            flag: string | StaticImport;
        }
    }
    timeRemaining: {
        days: null | number;
        hours: null | number;
        minutes: null | number;
    },
    utcDate: string,
    homeTeam: {
        _id: number;
        name: string;
        crest: string | StaticImport;
        clubColors: string;
    },
    awayTeam: {
        _id: number;
        name: string;
        crest: string | StaticImport;
        clubColors: string;
    },
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
    referees: Referee[]
}