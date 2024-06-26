"use client";

import { MdStar, MdStarOutline } from 'react-icons/md';
import Link from "next/link";
import Image from "next/image";
import { MatchesContainer } from '.';
import { Competition } from '@/types/global.type';
import { loadImage } from '../_utils/competition';

const CompetitionWithMatches = ({ _id, name, emblem, area, matches, isFavorite }: Competition) => {
    return (
        <li className='flex flex-col gap-2 border-b border-secondary-900/50 last:border-transparent p-4'>
            <div className='flex items-center gap-3 px-2'>
                <Image src={emblem || String(process.env.NEXT_IMAGE_URI)} loader={loadImage} width={30} height={30} alt={name} className="aspect-square object-contain" />
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
        </li>
    )
};

export default CompetitionWithMatches
