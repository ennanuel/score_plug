import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Player = {
    _id: number;
    name: string;
    number: number;
    position: string;
    country: {
        name: string;
        flag: string | StaticImport;
    }
}