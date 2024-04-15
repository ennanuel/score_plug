"use client";

import { ErrorMessage, LoadingMessage, TeamCard } from "@/app/_components";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

import { Competition } from "@/types/global.type";

const QUERY = gql`
  query GetCompetitionTeams($id: ID!) {
    competition(id: $id) {
      _id
      teams {
        _id
        name
        crest
      }
    }
  }
`

const CompetitionTeams = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<{ competition: Competition }>(QUERY, { variables: { id } });

  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return <div>Nothing was found</div>;

  return (
    <ul className="grid grid-cols-5 gap-4 p-4">
      {
        data.competition.teams.map((team, index) => (
          <li key={index}><TeamCard {...team} /></li>
        ))
      }
    </ul>
  )
}

export default CompetitionTeams
