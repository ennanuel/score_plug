import React, { useMemo } from 'react';

const CompetitionLoading = ({ size, small }: { size: number, small?: boolean }) => {
    const competitions = useMemo(() => {
        const competitions = [];
        for (let i = 0; i < size; i++) competitions.push(`${Math.ceil(Math.random() * 80)}`);
        return competitions;
    }, []);

    return (
        <ul className="">
            {
                competitions.map((width, index) => (
                    <li
                        key={index} style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
                        className={`${small ? 'h-8' : 'h-12'} w-full flex items-center gap-2 px-4`}
                    >
                        <span className={`${small ? 'w-4' : 'w-8'} aspect-square rounded-full bg-white-100/10`}></span>
                        <span style={{ maxWidth: `${width}%` }} className={`${small ? 'h-3' : 'h-4'} min-w-[30%] animate-loadopacity w-full rounded-sm bg-white-100/10`}></span>
                    </li>
                ))
            }
        </ul>
    )
}

export default CompetitionLoading
