import { Player } from '@/types/player.type';
import Image from "next/image";

const PlayerCard = ({ name, country }: Player) => {
    return (
        <div className="flex flex-col items-center justify-center p-3 gap-3 bg-primary-600 rounded-md hover:bg-primary-500">
            <div className="absolute top-1 right-1">
                <Image src={country.flag} alt={name} width={40} className='object-contain' />
            </div>
            <div className="w-full aspect-square rounded-full bg-white-900/50 relative">
            </div>
            <p className="w-full font-semibold text-secondary-600 truncate text-sm">{name}</p>
        </div>
    )
};

export default PlayerCard
