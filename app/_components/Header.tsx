"use client";

import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { MdOutlinePerson, MdOutlineSettings, MdSearch } from "react-icons/md";
import { NAV_LINKS } from "../_assets/constants/links";
import NavLink from "./NavLink";
import { PiPlug } from "react-icons/pi";


const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { 
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 px-6 h-[50px] z-[2] flex-1 font-semibold border-r border-b border-secondary-900/50 bg-primary-900 text-white-100 flex items-center justify-start gap-3">
        <PiPlug size={25} /> 
        <span>ScorePlug</span>
      </div>
      <div className="flex items-stretch gap-4 px-4 h-[50px] bg-primary-900 border-b border-secondary-900/50">
        <div className="flex-1 opacity-0"></div>
        <div className='overflow-clip flex-2 flex items-stretch justify-start gap-2 border-x border-secondary-900/50 hover:bg-secondary-900/50'>
          <label htmlFor="search" className="text-white-500 flex items-center justify-center w-[50px] border-r border-secondary-900/50">
            <MdSearch />
          </label>
          <input 
            className="text-sm flex-1 bg-transparent border-none outline-none text-white-600 focus:text-white-200 pr-2" 
            type="text" 
            id="search" 
            placeholder="Barcelona v Chelsea" 
          />
        </div>
        <ul className="flex-1 flex items-stretch justify-end">
          <li className="w-[50px] border-r border-secondary-900/50 hover:bg-secondary-900/50 flex items-center justify-center">
            <MdOutlinePerson size={25} />
          </li>
          <li className="hover:bg-white-100/10 flex items-center justify-center gap-2 px-2">
            <MdOutlineSettings size={24} />
            <FaAngleDown />
          </li>
        </ul>
      </div>
      <nav className="sticky z-[1] h-[50px] top-0 border-b border-secondary-900/50 bg-primary-900">
        <ul className={`flex items-center justify-start transition-transform w-fit ${scrolled && "lg:translate-x-[150px]"}`}>
          {
            NAV_LINKS.map((navLink, index) => (
              <li className="border-r first:border-x border-secondary-900/50"><NavLink key={index} {...navLink} /></li>
            ))
          }
        </ul>
      </nav>
    </>
  )
}

export default Header
