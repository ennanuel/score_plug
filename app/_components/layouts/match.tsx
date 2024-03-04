import { MatchHeader } from '../';

const Match = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='border border-secondary-900/50'>
      <MatchHeader />
      {children}
      <div>
        <p className='text-center font-semibold text-gray-400 mt-6 pt-2'>Similar Matches</p>
        <ul className="flex flex-col gap-2">
          <li className="bg-gradient-to-br from-primary-500 to-primary-400/50 p-4 grid grid-cols-5 m-3 mt-4 gap-2 rounded-md">
            <div className="col-span-2 flex flex-col gap-2 items-center justify-center">
              <div className="h-[50px] aspect-square border-2 border-secondary-800 rounded-full" />
              <h3 className="font-bold text-xs text-secondary-600">FC Barcelona</h3>
            </div>
            <div className="col-span-1 flex flex-col items-center justify-center text-center">
              <p className="text-xl font-bold">22:00</p>
              <p className="text-xs text-secondary-600">Starts in 2 hours</p>
            </div>
            <div className="col-span-2 flex flex-col gap-2 items-center justify-center">
              <div className="h-[50px] aspect-square border-2 border-secondary-800 rounded-full" />
              <h3 className="font-bold text-xs text-secondary-600">Liverpool FC</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Match
