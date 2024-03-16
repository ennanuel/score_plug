import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type MatchStatus = "TIMED" | "PAUSED" | "IN_PLAY" | "FINISHED" | "CANCELLED" | "POSTPONED";

export type MatchScore = {
    duration: string;
    winner: null | "HOME_TEAM" | "AWAY_TEAM" | "DRAW";
    firstHalf: {
        homeTeam: number;
        awayTeam: number;
    },
    secondHalf: {
        homeTeam: number;
        awayTeam: number;
    },
    fullTime: {
        homeTeam: number;
        awayTeam: number;
    }
};

export type Match = {
    _id: number;
    status: MatchStatus;
    minute?: string;
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
    },
    awayTeam: {
        _id: number;
        name: string;
        crest: string | StaticImport;
    },
    score: MatchScore;
    outcome: {
        homeWin: number;
        draw: number;
        awayWin: number;
    }
}