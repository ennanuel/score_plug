export type MatchStatus = "TIMED" | "PAUSED" | "IN_PLAY" | "FINISHED" | "CANCELLED" | "POSTPONED";

export type MatchScore = {
    duration: string;
    winner: null | "HOME_TEAM" | "AWAY_TEAM" | "DRAW";
    firstHalf: {
        home: number;
        away: number;
    },
    secondHalf: {
        home: number;
        away: number;
    },
    fullTime: {
        home: number;
        away: number;
    }
};

export type Match = {
    _id: number;
    status: MatchStatus;
    minute: string;
    competition: {
        _id: number;
        name: string;
        emblem: string | undefined;
        area: {
            name: string;
            flag: string | undefined;
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
        crest: string | undefined;
        clubColors: string;
    },
    awayTeam: {
        _id: number;
        name: string;
        crest: string | undefined;
        clubColors: string;
    },
    venue: string;
    score: MatchScore;
    predictions: {
        halfTime: {
            outcome: {
                homeWin: number;
                draw: number;
                awayWin: number;
            },
            goals: {
                _1: {
                    over: number,
                    under: number
                },
                _2: {
                    over: number,
                    under: number
                },
                _3: {
                    over: number,
                    under: number
                },
                _4: {
                    over: number,
                    under: number
                }
            }
        },
        fullTime: {
            outcome: {
                homeWin: number;
                draw: number;
                awayWin: number;
            },
            goals: {
                _1: {
                    over: number,
                    under: number
                },
                _2: {
                    over: number,
                    under: number
                },
                _3: {
                    over: number,
                    under: number
                },
                _4: {
                    over: number,
                    under: number
                }
            }
        }
    }
    referees: {
        name: string;
        type: string;
        natitionaliity: string;
    }[]
}