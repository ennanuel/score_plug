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

const MatchHeader = () => {
  const { id } = useParams<{ id: string }>();
  const links = getHeaderLinks({ path: 'match', id, links: MATCH_LINKS });

  return (
    <>
      <div className="flex items-center justify-between gap-2 m-3 pr-3">
        <FaAngleLeft />
        <div className="h-6 aspect-square border-2 border-secondary-800"></div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-semibold">Premier League</h3>
          <p className='text-[.7em] text-secondary-700'>England</p>
        </div>
        <MdNotifications />
      </div>
      <div className="bg-gradient-to-r from-blue-900/50 to-red-900/50 p-4 grid grid-cols-5 m-3 mt-4 gap-2 rounded-md">
        <div className="col-span-2 flex flex-col gap-2 items-center justify-center">
          <Image width={90} src={barcelonaCrest} className="aspect-square object-contain" alt="Clug Crest" />
          <h3 className="font-bold text-sm text-secondary-600">FC Barcelona</h3>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center text-center">
          <p className="text-3xl font-bold">22:00</p>
          <p className="text-sm text-secondary-600">Starts in 2 hours</p>
        </div>
        <div className="col-span-2 flex flex-col gap-2 items-center justify-center">
          <Image width={90} src={liverpoolCrest} className="aspect-square object-contain" alt="Clug Crest" />
          <h3 className="font-bold text-sm text-secondary-600">Liverpool FC</h3>
        </div>
      </div>

      <AltHeader links={links} />
    </>
  )
}

export default MatchHeader
