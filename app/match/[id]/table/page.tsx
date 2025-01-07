"use client";

import { ErrorMessage, Standings } from "@/app/_components";
import { DetailsLoading } from "@/app/_components/loading";
import { gql, useQuery } from "@apollo/client"
import { useParams } from "next/navigation";


const QUERY = gql`
    query GetMatch($id: ID!) {
        match(id: $id) {
            homeTeam {
                _id
            }
            awayTeam {
                _id
            }
            competition {     
                _id
                name
                emblem
                type
                code

                teams {
                    _id
                }
                area {
                    name
                    flag
                }
                currentSeason {
                    startDate
                    endDate
                }
                standings {
                    stage
                    type
                    group
                    table {
                        position
                        team {
                            _id
                            name
                            crest
                        }
                        playedGames
                        form
                        won
                        draw
                        lost
                        points
                        goalsFor
                        goalsAgainst
                        goalDifference
                    }
                }
            }
        }
    }
`

export default function MatchCompetitionStandings() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(QUERY, { variables: { id } });

    if(loading) return <DetailsLoading />;
    else if(error) return <ErrorMessage />;

    return (
        <div>
            {
                data?.match ?
                <Standings competition={data.match.competition} teams={[data.match.homeTeam._id, data.match.awayTeam._id]} />:
                null
            }
        </div>
    )
}