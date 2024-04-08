import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Match } from "./match.type";

export type Competition = {
    _id: number;
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
};