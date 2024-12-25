"use client";

import { useEffect, useState, useContext, useMemo } from "react";
import { FaAngleDown } from "react-icons/fa";
import { MdOutlinePerson, MdOutlineSettings, MdSearch } from "react-icons/md";
import { NAV_LINKS } from "../_assets/constants/links";
import NavLink from "./NavLink";
import { PiPlug } from "react-icons/pi";
import { SocketContext } from "../SocketContext";


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { socketData } = useContext(SocketContext);

  const navLinks = useMemo(() => NAV_LINKS.map((link) => (
    link.title == 'Matches' && Object.values(socketData.matches).some(match => match.scoreWasUpdated) ?
      { ...link, alert: true } :
      link
  )), [socketData]);

  useEffect(() => { 
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full py-2 gap-2">
      <div className="w-full max-w-[var(--max-width)] m-auto flex justify-between items-center">
        <div className="flex items-center gap-12">
          <div className="h-[50px] z-[2] font-bold text-lg border-secondary-900/50 text-white-100 flex items-center justify-start gap-3">
            <PiPlug size={24} /> 
            <span>ScorePlug</span>
          </div>
          <div className="flex items-center h-8 rounded-full bg-white-100/10">
            <label htmlFor="search" className="text-white-500 flex items-center justify-center w-8 aspect-square">
              <MdSearch size={16} />
            </label>
            <input 
              className="text-xs flex-1 bg-transparent border-none outline-none focus:outline-none text-white-500 placeholder:text-white-600 pr-2" 
              type="text" 
              id="search" 
              placeholder="Barcelona v Chelsea" 
            />
          </div>
        </div>
        <ul className="flex-1 flex items-stretch justify-end gap-4">
          <li className="w-8 aspect-square rounded-full bg-white-100/10 text-white-600 flex items-center justify-center">
            <MdOutlinePerson size={16} />
          </li>
          <li className="h-8 rounded-full bg-white-100/10 text-white-600 flex items-center justify-center gap-2 px-2">
            <MdOutlineSettings size={16} />
            <FaAngleDown size={12} />
          </li>
        </ul>
      </div>
      <nav className="sticky top-0 z-[1] w-full mt-2 m-auto max-w-[var(--max-width)]">
        <ul className={`flex items-center transition-transform w-fit ${scrolled && "lg:translate-x-[160px]"} gap-1`}>
          {
            navLinks.map((navLink, index) => (
              <li className=""><NavLink key={index} {...navLink} /></li>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default Header
