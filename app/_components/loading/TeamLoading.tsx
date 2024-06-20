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
                        className="border border-secondary-900/50 flex flex-col gap-2 p-2 rounded-md"
                    >
                        <span className='aspect-square rounded-full bg-secondary-900/50 animate-loadopacity'></span>
                        <span className='animate-loadopacity h-4 block w-full max-w-[120px] rounded-sm bg-secondary-900/50'></span>
                    </li>
                ))
            }
        </ul>
    )
}

export default TeamLoading
