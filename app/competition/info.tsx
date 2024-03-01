import { Tag } from '@mui/icons-material'

const CompetitionInfo = () => {
  return (
    <div className="p-2 mt-2">
    <table className="border border-secondary-900/50 w-full">
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

      <div className="mt-4 p-3 px-4 rounded-lg bg-gradient-to-br from-primary-500/50 to-primary-500 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-secondary-500">Host</p>
          <p className='font-semibold text-sm'>Spain</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-secondary-600">Teams</p>
          <p className='text-xs font-semibold text-secondary-500'>20</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-secondary-600">Start Date</p>
          <p className='text-xs font-semibold text-secondary-500'>August 20<sup>th</sup>, 2020</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-secondary-600">End Date</p>
          <p className='text-xs font-semibold text-secondary-500'>May 24<sup>th</sup>, 2021</p>
        </div>
      </div>

    </div>
  )
}

export default CompetitionInfo
