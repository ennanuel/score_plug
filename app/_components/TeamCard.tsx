import { Team } from '@/types/global.type';
import Image from 'next/image';
import Link from 'next/link';

function TeamCard ({ _id, name, crest, hasOngoingMatch }: Team) {
    return (
        <Link href={`/team/${_id}`} className={`relative flex flex-col items-center p-3 gap-4 bg-primary-600 rounded-sm hover:bg-primary-500/80 border border-transparent ${hasOngoingMatch && 'border-highlight-400/50 hover:border-transparent'}`}>
            {
                hasOngoingMatch ?
                    <div className="absolute top-[-4px] right-[-4px] w-2 aspect-square rounded-full bg-highlight-500 border-2 border-primary-900" /> :
                    null
            }
            <Image src={crest} alt={name} width={80} className="object-contain aspect-square" />
            <p className="text-secondary-600 text-sm text-center truncate w-full">{name}</p>
        </Link>
    )
}

export default TeamCard
