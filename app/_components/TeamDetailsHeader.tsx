"use client";

import { FaAngleLeft } from 'react-icons/fa';
import { MdStarOutline } from 'react-icons/md';
import Image from "next/image";

import { useParams } from 'next/navigation';
import AltHeader from './AltHeader';
import { getHeaderLinks } from '../_utils/link';
import { TEAM_LINKS } from '../_assets/constants/team';
import { gql, useQuery } from '@apollo/client';
import { Team } from '@/types/global.type';
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';
import { useMemo } from 'react';
import { getMatchTeamColors } from '../_utils/colors';

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
  
  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return <div>Nothing was found</div>;

  return (
    <>
      <div className="relative">
        <div style={{ background: `linear-gradient(45deg, ${teamColors[0]}, ${teamColors[1]})`}} className="opacity-30 rounded-lg absolute top-0 left-0 w-full h-full" />
        <div className="relative py-4 pr-3 flex items-center gap-2 m-2 p-2">
          <button className="h-8 aspect-square rounded-full hover:bg-secondary-400/10">
            <FaAngleLeft size={20} />
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
      </div>
      <AltHeader links={links} />
    </>
  )
}

export default TeamDetailsHeader
