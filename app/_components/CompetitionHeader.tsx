"use client";

import { MdKeyboardArrowLeft, MdStar } from 'react-icons/md';
import premierLeagueEmblem from '../_assets/premier_league_emblem.png';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import AltHeader from './AltHeader';
import { getHeaderLinks } from '../_utils/link';
import { COMPETITION_LINKS } from '../_assets/constants/competition';

const CompetitionHeader = () => {
  const { id } = useParams<{ id: string }>();
  const links = getHeaderLinks({ path: 'competition', id, links: COMPETITION_LINKS });

  return (
    <>
      <div className="bg-gradient-to-r m-2 from-red-900/50 to-red-900/20 py-4 px-3 flex items-center gap-2 rounded-md">
        <button className="h-8 aspect-square rounded-full hover:bg-secondary-400/10">
          <MdKeyboardArrowLeft size={20} />
        </button>
        <Image src={premierLeagueEmblem} alt="Competition Emblem" width={60} className="aspect-square object-contain" />
        <div className="flex-1 flex-col">
          <p className="font-bold">Premier League</p>
          <p className="text-sm text-secondary-600">Spain</p>
        </div>
        <MdStar />
      </div>
      <AltHeader links={links} />
    </>
  )
}

export default CompetitionHeader
