import { Competition, Team } from '@/types/global.type';
import { COMPETITIONS } from '../_assets/constants/competition';
import { TEAMS } from '../_assets/constants/team';
import CompetitionCard from '../_components/CompetitionCard';
import TeamCard from '../_components/TeamCard';

const index = () => {
  return (
    <div className="p-4 py-2 bg-primary-500 border border-secondary-900/50">
      
      <div className="p-2 px-4 bg-primary-800 rounded-lg mt-4">
        <h2 className="font-bold">Competitions</h2>

        <ul className="flex flex-col gap-4 mt-4">
          {
            COMPETITIONS.map((competition, index) => (
              <li key={index}><CompetitionCard {...(competition as Competition)} /></li>
            ))
          }
        </ul>
      </div>
      
      <div className="p-2 px-4 bg-primary-800 rounded-lg mt-4">
        <h2 className="font-bold">Teams</h2>

        <ul className="grid grid-cols-4 gap-4 mt-4">
          {
            TEAMS.map((team, index) => (
              <li key={index}><TeamCard {...(team as Team)} /></li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default index
