import { IoPerson } from "react-icons/io5";
import { TbSoccerField } from "react-icons/tb";
import { FaTrophy } from "react-icons/fa6";

const NothingWasFound = ({ text = "Nothing was found", iconType, noBackground, small }: { text?: string; small?: boolean; noBackground?: boolean; iconType?: "team" | "match" | "competition" }) => {
  return (
    <div className={`flex flex-col justify-center items-center gap-8 py-10 rounded-xl ${noBackground ? 'bg-[#191919]' : ''} border border-transparent`}>
        <span className={`${small ? 'w-20' : 'w-[160px]'} p-2 aspect-square rounded-lg ${noBackground ? '' : 'bg-white-100/5'} flex flex-col gap-1`}>
            {
              iconType === "team" ?
                <span className={`${small ? 'w-8' : 'w-20'} aspect-square rounded-full bg-white-100/5 text-white-100/5 overflow-hidden flex items-end justify-center`}>
                    <IoPerson size={small ? 28 : 56} />
                </span> :
                iconType === "competition" ?
                  <span className={`${small ? 'h-8' : 'h-20'} text-[#404040] flex items-center justify-center`}>
                      <FaTrophy size={small ? 32 : 64} />
                  </span> :
                <span className={`${small ? 'h-8' : 'h-20'} text-[#404040] flex items-center justify-center`}>
                    <TbSoccerField size={small ? 32 : 64} />
                </span>
            }
            <div className={`flex flex-1 ${small ? 'gap-1' : 'gap-2'} flex-col`}>
                <div className="flex flex-1 gap-2 justify-between">
                    <span className={`block ${small ? 'w-12 rounded-full' : 'w-4/5 rounded-md'} bg-white-100/5`}></span>
                    <span className={`block ${small ? 'w-3 rounded-full' : 'w-6 rounded-md'} bg-white-100/5`}></span>
                </div>
                <div className="flex flex-1 gap-2 justify-between">
                    <span className={`block ${small ? 'w-8 rounded-full' : 'w-1/2 rounded-md'} bg-white-100/5`}></span>
                    <span className={`block ${small ? 'w-3 rounded-full' : 'w-6 rounded-md'} bg-white-100/5`}></span>
                </div>
            </div>
        </span>
        <span className="text-2xs text-white-800 text-center">{text}</span>
    </div>
  )
}

export default NothingWasFound
