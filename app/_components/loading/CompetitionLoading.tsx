import React, { useMemo } from 'react'

const CompetitionLoading = ({ size, small }: { size: number, small?: boolean }) => {
    const competitions = useMemo(() => {
        const competitions = [];
        for (let i = 0; i < size; i++) competitions.push(i);
        return competitions;
    }, []);

    return (
        <ul className="flex flex-col border border-secondary-900/50 rounded-md overflow-hidden">
            {
                competitions.map((key) => (
                    <li
                        key={key} style={{ '--delay': `${key * 100}ms` } as React.CSSProperties}
                        className={`border-b last:border-none border-secondary-900/50 ${small ? 'p-2' : 'p-3'} flex items-center gap-2`}
                    >
                        <span className={`${small ? 'w-6 h-6' : 'w-8 h-8'}  ml-2 rounded-full bg-secondary-900/50`}></span>
                        <div className="flex-1 flex flex-col gap-1">
                            <div className="w-full flex justify-between items-center gap-1">
                                <span className='animate-loadopacity w-full max-w-[160px] h-4 rounded-sm bg-secondary-900/50'></span>
                                {!small ? <span className="w-2 h-2 rounded-full bg-secondary-900/50"></span> : null}
                            </div>
                            <span className="animate-loadopacity w-full max-w-[100px] h-2 rounded-sm bg-secondary-900/50"></span>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default CompetitionLoading
