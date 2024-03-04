import { MdFavorite, MdArrowRight } from 'react-icons/md';

const Competitions = () => {
    return (
        <div className="border border-secondary-900/50 bg-primary-500 p-3">
            <div className="flex items-center gap-4 justify-between bg-primary-800 p-3 px-4 rounded-lg">
                <h2 className="font-bold">Leagues and Competitions</h2>
                <MdFavorite />
            </div>
            
            <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-center gap-4 justify-between bg-primary-800 p-3 px-4 rounded-lg border border-secondary-800">
                    <div className="h-12 aspect-square rounded-full border-2 border-secondary-800 shadow-lg" />
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-secondary-400 font-semibold">Premier League</h3>
                        <span className="text-xs text-secondary-600">England</span>
                    </div>
                    <p className="text-xs font-bold text-secondary-700">8 matches</p>
                    <MdArrowRight />
                </div>

                <div className="flex items-center gap-4 justify-between bg-primary-800 p-3 px-4 rounded-lg border border-highlight-400 shadow-lg">
                    <div className="h-12 aspect-square rounded-full border-2 border-secondary-800" />
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-secondary-400 font-semibold">Ligue 1</h3>
                        <span className="text-xs text-secondary-600">France</span>
                    </div>
                    <p className="text-xs font-bold text-highlight-400">8 matches</p>
                    <MdFavorite />
                </div>

                <div className="flex items-center gap-4 justify-between bg-primary-800 p-3 px-4 rounded-lg border border-highlight-400 shadow-lg">
                    <div className="h-12 aspect-square rounded-full border-2 border-secondary-800" />
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-secondary-400 font-semibold">La Liga</h3>
                        <span className="text-xs text-secondary-600">Spain</span>
                    </div>
                    <p className="text-xs font-bold text-highlight-400">8 matches</p>
                    <MdFavorite />
                </div>

                <div className="flex items-center gap-4 justify-between bg-primary-800 p-3 px-4 rounded-lg shadow-lg">
                    <div className="h-12 aspect-square rounded-full border-2 border-secondary-800" />
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-secondary-400 font-semibold">Bundesliga</h3>
                        <span className="text-xs text-secondary-600">Germany</span>
                    </div>
                    <MdFavorite />
                </div>
            </div>
        </div>
    )
}

export default Competitions
