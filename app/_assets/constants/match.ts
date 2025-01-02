import barcelonaCrest from "../barcelona_crest.png";
import liverPoolCrest from "../liverpool_crest.png";
import laLigaEmblem from "../la_liga_emblem.png";

export const MATCH_LINKS = [
    { title: "Details", href: "" },
    { title: "Head-to-Head", href: "h2h" },
    { title: "Table", href: "table" },
    { title: "Prediction", href: "prediction" }
];
const MATCH_COMPETITION = {
    _id: 133902,
    name: "La Liga",
    emblem: laLigaEmblem,
    area: {
        name: "Spain",
        flag: laLigaEmblem
    }
};

const MATCH_OUTCOME1 = {
    halfTime: {
        outcome: {
            homeWin: 10,
            draw: 30,
            awayWin: 60
        },
        goals: {
            _1: {
                over: 50,
                under: 50,
            },
            _2: {
                over: 50,
                under: 50,
            },
            _3: {
                over: 50,
                under: 50,
            },
            _4: {
                over: 50,
                under: 50,
            },
        },
    },
    fullTime: {
        outcome: {
            homeWin: 10,
            draw: 30,
            awayWin: 60
        },
        goals: {
            _1: {
                over: 50,
                under: 50,
            },
            _2: {
                over: 50,
                under: 50,
            },
            _3: {
                over: 50,
                under: 50,
            },
            _4: {
                over: 50,
                under: 50,
            },
        },
    },
};

export const MATCHES = [
    {
        _id: 123,
        status: "IN_PLAY",
        minute: "20",
        competition: MATCH_COMPETITION,
        predictions: MATCH_OUTCOME1,
        timeRemaining: {
            days: 0,
            hours: -2,
            minutes: -194,
        },
        score: {
            winner: null,
            firstHalf: {
                home: 0,
                away: 2
            },
            fullTime: {
                home: 1,
                away: 4
            }
        },
        homeTeam: {
            name: "FC Barcelona",
            crest: barcelonaCrest
        },
        awayTeam: {
            name: "Liverpool FC",
            crest: liverPoolCrest
        },
        utcDate: "01/02/2024 13:00"
    },
    {
        _id: 123,
        status: "FINISHED",
        minute: "FT",
        competition: MATCH_COMPETITION,
        predictions: MATCH_OUTCOME1,
        timeRemaining: {
            days: 0,
            hours: -2,
            minutes: -194
        },
        score: {
            winner: "AWAY_TEAM",
            firstHalf: {
                home: 0,
                away: 1
            },
            secondHalf: {
                home: 0,
                away: 2
            },
            fullTime: {
                home: 0,
                away: 3
            }
        },
        homeTeam: {
            name: "FC Barcelona",
            crest: barcelonaCrest
        },
        awayTeam: {
            name: "Liverpool FC",
            crest: liverPoolCrest
        },
        utcDate: "01/02/2024 13:00"
    },
    {
        _id: 123,
        status: "PAUSED",
        minute: "HT",
        competition: MATCH_COMPETITION,
        predictions: MATCH_OUTCOME1,
        timeRemaining: {
            days: 0,
            hours: -2,
            minutes: -194
        },
        score: {
            winner: null,
            firstHalf: {
                home: 1,
                away: 0
            },
            fullTime: {
                home: 1,
                away: 0
            }
        },
        homeTeam: {
            name: "FC Barcelona",
            crest: barcelonaCrest
        },
        awayTeam: {
            name: "Liverpool FC",
            crest: liverPoolCrest
        },
        utcDate: "01/02/2024 13:00"
    },
    {
        _id: 123,
        status: "TIMED",
        minute: "20",
        competition: MATCH_COMPETITION,
        predictions: MATCH_OUTCOME1,
        timeRemaining: {
            days: 0,
            hours: 2,
            minutes: 194
        },
        score: {
            winner: null,
            fullTime: {
                home: null,
                away: null
            }
        },
        homeTeam: {
            name: "FC Barcelona",
            crest: barcelonaCrest
        },
        awayTeam: {
            name: "Liverpool FC",
            crest: liverPoolCrest
        },
        utcDate: "01/02/2024 13:00"
    },
    {
        _id: 123,
        status: "TIMED",
        minute: "20",
        competition: MATCH_COMPETITION,
        predictions: MATCH_OUTCOME1,
        timeRemaining: {
            days: 0,
            hours: 1,
            minutes: 84
        },
        score: {
            winner: null,
            fullTime: {
                home: null,
                away: null
            }
        },
        homeTeam: {
            name: "FC Barcelona",
            crest: barcelonaCrest
        },
        awayTeam: {
            name: "Liverpool FC",
            crest: liverPoolCrest
        },
        utcDate: "01/02/2024 13:00"
    },
];