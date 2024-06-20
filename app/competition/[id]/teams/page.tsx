"use client";

import { ErrorMessage, LoadingMessage, TeamCard } from "@/app/_components";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

import { Competition } from "@/types/global.type";
import TeamsContainer from "@/app/_components/TeamsContainer";

const QUERY = gql`
  query GetCompetitionTeams($id: ID!) {
    competition(id: $id) {
      _id
      teams {
        _id
        name
        crest
        hasOngoingMatch
      }
    }
  }
`

const CompetitionTeams = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<{ competition: Competition }>(QUERY, { variables: { id } });

  return (
    <ul className="p-4">
      <TeamsContainer teams={data?.competition?.teams} loading={loading} error={Boolean(error)} />
    </ul>
  )
}

export default CompetitionTeams
