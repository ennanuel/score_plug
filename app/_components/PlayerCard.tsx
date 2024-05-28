"use client";

import { Player } from '@/types/player.type';
import { useMemo } from 'react';

const PlayerCard = ({ name, nationality, position, dateOfBirth }: Player) => {
    const age = useMemo(() => (new Date()).getFullYear() - (new Date(dateOfBirth)).getFullYear(), []);

    return (
        <div className="flex items-center p-2 gap-3 hover:bg-secondary-900/50 border-b last:border-transparent border-secondary-900/50">
            <div className="h-[30px] aspect-square rounded-full bg-white-900/50 relative font-bold text-white text-2xl" />
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                    <p className="w-full font-semibold text-secondary-600 truncate text-sm">{name}</p>
                    <p className="w-full text-secondary-600 truncate text-xs">{nationality}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <p className="w-full text-secondary-600 truncate text-xs font-semibold">{position}</p>
                    <p className="w-full text-secondary-600 truncate text-xs">{age + age === 1 ? '' : 's'}</p>
                </div>
            </div>
        </div>
    )
};

export default PlayerCard
