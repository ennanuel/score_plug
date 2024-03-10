import { Competition } from '@/types/competition.type';
import Link from 'next/link';
import Image from "next/image";
import { MdKeyboardArrowRight, MdStar } from "react-icons/md";

const CompetitionCard = ({ _id, name, emblem, area, noOfMatches, hasLiveMatch }: Competition) => {
    return (
        <Link href={`/competition/${_id}`} className={`flex items-center gap-4 justify-between bg-primary-800 hover:bg-primary-400/50 hover:border-transparent p-3 px-4 rounded-lg border ${hasLiveMatch ? 'border-highlight-400' : 'border-transparent'}`}>
            <Image src={emblem} width={40} className="aspect-square object-contain" alt={name} />
            <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2">
                    <h3 className="text-secondary-400 font-semibold">{name}</h3>
                    <MdStar />
                </div>
                <span className="text-xs text-gray-500">{area.name}</span>
            </div>
            {
                noOfMatches
                    ? <p className={`text-xs font-bold ${hasLiveMatch ? 'text-highlight-400' : 'text-gray-400'}`}>
                        {noOfMatches} {noOfMatches > 1 ? 'matches' : 'match'}
                    </p>
                    : null
            }
            <MdKeyboardArrowRight size={20} />
        </Link>
    )
};

export default CompetitionCard
