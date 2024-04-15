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
    _1: GoalsOutcome;
    _2: GoalsOutcome;
    _3: GoalsOutcome;
    _4: GoalsOutcome;
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
};

export type H2HAggregate = {
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