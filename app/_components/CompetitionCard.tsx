import { Competition } from '@/types/competition.type';
import Link from 'next/link';
import Image from "next/image";
import { MdKeyboardArrowRight, MdStar } from "react-icons/md";

const CompetitionCard = ({ _id, name, emblem, area, recentMatches }: Competition) => {
    return (
        <Link href={`/competition/${_id}`} className={`flex items-center gap-4 justify-between bg-primary-800 hover:bg-primary-400/50 hover:border-transparent p-2 rounded-sm border ${recentMatches.hasLiveMatch ? 'border-highlight-400' : 'border-transparent'}`}>
            <Image src={emblem || String(process.env.NEXT_IMAGE_URI)} width={30} height={30} className="aspect-square object-contain" alt={name} />
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
                Boolean(recentMatches.matches)
                    ? <p className={`text-xs font-bold ${recentMatches.hasLiveMatch ? 'text-highlight-400' : 'text-gray-400'}`}>
                        {recentMatches.matches} {recentMatches.matches > 1 ? 'matches' : 'match'}
                    </p>
                    : null
            }
            <MdKeyboardArrowRight size={20} />
        </Link>
    )
};

export default CompetitionCard
