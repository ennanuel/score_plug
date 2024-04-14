"use client";

import { DateAndStatusFilter, LoadingMessage, ErrorMessage, MatchesContainer } from '@/app/_components';
import { Match } from '@/types/global.type';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';

const QUERY = gql`
    query CompetitionMatches($id: ID!, $from: String, $to: String) {
        competition(id: $id) {
            matches(from: $from, to: $to) {
                _id
                utcDate
                minute
                status
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

const CompetitionMatches = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery<{ competition: { matches: Match[] } }>(QUERY, { variables: { id } });

    if (loading) return <LoadingMessage />;
    else if (error) return <ErrorMessage />;
    else if (!data) return <div>Nothing was found</div>;

    return (
        <Suspense>
            <div className="p-2">
                <div className="flex flex-col gap-3 mt-4 p-2 border border-secondary-900/50">
                    <DateAndStatusFilter />
                    <MatchesContainer matches={data.competition.matches} />
                </div>
            </div>
        </Suspense>
    )
};

export default CompetitionMatches