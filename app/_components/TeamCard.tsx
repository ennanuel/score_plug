import { Team } from '@/types/global.type';
import Image from 'next/image';
import Link from 'next/link';

function TeamCard ({ _id, name, crest, hasOngoingMatch }: Team) {
    return (
        <Link href={`/team/${_id}`} className={`relative flex items-center gap-3 px-6 py-3 rounded-none border-b border-white-100/10 hover:rounded-lg hover:bg-white-100/10`}>
            {
                hasOngoingMatch ?
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-r-full bg-yellow-400" /> :
                    null
            }
            <Image src={crest} alt={name} width={44} height={44} className="w-10 object-contain aspect-square" />
            <span className={`${hasOngoingMatch ? 'text-yellow-500' : 'text-white-600'} text-2xs font-semibold text-center truncate w-full`}>{name}</span>
        </Link>
    )
}

export default TeamCard
