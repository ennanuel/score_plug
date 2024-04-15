import { PLAYERS } from '@/app/_assets/constants/player';
import PlayerCard from '@/app/_components/PlayerCard';
import { gql } from '@apollo/client';
import React from 'react';

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
  return (
    <ul className="grid grid-cols-5 gap-4 p-4">
      {
        PLAYERS.map((player, index) => (<li key={index}><PlayerCard {...player} /></li>))
      }
    </ul>
  )
}

export default TeamPlayers
