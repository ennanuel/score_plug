"use client";

import React from 'react';
import { Match } from '@/types/global.type';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { ErrorMessage, LoadingMessage } from '@/app/_components';


const query = gql`
  query GetMatchByID($id: ID!) {
    match(id: $id) {
      venue

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
  const { loading, error, data } = useQuery<{ match: Match }>(query, {
    variables: { id }
  });

  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return null;

  return (
    <div className='mt-2 p-4'>
      <ul className="flex flex-col gap-2">
        {
          data.match.referees.map((referee, index) => (
            <li key={index}>
              <p className='text-center font-semibold text-secondary-500'>Referee</p>
              <div className="p-4 py-3 bg-gradient-to-br from-primary-500/40 to-primary-600 rounded-md flex flex-col gap-4 mt-2">
                <p className="flex items-center justify-between">
                  <span className='text-sm text-secondary-600'>Name</span>
                  <span className="text-sm font-semibold">{referee.name}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className='text-sm text-secondary-600'>Nationality</span>
                  <span>County Flag</span>
                  <span className="text-sm font-semibold">{referee.nationality}</span>
                </p>
              </div>
            </li>
          ))
        }
      </ul>

      <div className="flex-col gap-2">
        <h3>Venue</h3>
        <p>{data.match.venue}</p>
      </div>
    </div>
  )
}

export default MatchInfo
