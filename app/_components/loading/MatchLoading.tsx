import React, { useMemo } from 'react'

const MatchLoading = ({ size }: { size: number }) => {
    const matches = useMemo(() => {
        const matches = [];
        for (let i = 0; i < size; i++) matches.push(i);
        return matches;
    }, []);

    return (
        <ul className="">
            {
                matches.map((key) => (
                    <li
                        key={key} style={{ '--delay': `${key*100}ms` } as React.CSSProperties}
                        className="border-b last:border-none border-white-100/10 px-3 py-4 grid grid-cols-[auto,_1fr,_auto] items-center gap-3"
                    >
                        <div className="w-5 h-3 rounded-full bg-white-100/10"></div>
                        <div className="flex items-center justify-center gap-4 ml-[30px]">
                            <div className="flex justify-end items-center gap-2 flex-1">
                                <span className='animate-loadopacity w-full max-w-[160px] h-3 rounded-sm bg-white-100/10'></span>
                                <span className='w-4 aspect-square rounded-full bg-white-100/10'></span>
                            </div>
                            <span className="animate-loadopacity w-10 h-3 rounded-sm bg-white-100/10"></span>
                            <div className="flex justify-start items-center gap-2 flex-1">
                                <span className='w-4 aspect-square rounded-full bg-white-100/10'></span>
                                <span className='animate-loadopacity w-full max-w-[160px] h-3 rounded-sm bg-white-100/10'></span>
                            </div>
                        </div>
                        <div className="w-5 h-3 rounded-full bg-white-100/10 hidden"></div>
                    </li>
                ))
            }
        </ul>
    )
}

export default MatchLoading
