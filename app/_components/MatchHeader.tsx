"use client";

import { MdNotifications } from 'react-icons/md';
import { FaAngleLeft } from 'react-icons/fa';
import Image from "next/image";
import AltHeader from './AltHeader';
import { useParams } from 'next/navigation';
import { getHeaderLinks } from '../_utils/link';
import { MATCH_LINKS } from '../_assets/constants/match';

import { gql, useQuery } from '@apollo/client';
import { Match } from "@/types/match.type";
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';
import { useMemo } from 'react';
import { getDateFormat, getTimeFormat } from '../_utils/dateTime';
import Link from 'next/link';

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
        emblem
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
`;

const getTeamColors = (clubColors: string) => clubColors.split('/').map(color => color.replace(/\s+/ig, '').toLowerCase());

const MatchHeader = () => {
  const { id } = useParams<{ id: string }>();
  const links = getHeaderLinks({ path: 'match', id, links: MATCH_LINKS });

  const { loading, error, data } = useQuery<{ match: Match }>(query, {
    variables: { id }
  });
  const time = useMemo(() => getTimeFormat(data?.match?.utcDate || ''), [data]);
  const date = useMemo(() => getDateFormat(data?.match?.utcDate || ''), [data]);
  const [timeMeasurement, remainingTime] = useMemo(() => data ? Object.entries(data.match.timeRemaining).find(([key, value]) => Number(value) >= 1) || [] : [], [data]);

  const colors = useMemo(() => ({
    homeTeam: data ? getTeamColors(data.match.homeTeam.clubColors) : [],
    awayTeam: data ? getTeamColors(data.match.awayTeam.clubColors) : []
  }), [data]);

  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return null;
  
  return (
    <>
      <div className="flex items-center justify-between gap-2 m-3 pr-3">
        <button className="flex items-center justify-center">
          <FaAngleLeft />
        </button>
        <Image src={data.match.competition.emblem} alt={data.match.competition.name} width={50} height={50} className="object-contain" />
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-semibold">{data.match.competition.name}</h3>
          <p className='text-[.7em] text-secondary-700'>{data.match.competition.area.name}</p>
        </div>
        <MdNotifications size={20} />
      </div>
      <div className="relative p-4 grid grid-cols-5 m-3 mt-4 gap-2">
        <div
          style={{ background: `linear-gradient(90deg, ${colors.homeTeam[0] === colors.awayTeam[0] ? colors.homeTeam[1] : colors.homeTeam[0]}, ${colors.awayTeam[0]})` }}
          className="absolute top-0 left-0 w-full h-full opacity-30 rounded-md"
        ></div>
        <div className="relative col-span-2 flex flex-col gap-2 items-center justify-center">
          <Image width={90} src={data.match.homeTeam.crest} className="aspect-square object-contain" alt="Clug Crest" />
          <h3 className="font-bold text-sm text-secondary-600">{data.match.homeTeam.name}</h3>
        </div>
        <div className="relative col-span-1 flex flex-col items-center justify-center text-center">
          <p className="text-3xl font-bold">{time}</p>
          {
            Number(data.match.timeRemaining.days) >= 1 ?
              <p className="text-sm text-secondary-600">
                {date}
              </p> :
              <p className="text-sm text-secondary-600">
                <span>Starts in </span>
                <span className="capitalize">{Number(remainingTime) > 1 ? timeMeasurement : timeMeasurement?.replace(/s$/, '')} {remainingTime}</span>
              </p>
          }
        </div>
        <div className="relative col-span-2 flex flex-col gap-2 items-center justify-center">
          <Image width={90} src={data.match.awayTeam.crest} className="aspect-square object-contain" alt="Clug Crest" />
          <h3 className="font-bold text-sm text-secondary-600">{data.match.awayTeam.name}</h3>
        </div>
      </div>

      <AltHeader links={links} />
    </>
  )
}

export default MatchHeader
