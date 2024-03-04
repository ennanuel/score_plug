import { TeamStanding } from "@/types/team.type";
import Image from "next/image";


function Standing({ _id, index, name, crest, matchesPlayed, goalDifference, points, highlightedTeams, relegationPositions, topPositions, midPositions }: TeamStanding) {
    const highlightTeam = highlightedTeams.includes(_id);

    const teamPosition = index <= topPositions ?
        'TOP_TEAM' :
        (index > topPositions && index <= midPositions) ?
            'MID_TEAM' :
            (index >= relegationPositions) ?
                'LOW_TEAM' :
                '';

    const highlightColors = highlightTeam ?
        (
            teamPosition === 'TOP_TEAM' ?
                'bg-green-400/10 border-green-500' :
                teamPosition === 'MID_TEAM' ?
                    'bg-yellow-400/10 border-yellow-500' :
                    teamPosition === 'LOW_TEAM' ? 'bg-red-400/10 border-red-500' :
                        'bg-white-100/10 border-white-500'
        ) :
        'border-transparent';

    const positionColors = teamPosition === 'TOP_TEAM' ?
        'bg-green-500' :
        teamPosition === 'MID_TEAM' ?
            'bg-yellow-500' :
            teamPosition === 'LOW_TEAM' ?
                'bg-red-500' :
                'text-gray-500';

    return (
        <tr className={`text-xs text-center h-10 border-l-4 hover:bg-primary-500 ${highlightColors}`}>
            <td className="text-center text-xs">
                <p className={`h-6 m-auto aspect-square rounded-full text-primary-800 ${positionColors}  font-bold flex items-center justify-center`}>
                    {index + 1}
                </p>
            </td>
            <td className="text-left">
                <Image src={crest} width={18} alt={name} className="aspect-square object-contain float-left mr-2" />
                <p>{name}</p>
            </td>
            <td className="text-secondary-500">{matchesPlayed}</td>
            <td className="text-secondary-500">
                {`${goalDifference > 0 ? '+' : ''}${goalDifference}`}
            </td>
            <td className="text-secondary-500">{points}</td>
        </tr>
    )
};

export default Standing;