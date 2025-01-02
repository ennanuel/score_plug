"use client";

import Image from "next/image";

import { useParams } from 'next/navigation';
import AltHeader from './AltHeader';
import { getHeaderLinks } from '../_utils/link';
import { TEAM_LINKS } from '../_assets/constants/team';
import { gql, useQuery } from '@apollo/client';
import { Team } from '@/types/global.type';
import ErrorMessage from './ErrorMessage';
import { DetailsHeaderLoading } from './loading';
import { HiExternalLink } from 'react-icons/hi';

const QUERY = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
      _id
      name
      crest
      clubColors
      website

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
  
  if (error) return <ErrorMessage />;

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-[#191919] border border-transparent">
      {
        loading ?
          <DetailsHeaderLoading /> :
          data ?
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-4 p-6">
                <div className="flex items-center gap-3">
                  <Image src={data.team.crest} alt={`${data.team.name} crest`} width={40} height={40} className="w-10 aspect-square object-contain" />
                  <div className="flex flex-col">
                    <span className="text-xl text-white-100">{data.team.name}</span>
                    <span className="text-2xs text-white-700">{data.team.area.name}</span>
                  </div>
                </div>
                <a href={data.team.website} target="_blank" className="h-7 flex items-center justify-center gap-1 border border-white-100/20 px-3 rounded-full text-white-400 hover:bg-white-100/10 hover:border-transparent">
                  <span className="text-2xs font-semibold">Go to website</span>
                  <HiExternalLink size={14} />
                </a>
              </div>
            </div> :
            null
      }
      <AltHeader links={links} />
    </div>
  )
}

export default TeamDetailsHeader
