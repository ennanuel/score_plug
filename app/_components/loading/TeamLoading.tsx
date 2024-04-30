import React, { useMemo } from 'react'

const TeamLoading = ({ size }: { size: number }) => {
    const teams = useMemo(() => {
        const teams = [];
        for (let i = 0; i < size; i++) teams.push(i);
        return teams;
    }, []);

    return (
        <ul className="grid grid-cols-4 gap-4">
            {
                teams.map((key) => (
                    <li
                        key={key} style={{ '--delay': `${key*100}ms` } as React.CSSProperties}
                        className="border border-secondary-900/50 flex flex-col"
                    >
                        <span className='w-[calc(100%_-_20px)] animate-loadgradient loading m-auto mt-2 aspect-square rounded-full bg-secondary-900/50'></span>
                        <div className="h-8 flex items-center justify-center gap-2 py-2 px-3">
                            <span className="w-2 h-2 ml-4 animate-loadgradient loading rounded-full bg-secondary-900/50"></span>
                            <span className='h-4 flex-1 animate-loadgradient loading rounded-sm bg-secondary-900/50'></span>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default TeamLoading
