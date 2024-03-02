import { MoreVertOutlined } from '@mui/icons-material'

const index = () => {
  return (
    <div className="p-4 py-2 bg-primary-500 border border-secondary-900/50">
      
      <div className="p-2 px-4 bg-primary-800 rounded-lg mt-4">
        <h2 className="font-bold">Competitions</h2>

        <div className="flex flex-col gap-4 mt-4">
            
            <div className="flex items-center gap-4 justify-between bg-primary-600 p-3 px-4 rounded-lg border border-secondary-800">
              <div className="h-12 aspect-square rounded-full border-2 border-secondary-800 shadow-lg" />
              <div className="flex-1 flex flex-col">
                <h3 className="text-secondary-400 font-semibold">Premier League</h3>
                <span className="text-xs text-secondary-600">England</span>
              </div>
              <p className="text-xs font-bold text-secondary-700">8 matches</p>
              <MoreVertOutlined />
            </div>
            
            <div className="flex items-center gap-4 justify-between bg-primary-600 p-3 px-4 rounded-lg border border-highlight-400">
              <div className="h-12 aspect-square rounded-full border-2 border-secondary-800 shadow-lg" />
              <div className="flex-1 flex flex-col">
                <h3 className="text-secondary-400 font-semibold">League 1</h3>
                <span className="text-xs text-secondary-600">France</span>
              </div>
              <p className="text-xs font-bold text-highlight-400">8 matches</p>
              <MoreVertOutlined />
            </div>
            
            <div className="flex items-center gap-4 justify-between bg-primary-600 p-3 px-4 rounded-lg">
              <div className="h-12 aspect-square rounded-full border-2 border-secondary-800 shadow-lg" />
              <div className="flex-1 flex flex-col">
                <h3 className="text-secondary-400 font-semibold">Serie A</h3>
                <span className="text-xs text-secondary-600">Italy</span>
              </div>
              <MoreVertOutlined />
            </div>

        </div>
      </div>
      
      <div className="p-2 px-4 bg-primary-800 rounded-lg mt-4">
        <h2 className="font-bold">Teams</h2>

        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="flex flex-col items-center p-3 gap-3 bg-primary-600 rounded-lg hover:bg-primary-500 border border-highlight-400">
            <div className="w-full aspect-square rounded-full bg-white-900/50 relative">
              <div className="absolute top-0 right-0 w-3 aspect-square rounded-full bg-highlight-500"></div>
            </div>
            <p className="font-bold text-secondary-600 truncate">FC Barcelona</p>
          </div>
          <div className="flex flex-col items-center p-3 gap-3 bg-primary-600 rounded-lg hover:bg-primary-500">
            <div className="w-full aspect-square rounded-full bg-white-900/50 relative">
            </div>
            <p className="font-bold text-secondary-600 truncate">FC Barcelona</p>
          </div>
          <div className="flex flex-col items-center p-3 gap-3 bg-primary-600 rounded-lg hover:bg-primary-500">
            <div className="w-full aspect-square rounded-full bg-white-900/50 relative">
            </div>
            <p className="font-bold text-secondary-600 truncate">FC Barcelona</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
