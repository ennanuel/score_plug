import { TEAMS } from "@/app/_assets/constants/team";
import { TeamCard } from "@/app/_components";

const CompetitionTeams = () => {
  return (
    <ul className="grid grid-cols-5 gap-4 p-4">
      {
        TEAMS.map((team, index) => (
          <li key={index}><TeamCard {...team} /></li>
        ))
      }
    </ul>
  )
}

export default CompetitionTeams
