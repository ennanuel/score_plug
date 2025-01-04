"use client";

import { useEffect, useState, useContext, useMemo } from "react";
import { FaAngleDown } from "react-icons/fa";
import { MdOutlinePerson, MdOutlineSettings, MdSearch } from "react-icons/md";
import { NAV_LINKS } from "../_assets/constants/links";
import NavLink from "./NavLink";
import { SocketContext } from "../SocketContext";


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
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
      <div className="relative bg-[#191919] px-2 sm:px-4 z-10 w-full h-14 flex items-center justify-center">
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
          <ul className="flex-1 hidden sm:flex items-stretch justify-end gap-2">
            <li title="Coming soon..." className="w-8 aspect-square rounded-full bg-white-100/10 hover:bg-white-100/20 text-white-600 flex items-center justify-center">
              <MdOutlinePerson size={16} />
            </li>
            <li title="Coming soon..." className="relative">
              <button 
                onClick={() => setShowOptions(!showOptions)}
                className={`${showOptions ? 'bg-white-100/20 text-white-100' : 'bg-white-100/10 hover:bg-white-100/20 text-white-600'} h-8 rounded-full flex items-center justify-center gap-2 px-2`}
              >
                <MdOutlineSettings size={16} />
                <FaAngleDown size={12} className={`${showOptions ? 'rotate-180' : ''} duration-300 transition-transform`} />
              </button>
              <div className={`${showOptions ? '' : 'opacity-0 pointer-events-none'} transtion-opacity duration-300 absolute top-[calc(100%_+_8px)] min-w-[200px] w-fit right-0 rounded-xl bg-[#252525] border border-transparent flex flex-col gap-3 p-3 shadow-lg shadow-black-900/50`}>
                <span className="group flex justify-between items-center gap-4">
                  <span className="font-bold text-sm text-white-600 group-hover:text-white-400">Dark mode</span>
                  <button className="h-5 bg-white-100/10 rounded-full p-1 flex items-center justify-center">
                    <span className="w-3 aspect-square h-3 rounded-full bg-black-900/50"></span>
                    <span className="w-3 aspect-square h-3"></span>
                  </button>
                </span>
                <span className="group flex justify-between items-center gap-4">
                  <span className="font-bold text-sm text-white-600 group-hover:text-white-400">Use mock data</span>
                  <button className="h-5 bg-white-100/10 rounded-full p-1 flex items-center justify-center">
                    <span className="w-3 aspect-square h-3 rounded-full bg-black-900/50"></span>
                    <span className="w-3 aspect-square h-3"></span>
                  </button>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={`relative ${scrolled && 'lg:-translate-y-full'} px-2 sm:px-4 transition-transform duration-300 border-t border-black-900 bg-[#191919] flex items-center justify-center`}>
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
