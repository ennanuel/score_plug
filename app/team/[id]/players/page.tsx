"use client";

import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

import { Team } from "@/types/global.type";
import { IoPerson } from 'react-icons/io5';
import { DetailsLoading } from '@/app/_components/loading';

const QUERY = gql`
  query GetTeamPlayers($id: ID!) {
    team(id: $id) {
      coach {
        id
        name
        nationality
      }
      squad(excludeStartingEleven: false) {
        otherPlayers {
          _id
          name
          age
          nationality
          position {
            area
            specialty
          }
        }
      }
    }
  }
`;

const initialValues = {
  goalkeeper: [],
  defence: [],
  midfield: [],
  offence: []
}

const TeamPlayers = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<{ team: Team }>(QUERY, { variables: { id } });

  const squad = useMemo(() => data?.team ? [
    { title: "coach", players: [data.team.coach] }, 
    ...Object
      .entries(
        data
          .team
          .squad
          .otherPlayers
          .reduce((playersObj, player) => ({ ...playersObj, [player.position.area]: [player, ...playersObj[player.position.area]] }), initialValues)
      )
      .map(([key, value]) => ({ title: key, players: value }))
  ] : [], [data]);

  if(loading) return <DetailsLoading />

  return (
    <div className="flex flex-col gap-4">
      {
        squad.map(({ title, players }) => (
          <div key={title} className="rounded-xl py-4 px-3 sm:px-4 flex flex-col gap-4 bg-[#191919] border border-transparent">
            <h3 className='capitalize text-sm font-semibold text-white-100'>{/goalkeeper/.test(title) ? `${title}s` : title}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {
                players.map((player) => (
                  <li key={player._id ? player._id : player.id ? player.id : player.name} className="flex items-center p-4 sm:p-6 gap-4 bg-white-100/5 rounded-md">
                    <span className="w-10 aspect-square max-h-10 rounded-full bg-white-100/10 flex items-end justify-center overflow-hidden">
                      <IoPerson size={32} className='-mb-[2px] text-white-600' />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white-100">{player.name}</span>
                      <span className="text-2xs text-white-700 capitalize">{player?.position?.specialty}</span>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </div>
  );
}

export default TeamPlayers
