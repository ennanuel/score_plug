"use client";

import { DateAndStatusFilter, MatchesContainer } from "@/app/_components/";
import { gql, useQuery } from "@apollo/client"
import { useParams } from "next/navigation";
import { Team } from "@/types/global.type";

const QUERY = gql`
    query GetTeamMatches($id: ID!) {
        team(id: $id) {
            matches {
                _id
                minute
                utcDate
                status

                competition {
                    _id
                    name
                    emblem
                    area {
                        name
                        flag
                    }
                }

                homeTeam {
                    _id
                    name
                    crest
                }

                awayTeam {
                    _id
                    name
                    crest
                }

                score {
                    fullTime {
                        home
                        away
                    }
                }
            }
        }
    }
`

const TeamMatches = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery<{ team: Team }>(QUERY, { variables: { id } });
    
    return (
        <div className="p-2 flex flex-col gap-4">
            <DateAndStatusFilter />
            <MatchesContainer loading={loading} error={Boolean(error)} matches={data?.team?.matches} />
        </div>
    )
}

export default TeamMatches