import { Tag } from '@mui/icons-material';

const TeamInfo = () => {
  return (
    <div className="p-2 mt-4">
    <div className="flex justify-between items-end gap-3 p-2">
        <p className="text-sm font-semibold">Team Form</p>
        <div className="flex gap-2 items-center justify-center">
            <div className="h-6 aspect-square rounded-md border border-secondary-600 flex items-center justify-center text-secondary-600 font-semibold">
                D
            </div>
            <div className="h-6 aspect-square rounded-md border border-red-500 flex items-center justify-center text-red-500  font-semibold">
                L
            </div>
            <div className="h-6 aspect-square rounded-md border border-green-500 flex items-center justify-center text-green-500 font-semibold">
                W
            </div>
            <div className="h-6 aspect-square rounded-md border border-green-500 flex items-center justify-center text-green-500 font-semibold">
                W
            </div>
            <div className="h-6 aspect-square rounded-md border border-red-500 flex items-center justify-center text-red-500  font-semibold">
                L
            </div>
        </div>
    </div>
    
    <div className="flex justify-between items-center gap-3 py-1 px-2">
        <p className="text-xs text-secondary-600">Average Goals Scored</p>
        <p className="text-sm font-semibold">3</p>
    </div>
    
    <div className="flex justify-between items-center gap-3 py-1 px-2">
        <p className="text-xs text-secondary-600">Average Goals Conceded</p>
        <p className="text-sm font-semibold">3</p>
    </div>

    <p className='font-semibold text-sm text-center mt-6'>Previous Matches</p>
    <div className="flex flex-col mt-1 gap-3 p-2">
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
      <p className='font-semibold text-sm text-center mt-6'>Team Standing</p>

      <table className="border border-secondary-900/50 w-full mt-4">
        <thead className="text-xs text-secondary-700 h-8 border-b border-secondary-900/50">
                        <th className="w-[50px] font-semibold"><Tag sx={{fontSize: '1.1rem'}} /></th>
                        <th className="text-left font-semibold">Team</th>
                        <th className="w-[50px] font-semibold">PL</th>
                        <th className="w-[50px] font-semibold">DIFF</th>
                        <th className="w-[50px] font-semibold">PTS</th>
                    </thead>
                    <tbody>
                        <tr className="text-xs text-center h-10 border-l-4 bg-green-400/10 border-green-500">
                            <td className="text-center text-xs">
                                <p className="h-6 m-auto aspect-square rounded-full bg-green-500 font-bold text-primary-800 flex items-center justify-center">1</p>
                            </td>
                            <td className="text-left">
                                <p className="w-5 aspect-square border border-secondary-900 float-left mr-2" />
                                <p>FC Barcelona</p>
                            </td>
                            <td className="text-secondary-500">20</td>
                            <td className="text-secondary-500">10</td>
                            <td className="text-secondary-500">+10</td>
                        </tr>
                        <tr className="text-xs text-center h-10">
                            <td className="text-center text-xs">
                                <p className="h-6 m-auto aspect-square rounded-full bg-green-500 font-bold text-primary-800 flex items-center justify-center">2</p>
                            </td>
                            <td className="text-left">
                                <p className="w-5 aspect-square border border-secondary-900 float-left mr-2" />
                                <p>Bayern Munich</p>
                            </td>
                            <td className="text-secondary-500">20</td>
                            <td className="text-secondary-500">10</td>
                            <td className="text-secondary-500">+10</td>
                        </tr>
                        <tr className="text-xs text-center h-10">
                            <td className="text-center text-xs">
                                <p className="h-6 m-auto aspect-square rounded-full bg-green-500 font-bold text-primary-800 flex items-center justify-center">3</p>
                            </td>
                            <td className="text-left">
                                <p className="w-5 aspect-square border border-secondary-900 float-left mr-2" />
                                <p>Borussia Dortmund</p>
                            </td>
                            <td className="text-secondary-500">20</td>
                            <td className="text-secondary-500">10</td>
                            <td className="text-secondary-500">+10</td>
                        </tr>
                        <tr className="text-xs text-center h-10">
                            <td className="text-center text-xs">
                                <p className="h-6 m-auto aspect-square rounded-full bg-yellow-500 font-bold text-primary-800 flex items-center justify-center">4</p>
                            </td>
                            <td className="text-left">
                                <p className="w-5 aspect-square border border-secondary-900 float-left mr-2" />
                                <p>Chelsea FC</p>
                            </td>
                            <td className="text-secondary-500">20</td>
                            <td className="text-secondary-500">10</td>
                            <td className="text-secondary-500">+10</td>
                        </tr>
                    </tbody>
      </table>
    </div>
  )
}

export default TeamInfo
