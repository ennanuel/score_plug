import { Standings } from '../../_components';

const CompetitionInfo = () => {
    return (
        <div className="mt-2">
            <Standings />

            <div className="text-xs mt-2">
                <div className="flex justify-between items-end bg-primary-500 p-2">
                    <span className="text-gray-400">Region</span>
                    <span>Spain</span>
                </div>
                <div className="flex justify-between items-end p-2">
                    <span className="text-gray-400">Teams</span>
                    <span>20</span>
                </div>
                <div className="flex justify-between items-end bg-primary-500 p-2">
                    <span className="text-gray-400">Start Date</span>
                    <span>August 20<sup>th</sup>, 2020</span>
                </div>
                <div className="flex justify-between items-cente p-2">
                    <span className="text-gray-400">End Date</span>
                    <span>May 21<sup>st</sup>, 2021</span>
                </div>
            </div>

        </div>
    )
};

export default CompetitionInfo
