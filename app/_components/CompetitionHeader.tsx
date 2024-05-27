"use client";

import { useMemo } from "react";
import { MdArrowBack, MdKeyboardArrowLeft, MdStar } from 'react-icons/md';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import AltHeader from './AltHeader';
import { getHeaderLinks } from '../_utils/link';
import { COMPETITION_LINKS } from '../_assets/constants/competition';
import { gql, useQuery } from '@apollo/client';
import LoadingMessage from "./LoadingMessage";
import ErrorMessage from "./ErrorMessage";

import { Competition } from "@/types/global.type";
import { loadImage } from "../_utils/competition";
import { DetailsHeaderLoading } from "./loading";

const QUERY = gql`
  query GetCompetition($id: ID!) {
    competition(id: $id) {
      _id
      name
      emblem
      area {
        name
        flag
      }
    }
  }
`

const CompetitionHeader = () => {
  const { id } = useParams<{ id: string }>();
  const links = useMemo(() => getHeaderLinks({ path: 'competition', id, links: COMPETITION_LINKS }), [])

  const { loading, error, data } = useQuery<{ competition: Competition }>(QUERY, { variables: { id } });

  if (error) return <ErrorMessage />;

  return (
    <>
      {
        loading ?
          <DetailsHeaderLoading /> :
          data ?
            <div className="relative py-4 px-3 flex items-center gap-2 rounded-md overflow-clip border border-secondary-900/50 m-4">
              <Image
                src={data.competition.emblem || String(process.env.NEXT_IMAGE_URL)}
                loader={loadImage}
                alt=""
                width={150}
                className="aspect-square object-contain absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] blur-[40px]"
              />
              <button className="h-8 aspect-square rounded-full hover:bg-secondary-900/50">
                <MdArrowBack size={20} />
              </button>
              <Image
                src={data.competition.emblem || String(process.env.NEXT_IMAGE_URL)}
                loader={loadImage}
                alt={`${data.competition.name} emblem`}
                width={60}
                className="aspect-square object-contain"
              />
              <div className="flex-1 flex-col">
                <p className="font-bold">{data.competition.name}</p>
                <p className="text-sm text-secondary-600">{data.competition.area.name}</p>
              </div>
              <MdStar />
            </div> :
            null
      }
      <AltHeader links={links} />
    </>
  )
}

export default CompetitionHeader
