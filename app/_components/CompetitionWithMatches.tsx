"use client";

import { MdStar, MdStarOutline } from 'react-icons/md';
import Link from "next/link";
import Image from "next/image";
import { MatchCard, MatchesContainer } from '.';
import { Competition } from '@/types/competition.type';

const CompetitionWithMatches = ({ _id, name, emblem, area, matches, isFavorite }: Competition) => {
    return (
        <div className='mt-4 flex flex-col gap-3'>
            <div className='flex items-center gap-3 p-2'>
                <Image src={emblem || String(process.env.NEXT_IMAGE_URI)} width={40} height={40} alt={name} className="aspect-square object-contain" />
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
            <MatchesContainer matches={matches} />
        </div>

    )
};

export default CompetitionWithMatches
