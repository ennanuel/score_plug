import React from 'react'

const MatchInfo = () => {
  return (
    <div className='mt-2 p-4'>
      <p className='text-center font-semibold text-secondary-500'>Referee</p>
      <div className="p-4 py-3 bg-gradient-to-br from-primary-500/40 to-primary-600 rounded-md flex flex-col gap-4 mt-2">
        <p className="flex items-center justify-between">
          <span className='text-sm text-secondary-600'>Name</span>
          <span className="text-sm font-semibold">Jorginho Rodriguez</span>
        </p>
        <p className="flex items-center justify-between">
          <span className='text-sm text-secondary-600'>Nationality</span>
          <span className="text-sm font-semibold">Italy</span>
        </p>
      </div>

      <p className='text-center font-semibold text-secondary-500 mt-6 pt-2'>Venue</p>
      <div className="p-4 py-3 bg-primary-600 rounded-md flex flex-col gap-4 mt-2">
        <p className="flex items-center justify-between">
          <span className='text-sm text-secondary-600'>Name</span>
          <span className="text-sm font-semibold">Jorginho Rodriguez</span>
        </p>
        <p className="flex items-center justify-between">
          <span className='text-sm text-secondary-600'>Nationality</span>
          <span className="text-sm font-semibold">Italy</span>
        </p>
      </div>

      <p className='text-center font-semibold text-secondary-500 mt-6 pt-2'>Other Matches You Might Like</p>
      <div className="bg-primary-600 p-4 grid grid-cols-5 m-3 mt-4 gap-2 rounded-md">
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
          <h3 className="font-bold text-xs text-secondary-600">FC Barcelona</h3>
        </div>
      </div>
    </div>
  )
}

export default MatchInfo
