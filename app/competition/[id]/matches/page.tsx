"use client";

import { useState } from "react";
import { DateAndStatusFilter, MatchesContainer } from '@/app/_components';
import { Match } from '@/types/global.type';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

const QUERY = gql`
    query CompetitionMatches($id: ID!, $from: String, $to: String) {
        competition(id: $id, ) {
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
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const { loading, error, data } = useQuery<{ competition: { matches: Match[] } }>(QUERY, { variables: { id, status, from: date } });

    return (
        <div className="p-2">
            <div className="flex flex-col gap-3 mt-4 p-2 border border-secondary-900/50">
                <DateAndStatusFilter setDate={setDate} setMatchStatus={setStatus} />
                <MatchesContainer matches={data?.competition?.matches} loading={loading} error={Boolean(error)} />
            </div>
        </div>
    )
};

export default CompetitionMatches