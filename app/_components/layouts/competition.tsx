import { CompetitionHeader } from '../'
 
const Competition = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="border border-secondary-900/50">
            <CompetitionHeader />
            {children}
        </div>
    )
};

export default Competition
