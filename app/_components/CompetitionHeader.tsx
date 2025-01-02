"use client";

import { useMemo } from "react";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import AltHeader from './AltHeader';
import { getHeaderLinks } from '../_utils/link';
import { COMPETITION_LINKS } from '../_assets/constants/competition';
import { gql, useQuery } from '@apollo/client';
import ErrorMessage from "./ErrorMessage";

import { Competition } from "@/types/global.type";
import { loadImage } from "../_utils/competition";
import { DetailsHeaderLoading } from "./loading";
import { BsCaretDownFill } from "react-icons/bs";

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
      currentSeason {
        startDate
        endDate
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
    <div className="relative flex flex-col gap-4 rounded-lg bg-white-100/10 border border-transparent overflow-hidden">
      {
        loading ?
          <DetailsHeaderLoading /> :
          data ?
            <div className="flex items-center gap-2 p-6">
              <Image
                src={data.competition.emblem || String(process.env.NEXT_IMAGE_URL)}
                loader={loadImage}
                alt={`${data.competition.name} emblem`}
                height={60}
                width={60}
                className="w-14 max-h-14 aspect-square object-contain"
              />
              <div className="flex-1 flex-col">
                <p className="font-normal text-white-300">{data.competition.name}</p>
                <p className="text-xs text-white-600">{data.competition.area.name}</p>
              </div>
              <span className="flex items-center justify-center gap-2 px-3 h-7 rounded-full border border-white-100/10 text-white-500">
                <span className="text-xs">{(new Date(Number(data.competition.currentSeason.startDate))).getFullYear()}/{(new Date(Number(data.competition.currentSeason.endDate))).getFullYear()}</span>
                <BsCaretDownFill size={10} />
              </span>
            </div> :
            null
      }
      <AltHeader links={links} />
    </div>
  )
}

export default CompetitionHeader
