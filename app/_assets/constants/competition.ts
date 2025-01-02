import premierLeagueEmblem from "../premier_league_emblem.png";
import premierLeagueEmblem2 from "../premier_league_emblem2.png";
import championsLeagueEmblem from "../ucl_emblem.png";
import laLigaEmblem from "../la_liga_emblem.png";
import { MATCHES } from "./match";
import { Competition, Match } from "@/types/global.type";
import { TEAMS } from "./team";
import { CompetitionStandings, CompetitionTable } from "@/types/competition.type";

export const COMPETITION_LINKS = [
    { title: "Overview", href: "" },
    { title: "Table", href: "standings" },
    { title: "Matches", href: "matches" },
    { title: "Stats", href: "stats" }
];

const CURRENT_SEASON = {
    startDate: "March 24, 2022",
    endDate: "July 01, 2023",
    currentMatchday: 20,
    winner: 0
};

const COMPETITION_MATCHES = MATCHES as Match[];

const COMPETITION_TABLE = ([
    {
        position: 0,
        team: TEAMS[1],
        playedGames: 20,
        form: "WWWDD",
        won: 10,
        draw: 5,
        lost: 5,
        points: 35,
        goalsFor: 58,
        goalsAgainst: 23,
        goalDifference: 35
    },
    {
        position: 1,
        team: TEAMS[0],
        playedGames: 20,
        form: "WWLDD",
        won: 9,
        draw: 5,
        lost: 6,
        points: 32,
        goalsFor: 50,
        goalsAgainst: 18,
        goalDifference: 32
    },
    {
        position: 2,
        team: TEAMS[0],
        playedGames: 20,
        form: "WDDDD",
        won: 7,
        draw: 8,
        lost: 5,
        points: 29,
        goalsFor: 35,
        goalsAgainst: 10,
        goalDifference: 25
    },
    {
        position: 3,
        team: TEAMS[1],
        playedGames: 20,
        form: "WWWDD",
        won: 5,
        draw: 10,
        lost: 5,
        points: 15,
        goalsFor: 20,
        goalsAgainst: 15,
        goalDifference: 5
    },
]) as CompetitionTable[];

const COMPETITIONS_STANDINGS = ([
    {
        stage: "Group Stage",
        type: "CUP",
        group: "A",
        table: COMPETITION_TABLE
    }
]) as CompetitionStandings[];

export const COMPETITIONS = ([
    {
        _id: 300,
        code: "PL",
        area: {
            name: "England",
            flag: premierLeagueEmblem
        },
        name: "Premier League",
        type: "REGULAR",
        emblem: premierLeagueEmblem,
        currentSeason: CURRENT_SEASON,
        matches: COMPETITION_MATCHES,
        teams: TEAMS,
        standings: COMPETITIONS_STANDINGS,
        recentMatches: {
            matches: 0,
            hasLiveMatch: false
        }
    },
    {
        _id: 301,
        code: "LL",
        area: {
            name: "Spain",
            flag: laLigaEmblem
        },
        name: "La Liga",
        type: "REGULAR",
        emblem: laLigaEmblem,
        currentSeason: CURRENT_SEASON,
        matches: COMPETITION_MATCHES,
        teams: TEAMS,
        standings: COMPETITIONS_STANDINGS,
        recentMatches: {
            matches: 6,
            hasLiveMatch: true
        }
    },
    {
        _id: 302,
        code: "UCL",
        area: {
            name: "Europe",
            flag: championsLeagueEmblem
        },
        name: "UEFA Champions League",
        type: "CUP",
        emblem: championsLeagueEmblem,
        currentSeason: CURRENT_SEASON,
        matches: COMPETITION_MATCHES,
        teams: TEAMS,
        standings: COMPETITIONS_STANDINGS,
        recentMatches: {
            matches: 3,
            hasLiveMatch: true
        }
    },
    {
        _id: 303,
        code: "NPL",
        area: {
            name: "Hope Land",
            flag: premierLeagueEmblem2
        },
        name: "Not Premier League",
        type: "CUP",
        emblem: premierLeagueEmblem2,
        currentSeason: CURRENT_SEASON,
        matches: COMPETITION_MATCHES,
        teams: TEAMS,
        standings: COMPETITIONS_STANDINGS,
        recentMatches: {
            matches: 0,
            hasLiveMatch: false
        }
    },
    {
        _id: 304,
        code: "BFL",
        area: {
            name: "Africa",
            flag: premierLeagueEmblem2
        },
        name: "Biafra League",
        type: "CUP",
        emblem: premierLeagueEmblem2,
        currentSeason: CURRENT_SEASON,
        matches: COMPETITION_MATCHES,
        teams: TEAMS,
        standings: COMPETITIONS_STANDINGS,
        recentMatches: {
            matches: 0,
            hasLiveMatch: false
        }
    },
]) as Competition[];

export const COMPETITIONS_STANDINGS_STRUCTURE = {
    "PPL": {
        topPositions: 2,
        midPositions: 3,
        relegationPositions: 16,
        positions: ['Top-table team', 'Mid-table team', 'Relegation']
    },
    "BSA": {
        topPositions: 4,
        midPositions: 6,
        relegationPositions: 17,
        positions: ['Top-table team', 'Mid-table team', 'Relegation']
    },
    "ELC": {
        topPositions: 3,
        midPositions: 6,
        relegationPositions: 17,
        positions: ['Promotion', 'Playoffs', 'Relegation']
    },
    "DED": {
        topPositions: 3,
        midPositions: 4,
        relegationPositions: 16,
        positions: ['Champions League', 'Europa League', 'Relegation']
    },
    "CL": {
        topPositions: 8,
        midPositions: 24,
        relegationPositions: 25,
        positions: ['Knockout stage', 'Playoffs', 'Relegation']
    },
    "BL1": {
        topPositions: 4,
        midPositions: 5,
        relegationPositions: 16,
        positions: ['Champions League', 'Europa League', 'Relegation']
    },
    "SA|PD|PL|FL1": {
        topPositions: 4,
        midPositions: 5,
        relegationPositions: 18,
        positions: ['Champions League', 'Europa League', 'Relegation']
    },
    "WC|EC|CLI": {
        topPositions: 2,
        midPositions: 0,
        relegationPositions: 3,
        positions: ['Knockout stage', '', 'Relegation']
    }
}