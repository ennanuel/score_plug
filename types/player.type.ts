
export type Player = {
    _id: number;
    firstName: number;
    lastName: string;
    name: string;
    position: {
        area: 'goalkeeper' | 'defence' | 'midfield' | 'offence';
        specialty: string;
    };
    dateOfBirth: string;
    age: number;
    nationality: string;
    shirtNumber: number;
    marketValue: number;
    teamCrest: string;
    id: string | number;
    type: string;
}