import React from 'react'

const TeamPlayers = () => {
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      <div className="flex flex-col items-center justify-center p-3 gap-3 bg-primary-600 rounded-md hover:bg-primary-500">
        <div className="w-full aspect-square rounded-full bg-white-900/50 relative">
        </div>
        <p className="w-full font-semibold text-secondary-600 truncate text-sm">Ousmane Dembele</p>
      </div>
      <div className="flex flex-col items-center justify-center p-3 gap-3 bg-primary-600 rounded-md hover:bg-primary-500">
        <div className="w-full aspect-square rounded-full bg-white-900/50 relative">
        </div>
        <p className="w-full font-semibold text-secondary-600 truncate text-sm">Ronald Araujo</p>
      </div>
      <div className="flex flex-col items-center justify-center p-3 gap-3 bg-primary-600 rounded-md hover:bg-primary-500">
        <div className="w-full aspect-square rounded-full bg-white-900/50 relative">
        </div>
        <p className="w-full font-semibold text-secondary-600 truncate text-sm">Ansu Fati</p>
      </div>
    </div>
  )
}

export default TeamPlayers
