"use client";


import Image from "next/image";
import AltHeader from './AltHeader';
import { useParams } from 'next/navigation';
import { getHeaderLinks } from '../_utils/link';
import { MATCH_LINKS } from '../_assets/constants/match';

import { BsChevronLeft } from "react-icons/bs";

import { gql, useQuery } from '@apollo/client';
import { Match } from "@/types/global.type";
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';
import { useMemo } from 'react';
import { getDateFormat, getTimeFormat, getTimeRemaining } from '../_utils/dateTime';
import { MatchTimeRemaining } from "@/types/match.type";
import { getMatchTeamColors } from "../_utils/colors";

const query = gql`
  query GetMatchByID($id: ID!) {
    match(id: $id) {
      _id
      minute
      utcDate
      status

      timeRemaining {
        days
        hours
        minutes
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

const MatchHeader = () => {
  const { id } = useParams<{ id: string }>();
  const links = getHeaderLinks({ path: 'match', id, links: MATCH_LINKS });

  const { loading, error, data } = useQuery<{ match: Match }>(query, {
    variables: { id }
  });
  const time = useMemo(() => getTimeFormat(data?.match?.utcDate || ''), [data]);
  const date = useMemo(() => getDateFormat(data?.match?.utcDate || ''), [data]);
  const { timeUnit, timeRemainder } = useMemo(() => getTimeRemaining(data?.match.timeRemaining), [data]);

  const colors = useMemo(() => ({
    homeTeam: data ? getMatchTeamColors(data.match.homeTeam.clubColors) : [],
    awayTeam: data ? getMatchTeamColors(data.match.awayTeam.clubColors) : []
  }), [data]);

  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return null;
  
  return (
    <>
      <div className="relative p-4 grid grid-cols-5 m-3 mt-4 gap-2">
        <div
          style={{ background: `linear-gradient(90deg, ${colors.homeTeam[0] === colors.awayTeam[0] ? colors.homeTeam[1] : colors.homeTeam[0]}, ${colors.awayTeam[0]})` }}
          className="absolute top-0 left-0 w-full h-full opacity-30 rounded-md"
        ></div>
        <button className="absolute top-2 left-2 flex items-center justify-center w-4 h-4 rounded-full bg-black-900/50 hover:bg-secondary-900 text-secondary-400">
          <BsChevronLeft size={20} />
        </button>
        {
          /in_play|paused|finished/i.test(data.match.status) ?
            <p className={`absolute top-2 right-2 p-1 px-2 border-md bg-black-900/50 text-base font-semibold ${/in_play|paused/i.test(data.match.status) ? "text-highlight-400" : "text-secondary-500"} flex items-center gap-2`}>
              <span className={`w-1 h-[10px] ${/in_play|paused/i.test(data.match.status) ? "bg-highlight-400" : "bg-secondary-500"}`} />
              <span>{data.match.minute}</span>
            </p> :
            null
        }
        <div className="relative col-span-2 flex flex-col gap-2 items-center justify-center">
          <Image width={90} src={data.match.homeTeam.crest} className="aspect-square object-contain" alt="Clug Crest" />
          <h3 className="font-bold text-sm text-secondary-600">{data.match.homeTeam.name}</h3>
        </div>
        <div className="relative col-span-1 flex flex-col gap-2 items-center justify-center text-center">
          <div className="flex flex-col justify-center">
            {
              data.match.status === "TIMED" ?
                <p className="text-3xl font-bold">{time}</p> :
                <p className="text-[2rem] font-bold">
                  {
                    /(in_play|paused|finished)/i.test(data.match.status) ?
                      <span>
                        <span className="font-bold">{data.match.score.fullTime.home}</span> - <span className="font-bold">{data.match.score.fullTime.away}</span>
                      </span> :
                      data.match.status.substring(0, 4)
                  }
                </p>
            }
            {
              data.match.status !== "TIMED" && /(in_play|paused|finished)/i.test(data.match.status) ?
                <p className="text-sm mt-[-5px] text-secondary-600 font-semibold">
                  {`(${data.match.score.firstHalf.home} - ${data.match.score.firstHalf.away})`}
                </p> :
                null
            }
          </div>
          {
            Number(data.match.timeRemaining.days) >= 1 || !/(timed|in_play|paused)/i.test(data.match.status) ?
              <p className="text-sm text-secondary-600">{date}</p> :
              /(in_play|paused)/i.test(data.match.status) ?
                null :
                <p className="text-sm text-secondary-600">
                  <span>Starts in </span>
                  <span className="capitalize">{`${timeRemainder} ${timeUnit}`}</span>
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
