"use client";

import { MdNotifications } from 'react-icons/md';
import { FaAngleLeft } from 'react-icons/fa';
import Image from "next/image";
import AltHeader from './AltHeader';
import barcelonaCrest from "../_assets/barcelona_crest.png";
import liverpoolCrest from "../_assets/liverpool_crest.png";
import { useParams } from 'next/navigation';
import { getHeaderLinks } from '../_utils/link';
import { MATCH_LINKS } from '../_assets/constants/match';

import { gql, useQuery } from '@apollo/client';
import { Match } from "@/types/match.type";
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';
import { useMemo } from 'react';
import { getTimeFormat } from '../_utils/dateTime';

const query = gql`
  query GetMatchByID($id: ID!) {
    match(id: $id) {
      _id
      minute

      timeRemaining {
        days
        hours
        minutes
      }

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
        clubColors
      }
      awayTeam {
        _id
        name
        crest
        clubColors
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

    }
  }
`

const MatchHeader = () => {
  const { id } = useParams<{ id: string }>();
  const links = getHeaderLinks({ path: 'match', id, links: MATCH_LINKS });

  const { loading, error, data } = useQuery<{ match: Match }>(query, {
    variables: { id }
  });
  const time = useMemo(() => getTimeFormat(data?.match.utcDate || ''), [data]);
  const colors = useMemo(() => data && { homeTeamColor: data?.match.homeTeam.clubColors.split(' / ')[0].toLowerCase(), awayTeamColors: data.match.awayTeam.clubColors.split(' / ')[0].toLowerCase() }, [data]);

  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return null;

  return (
    <>
      <div className="flex items-center justify-between gap-2 m-3 pr-3">
        <FaAngleLeft />
        <div className="h-6 aspect-square border-2 border-secondary-800"></div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-semibold">{data.match.competition.name}</h3>
          <p className='text-[.7em] text-secondary-700'>{data.match.competition.area.name}</p>
        </div>
        <MdNotifications size={20} />
      </div>
      <div
        style={{ background: `linear-background(45deg, ${colors?.homeTeamColor}, ${colors?.awayTeamColors})` }}
        className="bg-gradient-to-r from-blue-900/50 to-red-900/50 p-4 grid grid-cols-5 m-3 mt-4 gap-2 rounded-md"
      >
        <div className="col-span-2 flex flex-col gap-2 items-center justify-center">
          <Image width={90} src={data.match.homeTeam.crest} className="aspect-square object-contain" alt="Clug Crest" />
          <h3 className="font-bold text-sm text-secondary-600">{data.match.homeTeam.name}</h3>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center text-center">
          <p className="text-3xl font-bold">{time}</p>
          <p className="text-sm text-secondary-600">
            Starts in {Object.values(data.match.timeRemaining).find((value) => (value as number) >= 1)} {Object.entries(data.match.timeRemaining).find(([key, value]) => (value as number) >= 1)?.slice(0, 1)}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-2 items-center justify-center">
          <Image width={90} src={data.match.awayTeam.crest} className="aspect-square object-contain" alt="Clug Crest" />
          <h3 className="font-bold text-sm text-secondary-600">{data.match.awayTeam.name}</h3>
        </div>
      </div>

      <AltHeader links={links} />
    </>
  )
}

export default MatchHeader
