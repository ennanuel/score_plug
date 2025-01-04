import { CompetitionHeader } from '../'
 
const Competition = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='flex flex-col gap-4'>
            <CompetitionHeader />
            {children}
        </div>
    )
};

export default Competition
