import { PLAYERS } from '@/app/_assets/constants/player';
import { ErrorMessage, LoadingMessage } from '@/app/_components';
import PlayerCard from '@/app/_components/PlayerCard';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import React from 'react';

import { Team } from "@/types/global.type";

const QUERY = gql`
  query GetTeamPlayers($id: ID!) {
    team(id: $id) {
      squad {
        _id
        name
        number
        position

        country {
          name
          flag
        }
      }
    }
  }
`;

const TeamPlayers = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<{ team: Team }>(QUERY, { variables: { id } });

  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return <div>Nothing was found!</div>;
  return (
    <ul className="grid grid-cols-5 gap-4 p-4">
      {
        PLAYERS.map((player, index) => (<li key={index}><PlayerCard {...player} /></li>))
      }
    </ul>
  )
}

export default TeamPlayers
