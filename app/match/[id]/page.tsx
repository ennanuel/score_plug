"use client";

import React from 'react';
import Image from "next/image";
import { Match } from '@/types/global.type';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { ErrorMessage, NothingWasFound } from '@/app/_components';
import { loadImage } from '@/app/_utils/competition';
import { DetailsLoading } from '@/app/_components/loading';


const QUERY = gql`
  query GetMatchByID($id: ID!) {
    match(id: $id) {
      venue

      competition {
        _id
        name
        emblem 

        area {
          name
          flag
        }
      }

      referees {
        name
        type
        nationality
      }

    }
  }
`

const MatchInfo = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<{ match: Match }>(QUERY, {
    variables: { id }
  });

  if (loading) return <DetailsLoading />;
  else if (error) return <ErrorMessage />;
  else if (!data) return <NothingWasFound />;

  return (
    <div className='p-4'>
      <div className="relative overflow-clip flex flex-col p-4 gap-2 rounded-md border border-white-100/10">
        <Image
          src={data.match.competition.emblem || String(process.env.NEXT_IMAGE_URL)}
          loader={loadImage}
          alt={data.match.competition.name}
          height={150}
          width={150}
          className="object-contain opacity-50 blur-[50px] top-[50px] left-[-50px] absolute"
        />
        <div className="flex items-center gap-4">
          <Image
            src={data.match.competition.emblem || String(process.env.NEXT_IMAGE_URL)}
            loader={loadImage}
            alt={data.match.competition.name}
            height={40}
            width={40}
            className="object-contain"
          />
          <div className="flex flex-col flex-1 gap-1">
            <p className="font-semibold text-sm">{data.match.competition.name}</p>
            <div className="flex items-center gap-2">
              <Image
                src={data.match.competition.area.flag || String(process.env.NEXT_IMAGE_URL)}
                alt={data.match.competition.area.name}
                width={15}
                className="aspect-square object-cover rounded-full"
              />
              <p className="text-xs text-secondary-700">{data.match.competition.area.name}</p>
            </div>
          </div>
        </div>
        <hr className="border-none m-auto mt-2 bg-white-100/10 outline-none h-[1px] w-full" />
        <div className="flex items-center justify-between">
          <h3 className='font-semibold text-sm text-secondary-500 mt-2'>Match Venue</h3>
          <p className="text-xs text-secondary-800">{data.match.venue || 'Venue not available'}</p>
        </div>
      </div>

      <h3 className='font-semibold text-secondary-500 mt-6'>Referees</h3>
      <ul className="flex flex-col border border-white-100/5 mt-4">
        {
          data.match.referees.length > 0 ?
            data.match.referees.map((referee, index) => (
              <li key={index} className="p-4 py-3 bg-gradient-to-br border-b last:border-b-0 border-white-100/5 from-primary-500/40 to-primary-600 rounded-md flex flex-col gap-4 mt-2">
                  <p className="flex items-center justify-between">
                    <span className='text-sm text-secondary-600'>Name</span>
                    <span className="text-sm font-semibold">{referee.name}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className='text-sm text-secondary-600'>Nationality</span>
                    <span className="text-sm font-semibold">{referee.nationality}</span>
                  </p>
              </li>
            )) :
            <div className="flex items-center justify-center p-4 border text-sm font-semibold text-secondary-800 border-secondary-900/50 rounded-md">
              <span>Referees not available</span>
            </div>
        }
      </ul>
    </div>
  )
}

export default MatchInfo
