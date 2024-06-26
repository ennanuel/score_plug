import premierLeagueEmblem from "../premier_league_emblem.png";
import premierLeagueEmblem2 from "../premier_league_emblem2.png";
import championsLeagueEmblem from "../ucl_emblem.png";
import laLigaEmblem from "../la_liga_emblem.png";
import { MATCHES } from "./match";
import { Match } from "@/types/global.type";

export const COMPETITION_LINKS = [
    { title: "Details", href: "" },
    { title: "Matches", href: "matches" },
    { title: "Teams", href: "teams" }
];

const CURRENT_SEASON = {
    startDate: "March 24, 2022",
    endDate: "July 01, 2023",
    currentMatchday: 20,
    winner: 0
};

const COMPETITION_MATCHES = MATCHES as Match[];

export const COMPETITIONS = [
    {
        _id: 300,
        area: {
            name: "England",
            flag: premierLeagueEmblem
        },
        name: "Premier League",
        type: "REGULAR",
        emblem: premierLeagueEmblem,
        currentSeason: CURRENT_SEASON,
        matches: COMPETITION_MATCHES,
        recentMatches: {
            matches: 10,
            hasLiveMatch: true
        }
    },
    {
        _id: 300,
        area: {
            name: "Spain",
            flag: laLigaEmblem
        },
        name: "La Liga",
        type: "REGULAR",
        emblem: laLigaEmblem,
        currentSeason: CURRENT_SEASON,
        matches: COMPETITION_MATCHES,
        recentMatches: {
            matches: 10,
            hasLiveMatch: true
        }
    },
    {
        _id: 300,
        area: {
            name: "Europe",
            flag: championsLeagueEmblem
        },
        name: "UEFA Champions League",
        type: "CUP",
        emblem: championsLeagueEmblem,
        currentSeason: CURRENT_SEASON,
        matches: COMPETITION_MATCHES,
        recentMatches: {
            matches: 3,
            hasLiveMatch: false
        }
    },
    {
        _id: 300,
        area: {
            name: "Hope Land",
            flag: premierLeagueEmblem2
        },
        name: "Not Premier League",
        type: "CUP",
        emblem: premierLeagueEmblem2,
        currentSeason: CURRENT_SEASON,
        matches: COMPETITION_MATCHES,
        recentMatches: {
            matches: 0,
            hasLiveMatch: false
        }
    },
];

export const COMPETITIONS_STANDINGS_STRUCTURE = {
    "PPL": {
        topPositions: 2,
        midPositions: 3,
        relegationPositions: 16
    },
    "BSA": {
        topPositions: 4,
        midPositions: 6,
        relegationPositions: 17
    },
    "DED": {
        topPositions: 3,
        midPositions: 4,
        relegationPositions: 16
    },
    "CL": {
        topPositions: 2,
        midPositions: 3,
        relegationPositions: 4
    },
    "BL1": {
        topPositions: 4,
        midPositions: 5,
        relegationPositions: 16
    },
    "SA|PD|PL|FL1": {
        topPositions: 4,
        midPositions: 5,
        relegationPositions: 18
    },
    "WC|EC|CLI": {
        topPositions: 2,
        midPositions: 0,
        relegationPositions: 3
    }
}