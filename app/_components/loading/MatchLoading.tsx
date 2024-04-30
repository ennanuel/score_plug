import React, { useMemo } from 'react'

const MatchLoading = ({ size }: { size: number }) => {
    const matches = useMemo(() => {
        const matches = [];
        for (let i = 0; i < size; i++) matches.push(i);
        return matches;
    }, []);

    return (
        <ul className="flex flex-col border border-secondary-900/50 rounded-md overflow-hidden">
            {
                matches.map((key) => (
                    <li
                        key={key} style={{ '--delay': `${key*100}ms` } as React.CSSProperties}
                        className="animate-loadopacity h-[100px] border-b last:border-none border-secondary-900/50 p-3 flex gap-4"
                    >
                        <div className="w-2 rounded-md bg-secodary-900/50"></div>
                        <div className="flex flex-col gap-1 ml-[50px]">
                            <div className="h-4 flex gap-2">
                                <span className='w-4 h-4 rounded-full bg-secondary-900/50'></span>
                                <span className='w-[160px] h-4 rounded-sm bg-secondary-900/50'></span>
                            </div>
                            <div className="h-4 flex gap-2">
                                <span className='w-4 h-4 rounded-full bg-secondary-900/50'></span>
                                <span className='w-[160px] h-4 rounded-sm bg-secondary-900/50'></span>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default MatchLoading
