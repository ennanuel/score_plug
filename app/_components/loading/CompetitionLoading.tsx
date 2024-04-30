import React, { useMemo } from 'react'

const CompetitionLoading = ({ size }: { size: number }) => {
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
                        key={key} style={{ '--delay': `${key*100}ms` } as React.CSSProperties}
                        className="animate-loadopacity h-[100px] border-b last:border-none border-secondary-900/50 p-3 flex gap-4"
                    >
                        <div className="h-8 flex gap-2">
                            <span className='w-8 h-8 rounded-full bg-secondary-900/50'></span>
                            <span className='w-[160px] h-4 rounded-sm bg-secondary-900/50'></span>
                            <span className="w-4 h-4 ml-4 rounded-full bg-secondary-900/50"></span>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default CompetitionLoading
