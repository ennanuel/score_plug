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

const QUERY = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
      _id
      name
      crest
      area {
        name
        flag
      }
    }
  }
`

const TeamDetailsHeader = () => {
  const { id } = useParams<{ id: string }>();
  const links = getHeaderLinks({ path: 'team', id, links: TEAM_LINKS });

  const { loading, error, data } = useQuery<{ team: Team }>(QUERY, { variables: { id } });
  
  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return <div>Nothing was found</div>;

  return (
    <>
      <div className="py-4 pr-3 flex items-center gap-2 bg-gradient-to-r from-red-900/50 to-blue-900/50 m-2 rounded-lg p-2">
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
      <AltHeader links={links} />
    </>
  )
}

export default TeamDetailsHeader
