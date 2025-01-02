import barcelonaCrest from "../barcelona_crest.png";
import liverpoolCrest from "../liverpool_crest.png";

export const TEAM_LINKS = [
    { title: "Overview", href: "" },
    { title: "Table", href: "table" },
    { title: "Fixtures", href: "matches" },
    { title: "Squad", href: "players" }
];

export const TEAMS = [
    {
        _id: 1234,
        area: {
            name: "Spain",
            flag: barcelonaCrest
        },
        name: "FC Barcelona",
        shortName: "Barca",
        tla: "FCB",
        crest: barcelonaCrest,
        address: "Barcelona, Spain",
        website: "https://ezema.netlify.app",
        founded: "1972",
        clubColors: "Blue Red",
        venue: "Camp Nou, Barcelona, Spain",
        coach: {
            name: "Xavi Hernandes",
            nationality: "Spain",
        },
        hasOngoingMatch: true
    },
    {
        _id: 1235,
        area: {
            name: "England",
            flag: liverpoolCrest
        },
        name: "Liverpool FC",
        shortName: "Liverpool",
        tla: "LIV",
        crest: liverpoolCrest,
        address: "Lagos, Lagos State, Nigeria",
        website: "https://ezema.netlify.app",
        founded: "1999",
        clubColors: "White Red",
        venue: "San Siro, Milan",
        coach: {
            name: "Jurgen Klopp",
            nationality: "Germany",
        },
        hasOngoingMatch: false
    },
];

export const TEAM_FORM: ("W" | "D" | "L")[] = ["W", "D", "L", "L", "W", "W"];

export const TEAM_STANDINGS = [
    {
        _id: 1203,
        name: "FC Barcelona",
        crest: barcelonaCrest,
        matchesPlayed: 5,
        goalDifference: -10,
        points: 100
    },
    {
        _id: 1204,
        name: "FC Fake Team",
        crest: liverpoolCrest,
        matchesPlayed: 30,
        goalDifference: 10,
        points: 100
    },
    {
        _id: 1205,
        name: "Dumb Guys FC",
        crest: liverpoolCrest,
        matchesPlayed: 15,
        goalDifference: 0,
        points: 33
    },
    {
        _id: 1206,
        name: "Loud Boys",
        crest: barcelonaCrest,
        matchesPlayed: 5,
        goalDifference: 52,
        points: 30
    },
    {
        _id: 1207,
        name: "Calm Girls CF",
        crest: liverpoolCrest,
        matchesPlayed: 5,
        goalDifference: 18,
        points: 99
    },
    {
        _id: 1208,
        name: "FC Not Barcelona",
        crest: barcelonaCrest,
        matchesPlayed: 15,
        goalDifference: -102,
        points: 1
    },
    {
        _id: 1209,
        name: "Mid Club FC",
        crest: barcelonaCrest,
        matchesPlayed: 39,
        goalDifference: 4,
        points: 100
    },
    {
        _id: 1210,
        name: "Calabar Dancers",
        crest: liverpoolCrest,
        matchesPlayed: 21,
        goalDifference: 67,
        points: 151
    },
    {
        _id: 1211,
        name: "Jonah Brothers",
        crest: barcelonaCrest,
        matchesPlayed: 30,
        goalDifference: -99,
        points: 1
    },
    {
        _id: 1212,
        name: "Cincinatti Pumpins",
        crest: barcelonaCrest,
        matchesPlayed: 23,
        goalDifference: -2,
        points: 9
    },
    {
        _id: 1213,
        name: "FC Kumbaya",
        crest: barcelonaCrest,
        matchesPlayed: 50,
        goalDifference: 0,
        points: 93
    },
    {
        _id: 1214,
        name: "FC Topenga",
        crest: liverpoolCrest,
        matchesPlayed: 6,
        goalDifference: 7,
        points: 19
    },
    {
        _id: 1215,
        name: "Lupe Fiasco",
        crest: barcelonaCrest,
        matchesPlayed: 20,
        goalDifference: 0,
        points: 12
    },
    {
        _id: 1216,
        name: "Lost Boys FC",
        crest: liverpoolCrest,
        matchesPlayed: 18,
        goalDifference: -1,
        points: 7
    },
    {
        _id: 1217,
        name: "FC Bayer Munich",
        crest: liverpoolCrest,
        matchesPlayed: 27,
        goalDifference: -107,
        points: 0
    },
    {
        _id: 1218,
        name: "Real Madrid FC",
        crest: liverpoolCrest,
        matchesPlayed: 50,
        goalDifference: -999,
        points: 0
    },
    {
        _id: 1219,
        name: "Coconut FC",
        crest: barcelonaCrest,
        matchesPlayed: 19,
        goalDifference: 80,
        points: 17
    },
    {
        _id: 1220,
        name: "Cote D'Voire",
        crest: barcelonaCrest,
        matchesPlayed: 16,
        goalDifference: -33,
        points: 15
    }
];