import { TEAM_FORM } from '@/app/_assets/constants/team';
import { FormBox, MatchCard, Standings } from '@/app/_components';
import { MATCHES } from '@/app/_assets/constants/match';

import { Match } from '@/types/match.type';

const TeamInfo = () => {
    return (
        <div className="mt-4">
            <div className="p-2">
                <div className="flex justify-between items-end gap-3 p-2">
                    <p className="text-sm font-semibold">Team Form</p>
                    <div className="flex gap-2 items-center justify-center">
                        {TEAM_FORM.map((form, index) => <FormBox outcome={form} />)}
                    </div>
                </div>
        
                <div className="flex justify-between items-center gap-3 py-1 px-2">
                    <p className="text-xs text-secondary-600">Average Goals Scored</p>
                    <p className="text-sm font-semibold">3</p>
                </div>
        
                <div className="flex justify-between items-center gap-3 py-1 px-2">
                    <p className="text-xs text-secondary-600">Average Goals Conceded</p>
                    <p className="text-sm font-semibold">3</p>
                </div>
            </div>

            <p className='font-semibold text-sm text-center m-2 mt-6'>Previous Matches</p>
            <ul className="flex flex-col mt-1 gap-3 p-2">
                {
                    MATCHES.filter(({ status }) => status === 'FINISHED').map((match, index) => (
                        <li key={index}><MatchCard {...(match as Match)} /></li>
                    ))
                }
            </ul>
            <p className='font-semibold text-sm text-center mt-6 mb-4'>Team Standing</p>
            <Standings />
        </div>
    )
};

export default TeamInfo
