import { Outlet } from 'react-router-dom'
import { CompetitionHeader } from '../../../../score-plug-frontend/components'

const Competition = () => {
    return (
        <div className="border border-secondary-900/50">
            <CompetitionHeader />
            <Outlet />
        </div>
    )
}

export default Competition
