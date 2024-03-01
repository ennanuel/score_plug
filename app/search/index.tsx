import { ChevronRight, StarOutline } from '@mui/icons-material';

const Search = () => {
    return (
        <div className="border border-secondary-900/50 p-4 py-2">
            <p className="text-secondary-600">
                Results for <span className="text-secondary-400 font-bold">Barcelona</span>
            </p>
            <ul className="flex items-center gap-3 mt-3">
                <li>
                    <button className="h-[28px] rounded-[14px] px-4 bg-secondary-400 text-primary-800 text-sm font-bold">All</button>
                </li>
                <li>
                    <button className="h-[28px] rounded-[14px] px-4 border border-secondary-700 text-secondary-700 text-sm font-semibold">League</button>
                </li>
                <li>
                    <button className="h-[28px] rounded-[14px] px-4 border border-secondary-700 text-secondary-700 text-sm font-semibold">Match</button>
                </li>
                <li>
                    <button className="h-[28px] rounded-[14px] px-4 border border-secondary-700 text-secondary-700 text-sm font-semibold">Team</button>
                </li>
            </ul>
            <div className="border border-secondary-900/50 mt-4 p-2">
                <p className="text-sm font-semibold text-center">Matches</p>
                <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center justify-between bg-secondary-900/30 hover:bg-secondary-900/60 rounded-md p-1 px-2">
                        <div className="h-[50px] w-[6px] rounded-md bg-secondary-900" />
                        <p className="flex items-center justify-center px-4 font-bold text-secondary-700">FT</p>
                        <div className="flex flex-1 flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                            <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                            <span className="font-bold text-sm">4</span>
                        </div>
                        <div className="flex items-center gap-2 text-secondary-700">
                            <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                            <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                            <span className="font-bold text-sm">4</span>
                        </div>
                        </div>
                        <div className="px-6 pr-2 py-3 flex flex-col items-center justify-center text-secondary-700 font-semibold">
                            <p className="text-sm">20 May</p>
                            <p className="text-[.7em]">2022</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between bg-secondary-900/30 hover:bg-secondary-900/60 rounded-md p-1 px-2">
                        <div className="h-[50px] w-[6px] rounded-md bg-secondary-900" />
                        <p className="flex items-center justify-center px-4 font-bold text-secondary-700">FT</p>
                        <div className="flex flex-1 flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                            <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                            <span className="font-bold text-sm">4</span>
                        </div>
                        <div className="flex items-center gap-2 text-secondary-700">
                            <div className="w-4 aspect-square rounded-full border-2 border-secondary-800" />
                            <p className="flex-1 text-sm font-semibold">FC Barcelona</p>
                            <span className="font-bold text-sm">4</span>
                        </div>
                        </div>
                        <div className="px-6 pr-2 py-3 flex flex-col items-center justify-center text-secondary-700 font-semibold">
                            <p className="text-sm">20 May</p>
                            <p className="text-[.7em]">2022</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="border border-secondary-900/50 mt-4 p-2">
                <p className="text-sm font-semibold text-center">Leagues</p>
                
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex items-center gap-4 justify-between bg-primary-500 p-3 px-4 rounded-lg">
                        <div className="h-12 aspect-square rounded-full border-2 border-secondary-800 shadow-lg" />
                        <div className="flex-1 flex flex-col">
                            <h3 className="text-secondary-400 font-semibold">Premier League</h3>
                            <span className="text-xs text-secondary-600">England</span>
                        </div>
                        <ChevronRight />
                    </div>

                    <div className="flex items-center gap-4 justify-between bg-primary-500 p-3 px-4 rounded-lg">
                        <div className="h-12 aspect-square rounded-full border-2 border-secondary-800" />
                        <div className="flex-1 flex flex-col">
                            <h3 className="text-secondary-400 font-semibold">Ligue 1</h3>
                            <span className="text-xs text-secondary-600">France</span>
                        </div>
                        <ChevronRight />
                    </div>

                    <div className="flex items-center gap-4 justify-between bg-primary-500 p-3 px-4 rounded-lg shadow-lg">
                        <div className="h-12 aspect-square rounded-full border-2 border-secondary-800" />
                        <div className="flex-1 flex flex-col">
                            <h3 className="text-secondary-400 font-semibold">La Liga</h3>
                            <span className="text-xs text-secondary-600">Spain</span>
                        </div>
                        <ChevronRight />
                    </div>

                    <div className="flex items-center gap-4 justify-between bg-primary-500 p-3 px-4 rounded-lg shadow-lg">
                        <div className="h-12 aspect-square rounded-full border-2 border-secondary-800" />
                        <div className="flex-1 flex flex-col">
                            <h3 className="text-secondary-400 font-semibold">Bundesliga</h3>
                            <span className="text-xs text-secondary-600">Germany</span>
                        </div>
                        <ChevronRight />
                    </div>
                </div>
            </div>

            
            <div className="border border-secondary-900/50 mt-4 p-2">
                <p className="text-sm font-semibold text-center">Teams</p>
                <div className="grid grid-cols-5 gap-4 p-4">
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
                <div className="flex flex-col items-center p-3 gap-3 bg-primary-600 rounded-md hover:bg-primary-500">
                    <div className="w-full aspect-square rounded-full bg-white-900/50 relative">
                    </div>
                    <p className="font-semibold text-secondary-600 truncate text-sm">FC Barcelona</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Search
