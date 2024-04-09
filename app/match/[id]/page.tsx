"use client";

import React from 'react';
import { Match } from '@/types/match.type';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';


const query = gql`
  query GetMatchByID($id: ID!) {
    match(id: $id) {
      _id
      minute

      competition {
        _id
        name
        area {
          name
          flag
        }
      }

      homeTeam {
        _id
        name
        crest
      }
      awayTeam {
        _id
        name
        crest
      }

      score {
        firstHalf {
          home
          away
        }
        fullTime {
          home
          away
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
  const { loading, error, data } = useQuery<{ match: Match }>(query, {
    variables: { id }
  });

  console.log(data);

  return (
    <div className='mt-2 p-4'>
      <p className='text-center font-semibold text-secondary-500'>Referee</p>
      <div className="p-4 py-3 bg-gradient-to-br from-primary-500/40 to-primary-600 rounded-md flex flex-col gap-4 mt-2">
        <p className="flex items-center justify-between">
          <span className='text-sm text-secondary-600'>Name</span>
          <span className="text-sm font-semibold">Jorginho Rodriguez</span>
        </p>
        <p className="flex items-center justify-between">
          <span className='text-sm text-secondary-600'>Nationality</span>
          <span>County Flag</span>
          <span className="text-sm font-semibold">Italy</span>
        </p>
      </div>

      <div className="flex-col gap-2">
        <h3>Venue</h3>
        <p>Metro Politano, Italy</p>
      </div>
    </div>
  )
}

export default MatchInfo
