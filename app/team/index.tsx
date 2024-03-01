import { Outlet } from 'react-router-dom'
import { TeamDetailsHeader } from '../../components'

const Team = () => {
  return (
    <div className="border border-secondary-900/50">
      <TeamDetailsHeader />
      <Outlet />
    </div>
  )
}

export default Team
