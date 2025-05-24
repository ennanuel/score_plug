"use client";

import { Competition } from '@/types/global.type';
import Link from 'next/link';
import Image from "next/image";

const CompetitionCard = ({ _id, name, emblem, area, recentMatches }: Competition) => {
    return (
        <li className={`bg-white-100/5 rounded-lg hover:bg-white-100/10 p-3 min-h-14 flex`}>
            <Link href={`/competition/${_id}`} className="flex items-center gap-4 justify-between w-full">
                <Image 
                    unoptimized 
                    width={30} 
                    height={30} 
                    src={emblem || String(process.env.NEXT_IMAGE_URI)} 
                    className="w-6 max-h-6 aspect-square object-contain" 
                    alt={name} 
                />
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-4">
                        <h3 className={`${recentMatches.hasLiveMatch ? 'text-yellow-400' : 'text-white-400'} font-semibold text-2xs`}>{name}</h3>
                        {
                            Boolean(recentMatches.matches) ?
                                <div className="flex items-center gap-2">
                                    <p className={`text-3xs font-semibold ${recentMatches.hasLiveMatch ? 'text-yellow-400' : 'text-white-700'}`}>
                                    {recentMatches.matches} {recentMatches.matches > 1 ? 'matches' : 'match'}
                                    </p>
                                </div>
                                : null
                        }
                    </div>                    
                    <span className="text-3xs text-white-700">{area.name}</span>
                </div>
            </Link>
        </li>
    )
};

export default CompetitionCard
