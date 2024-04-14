"use client"

import { gql, useQuery } from '@apollo/client';
import { ErrorMessage, LoadingMessage, MatchHeader, MatchesContainer } from '../';
import { useParams } from 'next/navigation';

import { Match } from "@/types/global.type";

const QUERY = gql`
  query similarMatch($id: ID!) {
    match(id: $id) {
      _id
      minute
      status
      utcDate

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
        fullTime {
          home
          away
        }
      }
    }
  }
`

const MatchLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { id } = useParams();

  const { loading, error, data } = useQuery<{ match: { similarMatches: Match[] } }>(QUERY, { variables: { id } });

  return (
    <div className='border border-secondary-900/50'>
      <MatchHeader />
      {children}
      <section>
        <h3 className='font-semibold text-gray-400 mt-6 pt-2'>Similar Matches</h3>
        {
          loading ? 
            <LoadingMessage /> :
            error ?
              <ErrorMessage /> :
              !data ?
                <div>Nothing was found</div> :
                <MatchesContainer matches={data?.match?.similarMatches || []} />
        }
      </section>
    </div>
  )
}

export default MatchLayout
