import { TeamDetailsHeader } from '../'

const Team = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <TeamDetailsHeader />
      {children}
    </div>
  )
};

export default Team
