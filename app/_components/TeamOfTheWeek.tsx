import { TeamOfTheWeek as TeamOfTheWeekProps } from "@/types/competition.type";
import Image from "next/image";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { loadImage } from "../_utils/competition";
import { IoPerson } from "react-icons/io5";


export default function TeamOfTheWeek({ players, children, hideTeamCrest }: { players: TeamOfTheWeekProps; children?: React.ReactNode; hideTeamCrest?: boolean; }) {
    const teamOfTheWeek = (Object.entries(players))
        .filter(([key]) => key === 'goalkeeper' || key === 'defence' || key === 'midfield' || key === 'offence')
        .sort(([key]) => (key === 'goalkeeper' ? -1 : key === 'defence' ? -2 : key === 'midfield' ? -3 : -4));

    return (
        <div className="flex flex-col bg-white-100/10 border border-transparent rounded-xl overflow-hidden h-fit">
            {
                children ?
                    children :
                    <div className="flex flex-col gap-8 p-4">
                        <h3 className="text-base font-semibold text-white-300 text-center">Team of the week</h3>
                        <div className="flex justify-between items-center gap-4">
                            <button className="flex items-center justify-center w-6 aspect-square rounded-full bg-white-100/10 text-white-600">
                                <FaAngleLeft size={12} />
                            </button>
                            <span className="text-2xs text-white-500 font-semibold">Best Players</span>
                            <button className="flex items-center justify-center w-6 aspect-square rounded-full bg-white-100/10 text-white-600">
                                <FaAngleRight size={12} />
                            </button>
                        </div>
                    </div>
            }
            <div className="relative p-6 pt-8 bg-[#303030] overflow-hidden flex flex-row-reverse lg:flex-col justify-evenly lg:justify-start gap-6">
                <div className="absolute top-0 left-0 h-full w-full flex flex-row-reverse lg:flex-col justify-between">
                    <span className="h-full lg:h-1 w-1 lg:w-full flex justify-center items-center">
                        <span className="block h-full lg:h-auto lg:w-full max-h-[160px] max-w-[160px] aspect-square rounded-full border-5 border-[#424242]"></span>
                    </span>
                    <span className="flex-1 flex flex-row-reverse lg:flex-col justify-end items-center">
                        <span className="w-full max-w-[120px] aspect-square overflow-hidden block">
                            <span className="w-full h-full rounded-full border-5 border-[#424242] block translate-x-[-70%] lg:translate-x-0 translate-y-0 lg:translate-y-[70%]"></span>
                        </span>
                        <span className="flex justify-start lg:justify-center items-center lg:items-end w-full max-w-[96px] lg:max-w-[200px] h-full max-h-[240px] lg:max-h-[96px] rounded-r-lg lg:rounded-none lg:rounded-t-lg border-5 border-[#424242] border-l-0 lg:border-5 lg:border-b-0">
                            <span className="block w-1/2 h-2/5 rounded-t-lg border-5 border-[#424242] border-l-0 lg:border-5 lg:border-b-0">
                            </span>
                        </span>
                    </span>
                </div>
                {
                    teamOfTheWeek.map(([title, players]) => (
                        <div key={title} className="relative flex flex-col lg:flex-row items-center justify-evenly gap-4">
                            {
                                players
                                    .map((player, subIndex) => (
                                        <div key={player._id} title={player.name} className={`${(title === 'offence' && subIndex === 1) ? 'mr-4 lg:mb-4' : (title ===  'midfield' && subIndex === 1) ? 'lr-4 lg:mt-4' : (title === 'defence' && (subIndex === 1 || subIndex === 2)) ? 'mr-4 lg:mt-4' : ''} relative flex flex-col justify-center items-center w-12 gap-2`}>
                                            <span className="relative w-8 flex items-center justify-center aspect-square">
                                                <span className="w-full h-full rounded-full flex items-end justify-center overflow-hidden bg-[#404040] text-white-600">
                                                    <IoPerson size={25} className="mb-[-2px]" />
                                                </span>
                                                {
                                                    hideTeamCrest ?
                                                    null :
                                                    <span className="-bottom-1 right-0 absolute block w-4 aspect-square">
                                                        <Image src={player.teamCrest} alt={`${player.name} team crest`} width={20} height={20} loader={loadImage} className="e-full h-full object-contain" />
                                                    </span>
                                                }
                                            </span>
                                            <span className="max-w-12 truncate text-2xs font-semibold text-white-500">{player.name}</span>
                                        </div>
                                    ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}