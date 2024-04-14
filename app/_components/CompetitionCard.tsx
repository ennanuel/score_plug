import { Competition } from '@/types/global.type';
import Link from 'next/link';
import Image from "next/image";
import { MdKeyboardArrowRight, MdStar } from "react-icons/md";

const CompetitionCard = ({ _id, name, emblem, area, recentMatches }: Competition) => {
    return (
        <Link href={`/competition/${_id}`} className={`flex items-center gap-4 justify-between bg-transparent hover:bg-primary-400/10 p-2 rounded-sm border ${recentMatches.hasLiveMatch ? 'border-highlight-400/20' : 'border-primary-400/10'}`}>
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
                    ?
                    <div className="flex items-center gap-2">
                        <span className="block w-2 h-2 rounded-full bg-highlight-400"></span>
                        <p className={`text-xs font-bold ${recentMatches.hasLiveMatch ? 'text-highlight-400' : 'text-gray-400'}`}>
                        {recentMatches.matches} {recentMatches.matches > 1 ? 'matches' : 'match'}
                        </p>
                    </div>
                    : null
            }
            <MdKeyboardArrowRight size={20} />
        </Link>
    )
};

export default CompetitionCard
