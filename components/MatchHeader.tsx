import { ChevronLeft, Notifications } from '@mui/icons-material'

const MatchHeader = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-2 m-3 pr-3">
        <ChevronLeft />
        <div className="h-6 aspect-square border-2 border-secondary-800"></div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-semibold">Premier League</h3>
          <p className='text-[.7em] text-secondary-700'>England</p>
        </div>
        <Notifications />
      </div>
      <div className="bg-primary-600 p-4 grid grid-cols-5 m-3 mt-4 gap-2 rounded-md">
        <div className="col-span-2 flex flex-col gap-2 items-center justify-center">
          <div className="h-20 aspect-square border-2 border-secondary-800 rounded-full" />
          <h3 className="font-bold text-sm text-secondary-600">FC Barcelona</h3>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center text-center">
          <p className="text-3xl font-bold">22:00</p>
          <p className="text-sm text-secondary-600">Starts in 2 hours</p>
        </div>
        <div className="col-span-2 flex flex-col gap-2 items-center justify-center">
          <div className="h-20 aspect-square border-2 border-secondary-800 rounded-full" />
          <h3 className="font-bold text-sm text-secondary-600">FC Barcelona</h3>
        </div>
      </div>

      <ul className="flex items-center gap-2 mt-6 border-b border-secondary-900/60 px-4">
        <li className="relative py-1 px-2">
          <button className="font-bold text-highlight-400">Details</button>
          <div className="absolute bottom-[-3px] left-0 h-[3px] w-full bg-highlight-500"></div>
        </li>
        <li className="relative py-1 px-2">
          <button className="font-semibold text-secondary-700">Head to Head</button>
        </li>
        <li className="relative py-1 px-2">
          <button className="font-semibold text-secondary-700">Prediction</button>
        </li>
      </ul>
    </>
  )
}

export default MatchHeader
