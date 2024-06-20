import React, { useMemo } from 'react'

const PlayerLoading = ({ size }: { size: number }) => {
    const players = useMemo(() => {
        const players = [];
        for (let i = 0; i < size; i++) players.push(i);
        return players;
    }, []);

    return (
        <ul className="flex flex-col border border-secondary-900/50 rounded-md overflow-clip">
            {
                players.map((key, index) => (
                    <li key={key} style={{ '--delay': `${index / 10}s` } as React.CSSProperties} className="flex items-center p-2 gap-3 border-b last:border-transparent border-secondary-900/50">
                        <div className="h-[30px] aspect-square rounded-full bg-white-900/50 relative font-bold text-white text-2xl" />
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-4">
                                <p className="w-full max-w-[240px] h-6 rounded-md bg-secondary-900/50 animate-loadopacity"></p>
                                <p className="w-full max-w-[180px] h-4 rounded-md bg-secondary-900/50 animate-loadopacity"></p>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <p className="w-full max-w-[150px] h-4 rounded-md bg-secondary-900/50 animate-loadopacity"></p>
                                <p className="w-full max-h-[120px] h-4 rounded-md bg-secondary-900/50 animate-loadopacity"></p>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default PlayerLoading
