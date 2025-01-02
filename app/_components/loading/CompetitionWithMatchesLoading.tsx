import React, { useMemo } from 'react'
import MatchLoading from './MatchLoading';

const CompetitionWithMatchesLoading = ({ size }: { size: number }) => {
    const competitions = useMemo(() => {
        const competitions = [];
        for (let i = 0; i < size; i++) competitions.push(i);
        return competitions;
    }, []);

    return (
        <ul className="flex flex-col gap-4">
            {
                competitions.map((key) => (
                    <li
                        key={key}
                        style={{ '--delay': `${key * 100}ms` } as React.CSSProperties}
                        className='rounded-xl border border-white-100/10 bg-white-100/5'
                    >
                        <div className='flex items-center gap-2 p-3 border-b border-transparent bg-white-100/5'>
                            <span className="w-5 block aspect-square rounded-full bg-white-100/10" />
                            <span className="animate-loadopacity h-3 block rounded-sm bg-white-100/10 w-full max-w-[160px]"></span>
                        </div>
                        <MatchLoading size={4} />
                    </li>
                ))
            }
        </ul>
    );
}

export default CompetitionWithMatchesLoading
