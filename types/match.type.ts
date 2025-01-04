

type H2HHalfAggregate = {
    homeTeam: { 
        id: number,
        wins: number,
        draws: number,
        losses: number,
        totalGoals: number
    },
    awayTeam: {
        id: number,
        wins: number,
        draws: number,
        losses: number,
        totalGoals: number
    }
}

export type MatchStatus = "TIMED" | "PAUSED" | "IN_PLAY" | "FINISHED" | "CANCELLED" | "POSTPONED";

export type MatchScore = {
    duration: string;
    winner: null | "HOME_TEAM" | "AWAY_TEAM" | "DRAW";
    firstHalf: Score;
    secondHalf: Score;
    fullTime: Score;
};

export type MatchTimeRemaining = {
    days: number | null;
    hours: number | null;
    minutes: number | null;
}

export type Score = {
    home: number;
    away: number;
}

export type MatchGoals = {
    _1?: GoalsOutcome;
    _2?: GoalsOutcome;
    _3?: GoalsOutcome;
    _4?: GoalsOutcome;
};

type GoalsOutcome = {
    over?: number;
    under?: number;
};

type MatchOutcome = {
    homeWin?: number;
    draw?: number;
    awayWin?: number;
};

export type MatchHalfPrediction = {
    outcome?: MatchOutcome;
    goals?: MatchGoals;
};

export type HeadToHeadAggregate = {
    numberOfMatches: number;
    homeTeam: number,
    awayTeam: number,
    halfTime: H2HHalfAggregate,
    fullTime: H2HHalfAggregate
};