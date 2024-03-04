import { Tag } from "@mui/icons-material"

const H2H = () => {
    return (
        <div className='mt-2 p-4'>
            <p className='text-center font-semibold text-s'>Overall Stats</p>
            <div className='flex flex-col items-center gap-2 p-2 px-5 pt-6 m-auto mt-2 border border-secondary-900/50'>
                <div className="flex w-[80%]">
                    <div className="relative top-0 left-0 w-[40%] h-2 rounded-l-[5px] bg-highlight-300">
                        <p className="absolute bottom-[100%] left-[50%] translate-x-[-50%] text-[.7em] text-secondary-600">Home</p>
                    </div>
                    <div className="relative top-0 left-0 w-[30%] h-2 border-x border-primary-800 bg-highlight-500">
                    <p className="absolute bottom-[100%] left-[50%] translate-x-[-50%] text-[.7em] text-secondary-600">Draw</p>
                    </div>
                    <div className="relative top-0 left-0 w-[30%] h-2 rounded-r-[5px] bg-highlight-700">
                        <p className="absolute bottom-[100%] left-[50%] translate-x-[-50%] text-[.7em] text-secondary-600">Away</p>
                    </div>
                </div>

                <div className="flex w-full items-center justify-between gap-4 mt-2">
                    <p className='text-sm font-semibold text-secondary-500'>Matches Played</p>
                    <span className='font-bold'>10</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                    <p className='text-xs text-secondary-600'>FC Barcelona Win</p>
                    <span className='font-semibold text-sm'>5</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                    <p className='text-xs text-secondary-600'>Matches Drawn</p>
                    <span className='font-semibold text-sm'>3</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                    <p className='text-xs text-secondary-600'>Manchester United Win</p>
                    <span className='font-semibold text-sm'>2</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4 mt-2">
                    <p className='text-sm font-semibold text-secondary-500'>Goals Scored</p>
                    <span className='font-bold'>22</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                    <p className='text-xs text-secondary-600'>FC Barcelona Goals</p>
                    <span className='font-semibold text-sm'>5</span>
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                    <p className='text-xs text-secondary-600'>Manchester United Goals</p>
                    <span className='font-semibold text-sm'>3</span>
                </div>
            
            <div className="flex flex-col gap-3 w-full mb-3">
                <p className='font-semibold text-sm mt-6 text-center'>Previous Encounters</p>
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

            <p className='text-center font-semibold mt-6'>Individual Stats</p>
            <ul className="flex items-center p-2 gap-3 mt-2">
                <li>
                    <button className="px-4 h-[30px] rounded-[15px] text-sm font-bold bg-secondary-400 text-primary-600 border border-secondary-400">
                        Barcelona
                    </button>
                </li>
                <li>
                    <button className="px-4 h-[30px] rounded-[15px] text-sm font-bold text-secondary-700 border border-secondary-700">
                        Machester United
                    </button>
                </li>
            </ul>

            <div className="mt-2 p-2 border border-secondary-900/50">
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
        </div>
    )
}

export default H2H
