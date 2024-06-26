import { Player } from '@/types/player.type';

const PlayerCard = ({ name, nationality, position }: Player) => {
    return (
        <li className="flex items-center p-2 gap-3 hover:bg-secondary-900/50 border-b last:border-transparent hover:border-transparent border-secondary-900/50">
            <div className="h-[30px] aspect-square rounded-full bg-white-900/50 relative font-bold text-white text-2xl" />
            <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                    <p className="w-full flex-1 font-semibold text-secondary-400 truncate text-sm">{name}</p>
                    <p className="w-full text-secondary-600 text-xs">{nationality}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <p className="w-full text-secondary-600 text-xs">{position}</p>
                </div>
            </div>
        </li>
    )
};

export default PlayerCard
