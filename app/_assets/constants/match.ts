import barcelonaCrest from "../barcelona_crest.png";
import liverPoolCrest from "../liverpool_crest.png";
import laLigaEmblem from "../la_liga_emblem.png";

export const MATCH_LINKS = [
    { title: "Details", href: "" },
    { title: "Head to Head", href: "h2h" },
    { title: "Prediction", href: "prediction" }
];

export const HIGHLIGHT_BACKGROUNDS = {
    'in_play': 'bg-highlight-500',
    'paused': 'bg-highlight-800',
    'finished': 'bg-secondary-800',
    'cancelled': 'bg-red-800',
    'postponed': 'bg-highlight-800'
}

export const MATCH_CARD_BACKGROUNDS = {
    'in_play': 'bg-secondary-900/60',
    'finished': 'bg-secondary-900/30',
    'paused': 'bg-secondary-900/30',
}

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
    homeWin: 10,
    draw: 30,
    awayWin: 60
}

const MATCH_OUTCOME2 = {
    homeWin: 68,
    draw: 22,
    awayWin: 10
}

const MATCH_OUTCOME3 = {
    homeWin: 25.05,
    draw: 24.95,
    awayWin: 50
}

export const MATCHES = [
    {
        _id: 123,
        status: "IN_PLAY",
        minute: "20",
        competition: MATCH_COMPETITION,
        outcome: MATCH_OUTCOME1,
        timeRemaining: {
            days: 0,
            hours: -2,
            minutes: -194,
        },
        score: {
            winner: null,
            fullTime: {
                homeTeam: 1,
                awayTeam: 4
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
        outcome: MATCH_OUTCOME2,
        timeRemaining: {
            days: 0,
            hours: -2,
            minutes: -194
        },
        score: {
            winner: "AWAY_TEAM",
            fullTime: {
                homeTeam: 0,
                awayTeam: 3
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
        outcome: MATCH_OUTCOME3,
        timeRemaining: {
            days: 0,
            hours: -2,
            minutes: -194
        },
        score: {
            winner: null,
            fullTime: {
                homeTeam: 2,
                awayTeam: 0
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
        outcome: MATCH_OUTCOME2,
        timeRemaining: {
            days: 0,
            hours: 2,
            minutes: 194
        },
        score: {
            winner: null,
            fullTime: {
                homeTeam: null,
                awayTeam: null
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
        outcome: MATCH_OUTCOME1,
        timeRemaining: {
            days: 0,
            hours: 1,
            minutes: 84
        },
        score: {
            winner: null,
            fullTime: {
                homeTeam: null,
                awayTeam: null
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