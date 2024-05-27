"use client";

import { ErrorMessage, LoadingMessage, NothingWasFound } from '@/app/_components';
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
        firstName
        lastName
        name
        position
        dateOfBirth
        nationality
        shirtNumber
        marketValue
      }
    }
  }
`;

const TeamPlayers = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<{ team: Team }>(QUERY, { variables: { id } });

  if (error) return <ErrorMessage />;
  else if (!data) return <NothingWasFound />;
  
  return (
    <ul className="grid grid-cols-5 gap-4 p-4">
      {
        loading ?
          [1, 2, 3, 4, 5].map((num, index) => (
            <li key={index} className="flex flex-col gap-2 p-2 rounded-md bg-secondary-900/40">
              <div className="aspect-square rounded-full bg-secondary-900/50 animate-loadopacity"></div>
              <div className="h-4 max-w-[80%] rounded-md bg-secondary-900/50 animate-loadopacity"></div>
            </li>
          )) :
          data.team.squad.map((player, index) => (<li key={index}><PlayerCard {...player} /></li>))
      }
    </ul>
  )
}

export default TeamPlayers
