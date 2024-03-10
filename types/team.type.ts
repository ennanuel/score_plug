import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Team = {
    _id: number;
    area: {
        name: string;
        flag: string | StaticImport
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
    wins: number;
    draws: number;
    losses: number;
    coach: {
        name: string;
        nationality: string;
    }
    hasOngoingMatch: boolean;
};

export type TeamStanding = {
    _id: number;
    index: number;
    crest: string | StaticImport;
    name: string;
    matchesPlayed: number;
    goalDifference: number;
    points: number;
    highlightedTeams: number[];
    relegationPositions: number;
    topPositions: number;
    midPositions: number;
}