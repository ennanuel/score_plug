import { Outlet } from 'react-router-dom';
import { MatchHeader } from '../../components';

const Match = () => {
  return (
    <div className='border border-secondary-900/50'>
      <MatchHeader />
      <Outlet />
    </div>
  )
}

export default Match
