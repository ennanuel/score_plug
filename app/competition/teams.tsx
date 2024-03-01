

const CompetitionTeams = () => {
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      <div className="flex flex-col items-center p-3 gap-3 bg-primary-600 rounded-md hover:bg-primary-500 border border-highlight-400">
        <div className="w-full aspect-square rounded-full bg-white-900/50 relative">
          <div className="absolute top-0 right-0 w-3 aspect-square rounded-full bg-highlight-500"></div>
        </div>
        <p className="font-semibold text-secondary-600 truncate text-sm">FC Barcelona</p>
      </div>
      <div className="flex flex-col items-center p-3 gap-3 bg-primary-600 rounded-md hover:bg-primary-500">
        <div className="w-full aspect-square rounded-full bg-white-900/50 relative">
        </div>
        <p className="font-semibold text-secondary-600 truncate text-sm">FC Barcelona</p>
      </div>
      <div className="flex flex-col items-center p-3 gap-3 bg-primary-600 rounded-md hover:bg-primary-500">
        <div className="w-full aspect-square rounded-full bg-white-900/50 relative">
        </div>
        <p className="font-semibold text-secondary-600 truncate text-sm">FC Barcelona</p>
      </div>
    </div>
  )
}

export default CompetitionTeams
