import { TeamDetailsHeader } from '../'

const Team = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col gap-4">
      <TeamDetailsHeader />
      {children}
    </div>
  )
};

export default Team
