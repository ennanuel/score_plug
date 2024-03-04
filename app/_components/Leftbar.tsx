import { MdMenu } from "react-icons/md";

const Leftbar = () => {
  return (
    <div className="col-span-1 p-4 flex flex-col gap-6">
      <div className="border border-secondary-900/50 bg-primary-500 p-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-white-300">Top Leagues</h2>
          <span className="text-xs text-secondary-700 hover:text-secondary-500">More</span>
        </div>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>Premier League</span>
            </div>
            <span className="text-secondary-700 text-xs font-bold">England</span>
          </li>
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>La Liga</span>
            </div>
            <span className="text-secondary-700 text-xs font-bold">Spain</span>
          </li>
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>Serie A</span>
            </div>
            <span className="text-secondary-700 text-xs font-bold">Italy</span>
          </li>
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>Ligue 1</span>
            </div>
            <span className="text-secondary-700 text-xs font-bold">France</span>
          </li>
        </ul>
      </div>

      
      <div className="border border-secondary-900/50 bg-primary-500 p-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-white-300">Top Teams</h2>
          <span className="text-xs text-secondary-700 hover:text-secondary-500">More</span>
        </div>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>FC Barcelona</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>Manchester City</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>Manchester United</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>Real Madrid</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>Real Madrid</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>Real Madrid</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>Real Madrid</span>
            </div>
          </li>
          <li className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
            <div className="flex items-center gap-2 text-secondary-600">
              <MdMenu />
              <span>Real Madrid</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Leftbar
