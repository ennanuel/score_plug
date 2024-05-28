"use client";

import { MdArrowBack, MdStarOutline } from 'react-icons/md';
import Image from "next/image";

import { useParams } from 'next/navigation';
import AltHeader from './AltHeader';
import { getHeaderLinks } from '../_utils/link';
import { TEAM_LINKS } from '../_assets/constants/team';
import { gql, useQuery } from '@apollo/client';
import { Team } from '@/types/global.type';
import ErrorMessage from './ErrorMessage';
import { useMemo } from 'react';
import { getMatchTeamColors } from '../_utils/colors';
import { DetailsHeaderLoading } from './loading';

const QUERY = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
      _id
      name
      crest
      clubColors

      area {
        name
        flag
      }
    }
  }
`

const TeamDetailsHeader = () => {
  const { id } = useParams();
  const links = getHeaderLinks({ path: 'team', id: String(id), links: TEAM_LINKS });

  const { loading, error, data } = useQuery<{ team: Team }>(QUERY, { variables: { id } });
  const teamColors = useMemo(() => getMatchTeamColors(data?.team?.clubColors || ''), [data]);
  
  if (error) return <ErrorMessage />;

  return (
    <>
      {
        loading ?
          <DetailsHeaderLoading /> :
          data ?
            <div className="relative mx-4 border border-secondary-900/50 rounded-md m-4">
              <div style={{ background: `linear-gradient(45deg, ${teamColors[0]}, ${teamColors[1]})` }} className="opacity-30 rounded-lg absolute top-0 left-0 w-full h-full" />
              <div className="relative py-4 pr-3 flex items-center gap-2 m-2 p-2">
                <button className="h-8 aspect-square rounded-full hover:bg-secondary-500/50">
                  <MdArrowBack size={20} />
                </button>
                <Image src={data.team.crest || String(process.env.NEXT_IMAGE_URL)} alt="Clug Emblem" width={80} className="aspect-square object-contain" />
                <div className="flex-1 flex-col">
                  <h2 className="font-bold text-lg">{data.team.name}</h2>
                  <div className="flex items-center gap-2">
                    <Image src={data.team.area.flag || String(process.env.NEXT_IMAGE_URL)} alt={data.team.name + ' crest'} width={20} className='aspect-square object-contain' />
                    <p className="text-sm text-secondary-600">{data.team.area.name}</p>
                  </div>
                </div>
                <MdStarOutline size={20} />
              </div>
            </div> :
            null
      }
      <AltHeader links={links} />
    </>
  )
}

export default TeamDetailsHeader
