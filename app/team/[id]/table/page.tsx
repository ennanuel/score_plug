"use client";

import { Standings } from "@/app/_components";
import { DetailsLoading } from "@/app/_components/loading";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const QUERY = gql`
    query($id: ID!) {
        team(id: $id) {
            league {
                name
                code
                emblem
                type 
                standings {
                    stage
                    type
                    group
                    table {
                        team {
                            _id
                            name
                            shortName
                            tla
                            crest
                            matches(status: "FINISHED", limit: 5, sort: -1) {
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
                            }
                        }
                        position
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

export default function TeamTable() {

    const { id } = useParams();
    const { loading, error, data } = useQuery(QUERY, { variables: { id } });

    if(loading) return <DetailsLoading />;

    return (
        <div>
            <Standings competition={data?.team?.league} showOptions showCompetition />
        </div>
    )
}