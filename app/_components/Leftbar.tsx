"use client";

import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";

import { Competition, Team } from "@/types/global.type";
import { loadImage } from "../_utils/competition";
import { CompetitionLoading } from "./loading";

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

    teams(limit: 10) {
      teams {
        _id
        name
        crest
        hasOngoingMatch
      }
    }
  }
`

const Leftbar = () => {
  const { loading, error, data } = useQuery<{ topCompetitions: Competition[], teams: { teams: Team[] } }>(QUERY);

  if (error) return <ErrorMessage />;

  return (
    <div className="col-span-1 sticky top-[50px] flex flex-col gap-2">
      <div className="border-b border-secondary-900/50 p-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-white-300">Top Leagues</h2>
          <Link href="/competitions" className="text-xs text-secondary-700 hover:text-secondary-500">More</Link>
        </div>
        {
          loading ?
            <CompetitionLoading size={5} small={true} /> :
            <ul className="flex mt-4 flex-col rounded-md overflow-hidden border border-secondary-900/50">
              {
                data?.topCompetitions?.slice(0, 6)?.map((competition) => (
                  <li key={competition._id} className="border-b border-secondary-900/50 last:border-none">
                    <Link href={`/competition/${competition._id}`} className="flex items-center justify-between py-2 px-3 gap-3">
                      <Image loader={loadImage} src={competition.emblem || String(process.env.NEXT_IMAGE_URL)} width={25} height={25} alt={competition.name} className="aspect-square object-contain" />
                      {competition.recentMatches.hasLiveMatch ? <span className="mr-[-5px] bg-highlight-500 text-xs w-[3px] h-[10px] rounded-md"></span> : null}
                      <span className={`text-sm font-semibold flex-1 ${competition.recentMatches.hasLiveMatch ? 'text-highlight-500' : 'text-secondary-600'}`}>{competition.name}</span>
                      <span className="text-secondary-700 text-xs">{competition.area.name}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
        }
      </div>

      
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-white-300">Top Teams</h2>
          <span className="text-xs text-secondary-700 hover:text-secondary-500">More</span>
        </div>
        {
          loading ?
            <CompetitionLoading size={8} small={true} /> :
            <ul className="flex mt-4 flex-col rounded-md overflow-hidden border border-secondary-900/50">
              {
                data?.teams?.teams?.map((team) => (
                  <li key={team._id} className="border-b border-secondary-900/50 last:border-nond">
                    <Link href={`/team/${team._id}`} className="flex items-center justify-between py-2 px-3 gap-3 hover:bg-secondary-900/50">
                      <Image src={team.crest || String(process.env.NEXT_IMAGE_URL)} width={25} height={25} alt={team.name} className="aspect-square object-contain" />
                      <span className="text-sm font-semibold text-secondary-600 flex-1">{team.name}</span>
                      {team.hasOngoingMatch ? <span className="w-2 h-2 aspect-square rounded-full bg-secondary-500" /> : null}
                    </Link>
                  </li>
                ))
              }
            </ul>
        }
      </div>
    </div>
  )
}

export default Leftbar
