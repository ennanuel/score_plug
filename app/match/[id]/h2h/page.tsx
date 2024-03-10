"use client";

import { MATCHES } from "@/app/_assets/constants/match";
import { TEAM_FORM } from "@/app/_assets/constants/team";
import { FormBox, MatchCard, Standings } from "@/app/_components";
import { Match } from "@/types/match.type";
// import { usePathname, useSearchParams } from "next/navigation"

const H2H = () => {
    // const params = useSearchParams();
    // const showHomeSide = params.get("side") === 'home';
    // const pathname = usePathname();

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
                    <ul className="flex flex-col gap-1">
                        {
                            MATCHES.filter(match => match.status === 'FINISHED').map((match, index) => (
                                <li key={index}><MatchCard {...(match as Match)} /></li>
                            ))
                        }
                    </ul>
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
                        {
                            TEAM_FORM.map((outcome) => <FormBox outcome={outcome} />)
                        }
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
                <ul className="flex flex-col gap-1">
                    {
                        MATCHES.map((match, index) => (
                            <li key={index}><MatchCard {...(match as Match)} /></li>
                        ))
                    }
                </ul>

                <p className='font-semibold text-sm text-center mt-6'>Team Standing</p>
                <Standings />
            </div>
        </div>
    )
};

export default H2H
