import premierLeagueEmblem from "../premier_league_emblem.png";
import premierLeagueEmblem2 from "../premier_league_emblem2.png";
import championsLeagueEmblem from "../ucl_emblem.png";
import laLigaEmblem from "../la_liga_emblem.png";

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
}

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
        hasLiveMatch: true,
        matches: 10
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
        hasLiveMatch: true,
        matches: 6
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
        hasLiveMatch: false,
        matches: 3
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
        hasLiveMatch: false,
        matches: 0
    },
];