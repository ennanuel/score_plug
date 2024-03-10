import { MATCHES } from "../_assets/constants/match";
import MatchPredictionCard from "../_components/MatchPredictionCard";
import { Match } from "@/types/match.type";
import { DateAndStatusFilter } from "../_components";

const Matches = () => {
  return (
    <div className="border border-secondary-900/50 bg-primary-500 p-3">
      <DateAndStatusFilter />
      <h2 className="col-span-2 font-bold text-2xl mb-2 mx-3 mt-4">Match Predictions</h2>
      <ul className="grid grid-cols-2 gap-4 mt-4">
        {
          MATCHES.map((match, index) => <li key={index}><MatchPredictionCard {...(match as Match)} /></li>)
        }
      </ul>
    </div>
  )
};

export default Matches