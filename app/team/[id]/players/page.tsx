"use client";

import { ErrorMessage, NothingWasFound } from '@/app/_components';
import PlayerCard from '@/app/_components/PlayerCard';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import React from 'react';

import { Team } from "@/types/global.type";
import { PlayerLoading } from '@/app/_components/loading';

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

  return (
    <div className="p-4">
      {
        loading ?
          <PlayerLoading size={11} /> :
          error ?
            <ErrorMessage /> :
            !data ?
              <NothingWasFound /> :
              <ul className="flex flex-col border border-secondary-900/50 rounded-md overflow-clip">
                {
                  data.team.squad.map((player, index) => <PlayerCard key={index} {...player} />)
                }
              </ul>
      }
    </div>
  );
}

export default TeamPlayers
