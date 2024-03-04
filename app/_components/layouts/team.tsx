import { TeamDetailsHeader } from '../'

const Team = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="border border-secondary-900/50">
      <TeamDetailsHeader />
      {children}
    </div>
  )
};

export default Team
