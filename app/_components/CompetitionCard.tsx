"use client";

import { Competition } from '@/types/global.type';
import Link from 'next/link';
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { loadImage } from '../_utils/competition';

const CompetitionCard = ({ _id, name, emblem, area, recentMatches }: Competition) => {
    return (
        <li className={`border-b last:border-none ${recentMatches.hasLiveMatch ? 'bg-secondary-900/20 border-transparent' : 'border-secondary-900/50'}`}>
            <Link href={`/competition/${_id}`} className="flex items-center gap-4 justify-between hover:bg-secondary-900/50 p-3 px-4">
                <Image src={emblem || String(process.env.NEXT_IMAGE_URI)} loader={loadImage} width={30} height={30} className="aspect-square object-contain" alt={name} />
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                        <h3 className="text-secondary-400 font-semibold text-sm">{name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <Image src={area.flag || String(process.env.NEXT_IMAGE_URI)} width={15} height={15} className="object-contain" alt="Competition area flag" />
                        <span className="text-xs text-gray-500">{area.name}</span>
                    </div>
                </div>
                {
                    Boolean(recentMatches.matches) ?
                        <div className="flex items-center gap-2">
                            {recentMatches.hasLiveMatch && <span className="block w-2 h-2 rounded-full bg-highlight-400"></span>}
                            <p className={`text-xs font-bold ${recentMatches.hasLiveMatch ? 'text-highlight-400' : 'text-gray-400'}`}>
                            {recentMatches.matches} {recentMatches.matches > 1 ? 'matches' : 'match'}
                            </p>
                        </div>
                        : null
                }
                <MdKeyboardArrowRight size={20} />
            </Link>
        </li>
    )
};

export default CompetitionCard
