"use client";

import Link from "next/link";
import Image from "next/image";
import { MatchesContainer } from '.';
import { Competition } from '@/types/global.type';

const CompetitionWithMatches = ({ _id, name, area, matches }: Competition) => {
    return (
        <li className='flex flex-col border border-transparent bg-white-100/10 rounded-xl overflow-hidden'>
            <Link href={`/competition/${_id}`} className='flex items-center bg-white-100/5 hover:bg-white-100/10 gap-3 p-3 border-b border-transparent'>
                <Image 
                    unoptimized
                    width={16} 
                    height={16} 
                    src={area.flag || String(process.env.NEXT_IMAGE_URI)} 
                    alt={name} 
                    className="aspect-square object-cover rounded-full" 
                />
                <div className="flex-1 flex gap-1 text-white-300 text-2xs font-semibold">
                    <span className="">{name}</span>
                    <span className="font-normal">-</span>
                    <span className="">{area.name}</span>
                </div>
            </Link>
            <MatchesContainer matches={matches} />
        </li>
    )
};

export default CompetitionWithMatches
