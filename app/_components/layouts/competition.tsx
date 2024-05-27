import { CompetitionHeader } from '../'
 
const Competition = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            <CompetitionHeader />
            {children}
        </div>
    )
};

export default Competition
