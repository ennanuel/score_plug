import { FaAngleLeft } from 'react-icons/fa';
import { MdStarOutline } from 'react-icons/md';
import Image from "next/image";
import barcelonaCrest from "../_assets/barcelona_crest.png";
import { useParams } from 'next/navigation';
import AltHeader from './AltHeader';
import { getHeaderLinks } from '../_utils/link';
import { TEAM_LINKS } from '../_assets/constants/team';

const TeamDetailsHeader = () => {
  const { id } = useParams<{ id: string }>();
  const links = getHeaderLinks({ path: 'team', id, links: TEAM_LINKS });

  return (
    <>
      <div className="py-4 pr-3 flex items-center gap-2 bg-gradient-to-r from-red-900/50 to-blue-900/50 m-2 rounded-lg p-2">
        <button className="h-8 aspect-square rounded-full hover:bg-secondary-400/10">
          <FaAngleLeft size={20} />
        </button>
        <Image src={barcelonaCrest} alt="Clug Emblem" width={80} />
        <div className="flex-1 flex-col">
          <p className="font-bold">FC Barcelona</p>
          <p className="text-sm text-secondary-600">Spain</p>
        </div>
        <MdStarOutline size={20} />
      </div>
      <AltHeader links={links} />
    </>
  )
}

export default TeamDetailsHeader
