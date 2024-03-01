import { ChevronLeft, StarOutline } from '@mui/icons-material'
import React from 'react'

const TeamDetailsHeader = () => {
  return (
    <div className="bg-gradient-to-br from-secondary-700/50 via-secondary-800/20 to-transparent p-2 pb-0 border-b border-secondary-900/50">
      <div className="py-4 pr-3 flex items-center gap-2">
        <button className="h-8 aspect-square rounded-full hover:bg-secondary-400/10">
          <ChevronLeft />
        </button>
        <div className="h-14 rounded-full aspect-square border-2 border-secondary-500"></div>
        <div className="flex-1 flex-col">
          <p className="font-bold">FC Barcelona</p>
          <p className="text-sm text-secondary-600">Spain</p>
        </div>
        <StarOutline />
      </div>
      <ul className="flex items-center gap-2 mt-4">
        <li className="relative">
          <button className="px-2 font-bold text-secondary-500">Details</button>
          <div className="absolute bottom-[-3px] left-0 w-full h-[3px] bg-secondary-500" />
        </li>
        <li>
          <button className="px-2 font-semibold text-secondary-700">Matches</button>
        </li>
        <li>
          <button className="px-2 font-semibold text-secondary-700">Players</button>
        </li>
      </ul>
    </div>
  )
}

export default TeamDetailsHeader
