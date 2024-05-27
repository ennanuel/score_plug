import { Player } from '@/types/player.type';
import Image from "next/image";

const PlayerCard = ({ name, nationality, shirtNumber }: Player) => {
    return (
        <div className="flex flex-col items-center justify-center p-3 gap-2 bg-primary-600 rounded-md hover:bg-primary-500">
            <div className="w-full aspect-square rounded-full bg-white-900/50 relative font-bold text-white text-2xl">
                {shirtNumber}
            </div>
            <p className="text-[.65rem] text-secondary-700 mt-2">{nationality}</p>
            <p className="w-full font-semibold text-secondary-600 truncate text-sm">{name}</p>
        </div>
    )
};

export default PlayerCard
