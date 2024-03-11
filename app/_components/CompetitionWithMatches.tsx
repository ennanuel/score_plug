"use client";

import { MdStar, MdStarOutline } from 'react-icons/md';
import Link from "next/link";
import Image from "next/image";
import { MatchCard } from '.';
import { Competition } from '@/types/competition.type';

const CompetitionWithMatches = ({ _id, name, emblem, area, matches, isFavorite }: Competition) => {
    return (
        <div className='mt-4 flex flex-col gap-3'>
            <div className='flex items-center gap-3 p-2'>
                <Image src={emblem} width={40} alt={`${name} Emblem`} className="aspect-square object-contain" />
                <Link href={`/competition/${_id}`} className="flex-1 flex flex-col">
                    <span className="font-semibold text-secondary-500 text-sm">{name}</span>
                    <span className="text-[.7em] text-secondary-700">{area.name}</span>
                </Link>
                {
                    isFavorite ?
                        <MdStar size={20} /> :
                        <MdStarOutline size={20} />
                }
            </div>
            <ul className="flex flex-col gap-1">
                {
                    matches.map((match, index) => (
                        <li key={index}><MatchCard {...match} /></li>
                    ))
                }
            </ul>
        </div>

    )
};

export default CompetitionWithMatches
