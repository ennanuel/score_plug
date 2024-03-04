import { StarOutline, Star, NotificationsActiveOutlined, ChevronRight, ChevronLeft } from '@mui/icons-material';
import { useState } from 'react';

const Matches = () => {
    const [filter, setFilter] = useState(false);

    return (
        <div className="border border-secondary-900/50 bg-primary-500 p-3">
            <div className='bg-primary-800 py-2 px-3 rounded-lg flex ai-center justify-between items-center gap-3'>
                <button onClick={() => setFilter( prev => !prev )} className='py-[2px] px-2 pr-0 flex items-center justify-center rounded-md bg-secondary-500 text-sm text-black-900 font-bold'>
                    <span>LIVE</span>
                    {
                        filter ? <ChevronLeft /> : <ChevronRight />
                    }
                </button>
                <div className="flex-1 relative overflow-clip">
                    <ul className={`w-full flex items-center justify-evenly gap-3 transition-[transform,opacity] ${ filter && 'translate-x-[100%] opacity-0' }`}>
                        <li className="flex flex-col items-center justify-center text-secondary-600">
                            <span className="text-xs font-semibold">MON</span>
                            <span className='text-[.7em]'>12 AUG</span>
                        </li>
                        <li className="flex flex-col items-center justify-center text-secondary-600">
                            <span className="text-xs font-semibold">TUE</span>
                            <span className='text-[.7em]'>12 AUG</span>
                        </li>
                        <li className="flex flex-col items-center justify-center text-secondary-600">
                            <span className="text-xs font-semibold">WED</span>
                            <span className='text-[.7em]'>12 AUG</span>
                        </li>
                        <li className="flex flex-col items-center justify-center text-highlight-400">
                            <span className="text-xs font-semibold">TODAY</span>
                            <span className='text-[.7em]'>12 AUG</span>
                        </li>
                        <li className="flex flex-col items-center justify-center text-secondary-600">
                            <span className="text-xs font-semibold">FRI</span>
                            <span className='text-[.7em]'>12 AUG</span>
                        </li>
                        <li className="flex flex-col items-center justify-center text-secondary-600">
                            <span className="text-xs font-semibold">SAT</span>
                            <span className='text-[.7em]'>12 AUG</span>
                        </li>
                    </ul>
                    <ul className={`absolute top-0 left-0 w-full h-full flex items-center justify-start gap-3 transition-[transform,opacity] ${ !filter && 'translate-x-[-100%] opacity-0' }`}>
                        <li>
                            <button className='py-[2px] px-2 flex rounded-md bg-secondary-900/50 text-sm text-white-600 font-semibold'>
                                <span>ALL</span>
                            </button>
                        </li>
                        <li>
                            <button className='py-[2px] px-2 flex rounded-md bg-secondary-900/50 text-sm text-white-600 font-semibold'>
                                <span>UPCOMING</span>
                            </button>
                        </li>
                        <li>
                            <button className='py-[2px] px-2 flex rounded-md bg-secondary-900/50 text-sm text-white-600 font-semibold'>
                                <span>FINISHED</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <button>
                    <StarOutline />
                </button>
            </div>
            <div className="bg-primary-800 py-3 px-4 rounded-lg mt-6">
                <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3 p-2'>
                    <div className="w-5 aspect-square border-2 border-secondary-800" />
                    <div className="flex-1 flex flex-col">
                    <span className="font-semibold text-secondary-500 text-sm">Premier League</span>
                    <span className="text-[.7em] text-secondary-700">England</span>
                    </div>
                    <StarOutline />
                </div>

                <div className="flex items-center justify-between bg-secondary-900/60 hover:bg-secondary-900/80 rounded-md p-2">
                    <div className="h-[50px] w-[6px] rounded-md bg-highlight-500" />
                    <p className="px-4 py-3 text-highlight-400 font-semibold">18'</p>
                    <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                        <span className="font-bold text-sm">4</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                        <span className="font-bold text-sm">4</span>
                    </div>
                    </div>
                    <div className="flex items-center justify-center pl-4 pr-2">
                    <NotificationsActiveOutlined />
                    </div>
                </div>

                <div className="flex items-center justify-between bg-secondary-900/30 hover:bg-secondary-900/80 rounded-md p-2">
                    <p className="px-4 py-3 text-secondary-600 text-sm">12:00</p>
                    <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                    </div>
                    </div>
                    <div className="flex items-center justify-center pl-4 pr-2">
                    <NotificationsActiveOutlined />
                    </div>
                </div>

                <div className="flex items-center justify-between bg-secondary-900/60 hover:bg-secondary-900/80 rounded-md p-2">
                    <div className="h-[50px] w-[6px] rounded-md bg-highlight-500" />
                    <p className="px-4 py-3 text-highlight-400 font-semibold">18'</p>
                    <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                        <span className="font-bold text-sm">4</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                        <span className="font-bold text-sm">4</span>
                    </div>
                    </div>
                    <div className="flex items-center justify-center pl-4 pr-2">
                    <NotificationsActiveOutlined />
                    </div>
                </div>
                </div>

                
                <div className='mt-4 flex flex-col gap-3'>
                <div className='flex items-center gap-3 p-2'>
                    <div className="w-5 aspect-square border-2 border-secondary-800" />
                    <div className="flex-1 flex flex-col">
                    <span className="font-semibold text-secondary-500 text-sm">La Liga</span>
                    <span className="text-[.7em] text-secondary-700">Spain</span>
                    </div>
                    <Star />
                </div>

                <div className="flex items-center justify-between bg-secondary-900/60 hover:bg-secondary-900/80 rounded-md p-2">
                    <div className="h-[50px] w-[6px] rounded-md bg-highlight-500" />
                    <p className="px-4 py-3 text-highlight-400 font-semibold">18'</p>
                    <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                        <span className="font-bold text-sm">4</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                        <span className="font-bold text-sm">4</span>
                    </div>
                    </div>
                    <div className="flex items-center justify-center pl-4 pr-2">
                    <NotificationsActiveOutlined />
                    </div>
                </div>

                <div className="flex items-center justify-between bg-secondary-900/60 hover:bg-secondary-900/80 rounded-md p-2">
                    <div className="h-[50px] w-[6px] rounded-md bg-highlight-500" />
                    <p className="px-4 py-3 text-highlight-400 font-semibold">18'</p>
                    <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                        <span className="font-bold text-sm">4</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                        <span className="font-bold text-sm">4</span>
                    </div>
                    </div>
                    <div className="flex items-center justify-center pl-4 pr-2">
                    <NotificationsActiveOutlined />
                    </div>
                </div>

                <div className="flex items-center justify-between bg-secondary-900/60 hover:bg-secondary-900/80 rounded-md p-2">
                    <div className="h-[50px] w-[6px] rounded-md bg-highlight-500" />
                    <p className="px-4 py-3 text-highlight-400 font-semibold">18'</p>
                    <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                        <span className="font-bold text-sm">4</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                        <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                        <span className="font-bold text-sm">4</span>
                    </div>
                    </div>
                    <div className="flex items-center justify-center pl-4 pr-2">
                    <NotificationsActiveOutlined />
                    </div>
                </div>
                </div>

            </div>
        </div>
    )
}

export default Matches