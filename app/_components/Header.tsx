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
    <div className="sticky top-0 z-10 w-full">
      <div className="relative bg-[#191919] mb-[1px] z-10 w-full h-14 flex items-center justify-center">
        <div className="w-full max-w-[var(--max-width)] m-auto flex justify-between items-center">
          <div className="flex items-center gap-12">
            <span className="font-inter font-bold text-xl text-white-100">ScorePlug.</span>

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
      </div>
      <div className={`relative ${scrolled && 'lg:-translate-y-full'} transition-transform duration-300 bg-[#191919] flex items-center justify-center`}>
        <nav className="py-2 w-full m-auto max-w-[var(--max-width)]">
          <ul className={`flex items-center w-fit gap-1`}>
            {
              navLinks.map((navLink, index) => (
                <li key={index} className=""><NavLink {...navLink} /></li>
              ))
            }
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
