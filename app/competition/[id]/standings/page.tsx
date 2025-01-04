"use client";

import { Standings } from "@/app/_components";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

import { Competition } from "@/types/global.type";
import { DetailsLoading } from "@/app/_components/loading";

const QUERY = gql`
    query GetCompetitionTables($id: ID!) {
        competition(id: $id) {
            type
            code
            
            standings {
                stage
                type
                group
                table {
                    position
                    team {
                        _id
                        name
                        shortName
                        crest
                        matches(limit: 1, status: "TIMED") {
                            homeTeam {
                                _id
                                crest
                            }
                            awayTeam {
                                _id
                                crest
                            }
                        }
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
`



const CompetitionStandings = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery<{ competition: Competition }>(QUERY, { variables: { id } });

    if(loading) return <DetailsLoading />;

    return (
        <div className="">
            <Standings competition={data?.competition} showOptions />
        </div>
    )
};

export default CompetitionStandings;