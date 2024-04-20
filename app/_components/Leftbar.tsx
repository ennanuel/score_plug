"use client";

import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import LoadingMessage from "./LoadingMessage";
import ErrorMessage from "./ErrorMessage";

import { Competition, Team } from "@/types/global.type";

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

  if (loading) return <LoadingMessage />;
  else if (error) return <ErrorMessage />;
  else if (!data) return <div>Nothing was found!</div>;

  return (
    <div className="col-span-1 sticky top-[50px] p-4 flex flex-col gap-6">
      <div className="border border-secondary-900/50 p-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-white-300">Top Leagues</h2>
          <Link href="/competitions" className="text-xs text-secondary-700 hover:text-secondary-500">More</Link>
        </div>
        <ul className="flex flex-col gap-2">
          {
            data.topCompetitions.slice(0, 6).map((competition) => (
              <li key={competition._id}>
                <Link href={`/competition/${competition._id}`} className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
                  <div className="flex items-center gap-2">
                    <Image src={competition.emblem || String(process.env.NEXT_IMAGE_URL)} width={25} height={25} alt={competition.name} className="aspect-square object-contain" />
                    <span className={`text-sm ${competition.recentMatches.hasLiveMatch ? 'text-highlight-600' : 'text-secondary-600'}`}>{competition.name}</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-secondary-700 text-sm font-bold">{competition.area.name}</span>
                    {competition.recentMatches.hasLiveMatch ? <span className="bg-highlight-500 text-xs w-2 h-2 rounded-full"></span> : null}
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>

      
      <div className="border border-secondary-900/50 p-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-white-300">Top Teams</h2>
          <span className="text-xs text-secondary-700 hover:text-secondary-500">More</span>
        </div>
        <ul className="flex flex-col gap-2">
          {
            data.teams.teams.map((team) => (
              <li key={team._id}>
                <Link href={`/team/${team._id}`} className="flex items-center justify-between py-1 px-2 gap-3 hover:bg-black-900/50">
                  <Image src={team.crest || String(process.env.NEXT_IMAGE_URL)} width={25} height={25} alt={team.name} className="aspect-square object-contain" />
                  <span className="text-sm font-semibold text-secondary-600 flex-1">{team.name}</span>
                  {team.hasOngoingMatch ? <span className="w-2 h-2 aspect-square rounded-full bg-highlight-500" /> : null}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Leftbar
