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
import { getDateFormat, getTimeFormat, getTimeRemaining } from '../_utils/dateTime';
import { getMatchTeamColors } from "../_utils/colors";
import { SocketContext } from "../SocketContext";
import { DetailsHeaderLoading } from "./loading";
import { MdArrowBack } from "react-icons/md";

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
  const { socketData } = useContext(SocketContext);

  const links = getHeaderLinks({ path: 'match', id, links: MATCH_LINKS });

  const { loading, error, data } = useQuery<{ match: Match }>(query, {
    variables: { id }
  });

  const matchData = useMemo(() => data?.match && ({ ...(data.match), ...(socketData.matches[data.match._id] || {}) }), [data, socketData]);

  const time = useMemo(() => getTimeFormat(data?.match?.utcDate || ''), [data]);
  const date = useMemo(() => getDateFormat(data?.match?.utcDate || ''), [data]);
  const { timeUnit, timeRemainder } = useMemo(() => getTimeRemaining(data?.match?.timeRemaining), [data]);

  const colors = useMemo(() => ({
    homeTeam: data ? getMatchTeamColors(data.match.homeTeam.clubColors) : [],
    awayTeam: data ? getMatchTeamColors(data.match.awayTeam.clubColors) : []
  }), [data]);

  if (error) return <ErrorMessage />
  
  return (
    <>
      {
        loading ?
          <DetailsHeaderLoading /> :
          matchData ?
            <div className="relative p-4 grid grid-cols-5 m-3 mt-4 gap-2">
              <div
                style={{ background: `linear-gradient(90deg, ${colors.homeTeam[0] === colors.awayTeam[0] ? colors.homeTeam[1] : colors.homeTeam[0]}, ${colors.awayTeam[0]})` }}
                className="absolute top-0 left-0 w-full h-full opacity-30 rounded-md"
              ></div>
              <button className="absolute top-2 left-2 flex items-center justify-center w-6 h-6 rounded-full bg-black-900/50 hover:bg-secondary-900 text-secondary-400">
                <MdArrowBack size={20} />
              </button>
              {
                /in_play|paused|finished/i.test(matchData.status) ?
                  <p className={`absolute top-2 right-2 p-1 px-2 border-md bg-black-900/50 text-base font-semibold ${/in_play|paused/i.test(matchData.status) ? "text-highlight-400" : "text-secondary-500"} flex items-center gap-2`}>
                    <span className={`w-1 h-[10px] ${/in_play|paused/i.test(matchData.status) ? "bg-highlight-400" : "bg-secondary-500"}`} />
                    <span>{matchData.minute}</span>
                  </p> :
                  null
              }
              <div className="relative col-span-2 flex flex-col gap-2 items-center justify-center">
                <Image width={90} src={matchData.homeTeam.crest} className="aspect-square object-contain" alt="Clug Crest" />
                <h3 className="font-bold text-sm text-secondary-600">{matchData.homeTeam.name}</h3>
              </div>
              <div className="relative col-span-1 flex flex-col gap-2 items-center justify-center text-center">
                <div className="flex flex-col justify-center">
                  {
                    matchData.status === "TIMED" ?
                      <p className="text-3xl font-bold">{time}</p> :
                      <p className="text-[2rem] font-bold">
                        {
                          /(in_play|paused|finished)/i.test(matchData.status) ?
                            <span>
                              <span className="font-bold">{matchData.score.fullTime.home}</span> - <span className="font-bold">{matchData.score.fullTime.away}</span>
                            </span> :
                            matchData.status.substring(0, 4)
                        }
                      </p>
                  }
                  {
                    matchData.status !== "TIMED" && /(in_play|paused|finished)/i.test(matchData.status) ?
                      <p className="text-sm mt-[-5px] text-secondary-600 font-semibold">
                        {`(${matchData.score.firstHalf.home} - ${matchData.score.firstHalf.away})`}
                      </p> :
                      null
                  }
                </div>
                {
                  Number(matchData.timeRemaining.days) >= 1 || !/(timed|in_play|paused)/i.test(matchData.status) ?
                    <p className="text-sm text-secondary-600">{date}</p> :
                    /(in_play|paused)/i.test(matchData.status) ?
                      null :
                      <p className="text-sm text-secondary-600">
                        <span>Starts in </span>
                        <span className="capitalize">{`${timeRemainder} ${timeUnit}`}</span>
                      </p>
                }
              </div>
              <div className="relative col-span-2 flex flex-col gap-2 items-center justify-center">
                <Image width={90} src={matchData.awayTeam.crest} className="aspect-square object-contain" alt="Clug Crest" />
                <h3 className="font-bold text-sm text-secondary-600">{matchData.awayTeam.name}</h3>
              </div>
            </div> :
            null
      }
      <AltHeader links={links} />
    </>
  )
}

export default MatchHeader
