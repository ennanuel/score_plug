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
        </div>
            

      <div className="grid grid-cols-2 gap-4 mt-4">
        <h2 className="col-span-2 font-bold text-2xl mb-2 mx-3">
          Match Predictions
        </h2>
      <div className="grid grid-cols-3 bg-primary-800 py-2 px-4 rounded-md gap-2 shadow-lg">
            <div className="col-span-3 text-highlight-300 text-xs flex items-center gap-1 font-semibold">
              <div className="w-[4px] h-full rounded-lg bg-highlight-300" />
              <span>Premier League</span>
            </div>
            <div className="flex flex-col justify-between ai-center gap-2">
              <div className="aspect-square rounded-2xl bg-white-100/5 flex items-center justify-center"></div>
              <span className="truncate text-sm w-full font-semibold text-secondary-500">FC Barcelona</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-3xl font-bold text-secondary-400">v</span>
              <span className="text-secondary-700 font-semibold">12:00</span>
            </div>
            <div className="flex flex-col justify-between ai-center gap-2">
              <div className="aspect-square rounded-2xl bg-white-100/5 flex items-center justify-center"></div>
              <span className="truncate text-sm w-full font-semibold text-secondary-500">FC Barcelona</span>
            </div>
            <div className="col-span-3">
              <div className="relative mt-1 mb-2 h-2 rounded-lg bg-secondary-900 overflow-clip">
                <div className="absolute top-0 left-0 w-[100%] h-full rounded-r-lg bg-highlight-700 shadow-lg" />
                <div className="absolute top-0 left-0 w-[80%] h-full rounded-r-lg bg-highlight-500 shadow-lg" />
                <div className="absolute top-0 left-0 w-[50%] h-full rounded-r-lg bg-highlight-300" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex flex-col gap-[2px] text-center">
                  <span className="text-[.7em] text-secondary-600">Home</span>
                  <p className="text-sm font-semibold text-secondary-500 border border-highlight-400/40 bg-highlight-400/20 p-1">50%</p>
                </div>
                <div className="flex-1 flex flex-col gap-[2px] text-center">
                  <span className="text-[.7em] text-secondary-600">Draw</span>
                  <p className="text-sm font-semibold text-secondary-500 border border-highlight-500/40 bg-highlight-500/20 p-1">30%</p>
                </div>
                <div className="flex-1 flex flex-col gap-[2px] text-center">
                  <span className="text-[.7em] text-secondary-600">Away</span>
                  <p className="text-sm font-semibold text-secondary-500 border border-highlight-700/50 bg-highlight-700/20 p-1">20%</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Matches