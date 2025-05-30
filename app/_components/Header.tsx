"use client";

import { useEffect, useState, useContext, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

import { FaAngleDown } from "react-icons/fa";
import { MdOutlinePerson, MdOutlineSettings } from "react-icons/md";

import NavLink from "./NavLink";
import Search from "./Search";

import { SocketContext } from "../SocketContext";

import { NAV_LINKS } from "../_assets/constants/links";


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
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="md:sticky md:top-0 z-10 w-full">
      <div className="relative z-[11] md:bg-[#191919] px-3 sm:px-4 w-full h-14 flex items-center justify-center">
        <div className="w-full max-w-[var(--max-width)] m-auto flex justify-between items-center gap-3">
          <div className="flex items-center gap-2 md:gap-12">
            <span className="hidden md:block font-inter font-bold text-xl text-white-100">ScorePlug.</span>
            <Link href="/" className="flex items-center justify-start md:hidden w-fit">
              <Image src="/android-chrome-192x192.png" alt="Site icon" width={40} height={40} className="w-8 max-w-8 min-w-8 h-8 max-h-8 aspect-square object-contain" />"
            </Link>
            <Search />
          </div>
          <ul className="flex items-stretch justify-end gap-2">
            <li title="Coming soon..." className="hidden sm:flex w-8 aspect-square rounded-full bg-white-100/10 hover:bg-white-100/20 text-white-600 items-center justify-center">
              <MdOutlinePerson size={16} />
            </li>
            <li title="Coming soon..." className="relative">
              <button 
                onClick={() => setShowOptions(!showOptions)}
                className={`${showOptions ? 'bg-[#212121] md:bg-white-100/20 text-white-100' : 'bg-[#191919] md:bg-white-100/10 hover:bg-white-100/20 text-white-600'} h-8 rounded-full flex items-center justify-center gap-2 px-2`}
              >
                <MdOutlineSettings size={16} />
                <FaAngleDown size={12} className={`${showOptions ? 'rotate-180' : ''} duration-300 transition-transform`} />
              </button>
              <div className={`${showOptions ? '' : 'opacity-0 pointer-events-none'} transtion-opacity duration-300 absolute top-[calc(100%_+_8px)] min-w-[200px] w-fit right-0 rounded-xl bg-[#252525] border border-transparent flex flex-col gap-3 p-3 shadow-lg shadow-black-900/50`}>
                <button className="group flex justify-between items-center gap-4 cursor-not-allowed">
                  <span className="font-bold text-sm text-white-600 group-hover:text-white-400">Dark mode</span>
                  <span className="h-5 bg-white-100/10 rounded-full p-1 flex items-center justify-center">
                    <span className="w-3 aspect-square h-3 rounded-full bg-black-900/50"></span>
                    <span className="w-3 aspect-square h-3"></span>
                  </span>
                </button>
                <button className="group flex justify-between items-center gap-4 cursor-not-allowed">
                  <span className="font-bold text-sm text-white-600 group-hover:text-white-400">Use mock data</span>
                  <span className="h-5 bg-white-100/10 rounded-full p-1 flex items-center justify-center">
                    <span className="w-3 aspect-square h-3 rounded-full bg-black-900/50"></span>
                    <span className="w-3 aspect-square h-3"></span>
                  </span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={`z-10 fixed bottom-0 left-0 w-full md:relative ${scrolled && 'lg:-translate-y-full'} px-2 sm:px-4 transition-transform duration-300 border-t border-black-900 bg-[#191919] flex items-center justify-center`}>
        <nav className="py-2 w-full m-auto max-w-[var(--max-width)]">
          <ul className="flex items-center w-full md:w-fit gap-3 md:gap-1">
            {
              navLinks.map((navLink, index) => (
                <li key={index} className="w-full md:w-fit">
                  <NavLink {...navLink} />
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
