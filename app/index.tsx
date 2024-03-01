import { useState } from 'react';
import { StarOutline, ChevronRight, NotificationsActiveOutlined } from '@mui/icons-material';

const Home = () => {
  const [live, setLive] = useState(false);
  const onLive = () => setLive(true);
  const offLive = () => setLive(false);

  return (
    <div className="border border-secondary-900/50 bg-primary-500 p-3">
      <div className="flex items-center justify-between px-3">
        <div className="relative flex items-center justify-stretch h-[30px] gap-2">
          <button onClick={offLive} className={`relative flex justify-center items-center gap-2 h-full px-3 rounded-md font-semibold ${!live ? 'text-orange-300 bg-orange-400/20': 'bg-black-900/50 text-orange-700'}`}>
            {!live && <span className="block w-2 aspect-square rounded-md bg-orange-300"></span>}
            <span>All</span>
          </button>
          <button onClick={onLive} className={`relative flex justify-center items-center gap-2 h-full px-3 rounded-md font-semibold ${live ? ' text-green-300 bg-green-400/20': 'bg-black-900/50 text-green-700'}`}>            
            {live && <span className="block w-2 aspect-square rounded-md bg-green-600"></span>}
            <span>Live</span>
          </button>
        </div>
        <StarOutline />
      </div>
      <div className="bg-primary-800 py-3 px-4 rounded-lg mt-6">
        <h2 className="font-bold">Popular Leagues</h2>
        <div className='mt-4 flex flex-col gap-3'>
          <div className='flex items-center gap-3 p-2'>
            <div className="w-5 aspect-square border-2 border-secondary-800" />
            <div className="flex-1 flex flex-col">
              <span className="font-semibold text-secondary-500 text-sm">Premier League</span>
              <span className="text-[.7em] text-secondary-700">England</span>
            </div>
            <ChevronRight />
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

        
        <div className='mt-4 flex flex-col gap-3'>
          <div className='flex items-center gap-3 p-2'>
            <div className="w-5 aspect-square border-2 border-secondary-800" />
            <div className="flex-1 flex flex-col">
              <span className="font-semibold text-secondary-500 text-sm">La Liga</span>
              <span className="text-[.7em] text-secondary-700">Spain</span>
            </div>
            <ChevronRight />
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

export default Home
