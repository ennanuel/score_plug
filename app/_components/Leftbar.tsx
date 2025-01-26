"use client";

import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

import { Competition, Team } from "@/types/global.type";
import { loadImage } from "../_utils/competition";
import { CompetitionLoading } from "./loading";

import { BiCaretDown } from "react-icons/bi";
import ErrorSidebar from "./ErrorSidebar";

const QUERY = gql`
  query GetTopCompetitionsAndTeams {
    topCompetitions {
      _id
      name
      emblem
      area {
        name
        flag
      }
      recentMatches {
        hasLiveMatch
      }
    }
  }
`

const Leftbar = () => {
  const { loading, error, data } = useQuery<{ topCompetitions: Competition[], teams: { teams: Team[] } }>(QUERY);

  if (error) return <ErrorSidebar />

  return (
    <div className="flex flex-col col-span-1 gap-4">
      <div className="pb-2 pt-4 rounded-xl border border-transparent bg-white-100/10 flex flex-col gap-4">
        <h2 className="font-semibold text-white-300 text-xs px-4">Top Leagues</h2>
        {
          loading ?
            <CompetitionLoading size={5} small={true} /> :
            <ul className="flex flex-col">
              {
                data
                  ?.topCompetitions
                  ?.slice(0, 6)
                  ?.map((competition) => (
                    <li key={competition._id} className="">
                      <Link href={`/competition/${competition._id}`} className="flex items-center h-9 px-4 gap-4 hover:bg-white-100/10">
                        <Image loader={loadImage} src={competition.emblem || String(process.env.NEXT_IMAGE_URL)} width={20} height={20} alt={competition.name} className="w-4 aspect-square object-contain" />
                        <span className={`text-2xs ${competition.recentMatches.hasLiveMatch ? 'text-green-500' : 'text-white-600'}`}>{competition.name}</span>
                        {competition.recentMatches.hasLiveMatch ? <span className="-ml-2 bg-green-500 text-xs w-1 aspect-square rounded-md"></span> : null}
                      </Link>
                    </li>
                  ))
              }
            </ul>
        }
      </div>

      <div className="hidden lg:flex rounded-xl border border-transparent bg-white-100/10 flex-col">
        <Link href="/competitions" className="text-white-500 hover:text-white-600 flex items-center gap-3 p-4">
          <span className="font-semibold text-xs ">All Leagues</span>
          <BiCaretDown size={14} />
        </Link>
      </div>
    </div>
  )
}

export default Leftbar
