import React, { useMemo } from 'react'

const PredictionLoading = ({ size, full }: { size: number, full?: boolean }) => {
    const matches = useMemo(() => {
        const matches = [];
        for (let i = 0; i < size; i++) matches.push(i);
        return matches;
    }, []);

    return (
        <ul className={`grid ${full ? 'grid-cols-1': 'grid-cols-2'} gap-6`}>
            {
                matches.map((key) => (
                    <li key={key} style={{ '--delay': `${key * 100}ms` } as React.CSSProperties} className="flex flex-col gap-3 animate-loadgradient loading">
                        <div className="grid grid-cols-3 border border-secondary-900/50 rounded-md shadow-lg">
                            <div className="flex flex-col justify-between items-center gap-2 p-2">
                                <span className="w-[60px] aspect-square rounded-full bg-secondary-900/50"></span>
                                <span className="w-[80%] h-4 rounded-sm bg-secondary-900/50"></span>
                            </div>
                            <div className="flex flex-col border-x border-secondary-900/50">
                                <div className="flex-[2] border-b border-secondary-900/50">
                                </div>
                                <span className="flex-1"></span>
                            </div>
                            <div className="flex flex-col justify-between items-center gap-2 p-2">
                                <span className="w-[60px] aspect-square rounded-full bg-secondary-900/50"></span>
                                <span className="w-[80%] h-4 rounded-sm bg-secondary-900/50"></span>
                            </div>
                        </div>
                        <div className="flex border border-secondary-900/50 h-[40px]">
                            <p className="ng-secondary-900/50 flex-1"></p>
                            <p className="ng-secondary-900/50 border-x border-secondary-900/50 flex-1"></p>
                            <p className="ng-secondary-900/50 flex-1"></p>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
};

export default PredictionLoading
