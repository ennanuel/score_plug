import React, { useMemo } from 'react'
import MatchLoading from './MatchLoading';

const CompetitionWithMatchesLoading = ({ size }: { size: number }) => {
    const competitions = useMemo(() => {
        const competitions = [];
        for (let i = 0; i < size; i++) competitions.push(i);
        return competitions;
    }, []);

    return (
        <ul className="flex flex-col gap-2">
            {
                competitions.map((key) => (
                    <li
                        key={key}
                        style={{ '--delay': `${key * 100}ms` } as React.CSSProperties}
                        className='flex flex-col gap-4 border-b border-white-100/10 last:border-transparent p-4'
                    >
                        <div className='flex items-center gap-3 px-2'>
                            <span className="w-[40px] h-[40px] rounded-full bg-secondary-900/50" />
                            <div className="flex-1 flex flex-col gap-2">
                                <span className="animate-loadopacity h-4 rounded-sm bg-secondary-900/50 w-[160px]"></span>
                                <span className="animate-loadopacity h-3 rounded-sm bg-secondary-900/50 w-[100px]"></span>
                            </div>
                        </div>
                        <MatchLoading size={4} />
                    </li>
                ))
            }
        </ul>
    );
}

export default CompetitionWithMatchesLoading
