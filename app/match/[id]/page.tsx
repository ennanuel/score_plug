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
    </div>
  )
}

export default MatchInfo
