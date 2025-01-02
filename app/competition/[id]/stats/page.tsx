"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

import { Competition } from "@/types/global.type";
import { FaAngleRight } from "react-icons/fa6";
import Image from "next/image";
import { loadImage } from "@/app/_utils/competition";
import Link from "next/link";

const QUERY = gql`
  query GetCompetitionTeams($id: ID!) {
    competition(id: $id) {
      fullTeamStats {

        headTitle

        stats {
          title
          teams {
              _id
              name
              shortName
              tla
              crest
              position
              stat
          }
        }

      }
    }
  }
`

const CompetitionStats = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<{ competition: Competition }>(QUERY, { variables: { id }, fetchPolicy: 'no-cache' });

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex px-4 py-3 rounded-xl bg-white-100/10 gap-2">
        {
          ["All", "Top teams", "Worst teams"].map((item, index) => (
            <button key={item} className={`${index === 0 ? 'bg-white-100 text-black-900' : 'bg-white-100/10 text-white-600 hover:bg-white-100/20 hover:text-white-500'} flex items-center justify-center px-4 h-7 rounded-full`}>
              <span className="text-2xs font-semibold">{item}</span>
            </button>
          ))
        }
      </div>
      {
        data
          ?.competition
          ?.fullTeamStats
          ?.map(({ headTitle, stats }) => (
            <div key={headTitle} className="flex flex-col gap-4">
              <h2 className="px-2 font-semibold text-sm text-white-400">{headTitle}</h2>
              <div className="grid grid-cols-3 gap-4">
                {
                  stats.map(({ title, teams }) => (
                          
                    <div key={title} className="pb-0 flex flex-col rounded-xl overflow-hidden border border-transparent bg-white-100/10">
                      <div className="group p-4 flex items-center justify-between hover:bg-black-900/20">
                        <h3 className='text-xs font-semibold text-white-500'>{title}</h3>
                        <span className="flex items-center justify-center gap-2 text-white-700 group-hover:text-white-500">
                          <span className="text-2xs font-semibold opacity-0 group-hover:opacity-100">See all</span>
                          <FaAngleRight size={12} />
                        </span>
                      </div>
                      <ul className="flex flex-col px-4 pb-2">
                        {
                          teams.map(({ _id, stat, name, shortName, crest }, index) => (
                            <li key={_id} className="flex items-center gap-4 py-3 border-b border-white-100/10 last:border-transparent">
                              <span className="w-[2ch] text-2xs font-semibold text-white-500">{index + 1}</span>
                              <span className="flex-1 flex items-center gap-2">
                                <Image loader={loadImage} src={crest} height={40} width={40} alt={`${name} crest`} className="w-6 aspect-square object-contain" />
                                <Link href={`/team/${_id}`} className="text-2xs text-white-500 font-semibold hover:underline">{shortName}</Link>
                              </span>
                              <span className={`${index === 0 && (stat <= 10 ? 'bg-blue-300' : (stat > 10 && stat <= 20) ? 'bg-blue-400' : (stat > 20 && stat <= 30) ? 'bg-blue-500' : stat > 30 && stat <= 50 ? 'bg-blue-600' : 'bg-blue-700')} h-5 rounded-full flex items-center justify-center px-2 text-2xs font-semibold text-white-300`}>{stat}</span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default CompetitionStats
