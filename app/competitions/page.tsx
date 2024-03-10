import { MdStarOutline } from 'react-icons/md';
import { COMPETITIONS } from '../_assets/constants/competition';
import CompetitionCard from '../_components/CompetitionCard';
import { Competition } from '@/types/competition.type';

const Competitions = () => {
    return (
        <div className="border border-secondary-900/50 bg-primary-500 p-3">
            <div className="flex items-center gap-4 justify-between bg-primary-800 p-3 px-4 rounded-lg">
                <h2 className="font-bold">Leagues and Competitions</h2>
                <MdStarOutline size={20} />
            </div>
            
            <ul className="flex flex-col gap-2 mt-6">
                {
                    COMPETITIONS.map((competition, index) => (
                        <li key={index}><CompetitionCard {...(competition as Competition)} /></li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Competitions
