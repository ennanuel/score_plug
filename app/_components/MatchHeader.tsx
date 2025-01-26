"use client";


import Image from "next/image";
import AltHeader from './AltHeader';
import { useParams } from 'next/navigation';
import { getHeaderLinks } from '../_utils/link';
import { MATCH_LINKS } from '../_assets/constants/match';

import { gql, useQuery } from '@apollo/client';
import { Match } from "@/types/global.type";
import ErrorMessage from './ErrorMessage';
import { useContext, useMemo } from 'react';
import { getDateFormat, getDay, getTimeFormat } from '../_utils/dateTime';
import { SocketContext } from "../SocketContext";
import { FaAngleLeft } from "react-icons/fa6";
import { AiOutlineSchedule } from "react-icons/ai";
import { TbSoccerField } from "react-icons/tb";
import { GiWhistle } from "react-icons/gi";
import { DetailsHeaderLoading } from "./loading";
import Link from "next/link";

const query = gql`
  query GetMatchByID($id: ID!) {
    match(id: $id) {
      _id
      minute
      utcDate
      status
      matchday
      head2head {
        aggregates {
          fullTime {
            homeTeam {
              wins
            }
            awayTeam {
              wins
            }
          }
        }
      }

      competition {
        _id
        emblem
        name
        area {
          name
        }
      }

      timeRemaining {
        days
        hours
        minutes
      }

      referees {
        _id
        name
      }

      homeTeam {
        _id
        name
        crest
        clubColors
        venue
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

const MatchHeader = () => {
  const { id } = useParams<{ id: string }>();
  const { socketData } = useContext(SocketContext);

  const { loading, error, data } = useQuery<{ match: Match }>(query, {
    variables: { id }
  });

  const links = useMemo(() => (
    getHeaderLinks({ path: 'match', id, links: MATCH_LINKS })
      .filter(({ href }) => (data?.match?.head2head?.aggregates?.fullTime?.homeTeam?.wins || data?.match?.head2head?.aggregates?.fullTime?.awayTeam?.wins) ? true : !/prediction|h2h/i.test(href))
  ), [data]);

  const matchData = useMemo(() => data?.match && ({ ...(data.match), ...(socketData.matches[data.match._id] || {}) }), [data, socketData]);

  const time = useMemo(() => getTimeFormat(String(data?.match?.utcDate)), [data]);
  const date = useMemo(() => getDateFormat(String(data?.match?.utcDate)), [data]);
  const day = useMemo(() => getDay(String(data?.match?.utcDate)), [data]);

  if(loading) return <DetailsHeaderLoading />
  else if (error) return <ErrorMessage />;
  else if (!matchData) return null;
  
  return (
    <div className="flex flex-col bg-white-100/10 border border-transparent rounded-xl">
      <div className="grid grid-cols-[30px,_1fr,_30px] sm:grid-cols-[120px,_1fr,_120px] p-4 pb-3 border-b border-white-100/10">
        <Link href="/matches" className="group flex items-center justify-start gap-2">
          <span className="flex items-center justify-center w-6 aspect-square rounded-full bg-white-100/10 text-white-500 group-hover:bg-white-100 group-hover:text-black-900">
            <FaAngleLeft size={12} />
          </span>
          <span className='text-xs font-semibold text-white-500 group-hover:underline hidden sm:inline-block'>Matches</span>
        </Link>
        <Link href={`/competition/${matchData.competition._id}`} className="group flex items-center justify-center gap-3">
          <Image src={matchData.competition.emblem} alt={`${matchData.competition.name} emblem`} width={20} height={20} className="w-4 max-h-4 aspect-square object-contain" />
          <span className="text-2xs md:text-sm font-normal text-white-400 group-hover:underline">{`${matchData.competition.name} Round ${matchData.matchday}`}</span>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-center px-4 border-b border-white-100/10 py-3 sm:py-0 sm:h-10">
        <span className="flex items-center justify-center gap-1 text-white-700">
          <AiOutlineSchedule size={14} />
          <span className="text-3xs whitespace-nowrap">{`${date}, ${time}`}</span>
        </span>
        <span className="flex items-center justify-center gap-1 text-white-700">
          <TbSoccerField size={14} />
          <span className="text-3xs whitespace-nowrap">{matchData.homeTeam.venue}, {matchData.competition.area.name}</span>
        </span>
        <span className="flex items-center justify-center gap-1 text-white-700">
          <GiWhistle size={14} />
          <span className="text-3xs whitespace-nowrap">
            {
              matchData.referees.length ?
                matchData.referees.map(({ name }) => name).join(', ') :
                "Referee unavailable"
            }
          </span>
        </span>
      </div>
      <div className="relative px-4 pt-6 pb-12 grid grid-cols-[1fr,_auto,_1fr] items-center justify-center gap-3 sm:gap-8">
        <Link href={`/team/${matchData.homeTeam._id}`} className="relative flex gap-2 items-center justify-end">
          <div className="flex-1 relative">
            <h3 className="absolute w-full top-1/2 -translate-y-1/2 right-0 font-normal text-base md:text-xl text-white-400 truncate text-right">{matchData.homeTeam.name}</h3>
          </div>
          <Image width={40} height={40} src={matchData.homeTeam.crest} className="w-8 max-h-8 aspect-square object-contain" alt={`${matchData.homeTeam.crest} crest`} />
        </Link>
        <div>
          {
            matchData.status !== 'TIMED' ?
              <div className="flex flex-col gap-2">
                <span className="flex items-center justify-center gap-1 text-lg md:text-[1.4rem]">
                  <span className="font-semibold text-white-400">{matchData.score.fullTime.home}</span>
                  <span className="font-semibold text-white-400">-</span>
                  <span className="font-semibold text-white-400">{matchData.score.fullTime.away}</span>
                </span>
                <span className={`text-2xs text-center md:text-xs font-normal ${matchData.status === 'IN_PLAY' ? 'text-green-400' : 'text-white-700'}`}>
                  {
                    /in_play|finished|paused/i.test(matchData.status) ?
                      matchData.minute === 'HT' || matchData.minute === 'FT' ? 
                        matchData.minute === 'HT' ? 
                          'Half time' : 
                          'Full time' : 
                        `${matchData.minute}'` :
                      matchData.status
                  }
                </span>
              </div>:
              <div className="flex flex-col items-center justify-center">
                <span className="font-semibold text-lg md:text-[1.4rem] text-white-400">{time}</span>
                <span className="text-2xs md:text-xs font-normal text-white-700">{day}</span>
              </div>
          }
        </div>
        <Link href={`/team/${matchData.awayTeam._id}`} className="relative flex gap-2 items-center justify-start">
          <Image width={40} height={40} src={matchData.awayTeam.crest} className="w-8 max-h-8 aspect-square object-contain" alt={`${matchData.awayTeam.crest} crest`} />
          <div className="flex-1 relative">
            <h3 className="absolute w-full top-1/2 -translate-y-1/2 left-0 font-normal text-base md:text-xl text-white-400 truncate">{matchData.awayTeam.name}</h3>
          </div>
        </Link>
      </div>
      <AltHeader links={links} />
    </div>
  )
}

export default MatchHeader
