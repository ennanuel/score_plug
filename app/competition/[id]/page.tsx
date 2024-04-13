"use client";

import { gql, useQuery } from '@apollo/client';
import { ErrorMessage, LoadingMessage, Standings } from '../../_components';
import { useParams } from 'next/navigation';
import { Competition } from '@/types/competition.type';
import { useMemo } from 'react';
import { getDateFormat } from '@/app/_utils/dateTime';

const QUERY = gql`
    query GetCompetitions($id: ID!) {
        competition(id: $id) {
            _id
            name
            emblem
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
`;

const CompetitionInfo = () => {
    const { id } = useParams();

    const { loading, error, data } = useQuery<{ competition: Competition }>(QUERY, { variables: { id } });

    const startDate = useMemo(() => getDateFormat(data?.competition?.currentSeason?.startDate || ''), [data]);
    const endDate = useMemo(() => getDateFormat(data?.competition?.currentSeason?.endDate || ''), [data]);

    if (loading) return <LoadingMessage />;
    else if (error) return <ErrorMessage />;
    else if (!data) return <div>Nothing was found</div>;

    return (
        <div className="mt-2">
            <h2 className="text-lg my-4">Standings</h2>
            <Standings competition={data.competition} />

            <h2 className="text-lg my-4">Details</h2>
            <div className="text-xs mt-2">
                <div className="flex justify-between items-end bg-primary-500 p-2">
                    <span className="text-gray-400">Region</span>
                    <span>{data.competition.area.name}</span>
                </div>
                <div className="flex justify-between items-end p-2">
                    <span className="text-gray-400">Teams</span>
                    <span>{data.competition.teams.length}</span>
                </div>
                <div className="flex justify-between items-end bg-primary-500 p-2">
                    <span className="text-gray-400">Start Date</span>
                    <span>{startDate}</span>
                </div>
                <div className="flex justify-between items-cente p-2">
                    <span className="text-gray-400">End Date</span>
                    <span>{endDate}</span>
                </div>
            </div>

        </div>
    )
};

export default CompetitionInfo
