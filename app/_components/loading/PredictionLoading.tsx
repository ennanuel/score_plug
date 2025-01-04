import React, { useMemo } from 'react'

const PredictionLoading = ({ size, full }: { size: number, full?: boolean }) => {
    const matches = useMemo(() => {
        const matches = [];
        for (let i = 0; i < size; i++) matches.push(i);
        return matches;
    }, []);

    return (
        <ul className="flex flex-col gap-3">
            {
                matches.map((key) => (
                    <li key={key} className={`1-full ${full ? 'grid-cols-1 p-2 gap-2' : 'grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 items-center pt-4 p-3 bg-white-100/5 rounded-lg'} grid`}>
                        <div className={`${full ? 'grid grid-cols-3 bg-white/5 rounded-lg p-2 pb-4 bg-white-100/5' : 'flex flex-col gap-2'} `}>
                            <div className={`${full ? 'flex-col justify-between p-2' : 'flex-row'} flex items-center gap-2`}>
                                <span className={`${full ? 'w-10' : 'w-4'} animate-loadopacity bg-white-100/10 aspect-square rounded-full`}></span>
                                <span className={`${full ? 'w-4/5' : 'w-1/2'} animate-loadopacity h-2 rounded-sm bg-white-100/10`}></span>
                            </div>
                            <div className={`${full ? 'flex' : 'hidden'} flex-col items-center gap-2 pt-4`}>
                                <span className="animate-loadopacity h-3 w-4/5 max-w-12 rounded-sm bg-white-100/10"></span>
                                <span className="animate-loadopacity h-2 w-1/2 max-w-8 rounded-sm bg-white-100/5"></span>
                            </div>
                            <div className={`${full ? 'flex-col justify-between p-2' : 'flex-row'} flex items-center gap-2`}>
                                <span className={`${full ? 'w-10' : 'w-4'} animate-loadopacity bg-white-100/10 aspect-square rounded-full`}></span>
                                <span className="animate-loadopacity w-4/5 h-2 rounded-sm bg-white-100/10"></span>
                            </div>
                        </div>
                        <div className={`${full ? 'p-2 pt-3 rounded-lg bg-gradient-to-r from-white-100/5 to-white-100/10' : ''} flex gap-2`}>
                            {
                                [1, 2, 3].map((item) => (
                                    <span key={item} className={`${full ? 'h-6' : 'h-10'} animate-loadopacity flex-1 bg-white-100/5 border border-white-100/5 rounded-md`}></span>
                                ))
                            }
                        </div>
                    </li>
                ))
            }
        </ul>
    )
};

export default PredictionLoading
