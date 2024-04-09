"use client";

import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { GiSoccerField } from "react-icons/gi";
import { MdOutlinePerson, MdOutlineSettings, MdSearch } from "react-icons/md";
import { NAV_LINKS } from "../_assets/constants/links";
import NavLink from "./NavLink";


const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { 
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-[-45px] z-[99999] border-b py-2 px-4 flex flex-col gap-2 border-secondary-900/50 bg-primary-500`}>
      <div className="flex items-center justify-between gap-4 px-4">
        <div className={`flex-1 font-semibold text-white-100 text-2xl flex items-center justify-start gap-3 transition-transform ${scrolled && 'translate-y-[38px]'}`}>
          <GiSoccerField /> 
          <span>Score Plug</span>
        </div>
        <div className='overflow-clip flex-1 flex items-stretch justify-start gap-2 bg-white-100/5 border border-secondary-100/10 hover:border-secondary-100/50 rounded-md'>
          <label htmlFor="search" className="text-white-500 flex items-center justify-center pl-2">
            <MdSearch />
          </label>
          <input 
            className="text-sm flex-1 bg-transparent border-none outline-none text-white-600 focus:text-white-200 h-[35px] pr-2" 
            type="text" 
            id="search" 
            placeholder="Barcelona v Chelsea" 
          />
        </div>
        <ul className="flex-1 flex items-center justify-end gap-4">
          <li className="aspect-square rounded-full border border-white-600 hover:bg-white-100/10 flex items-center justify-center p-1">
            <MdOutlinePerson size={24} />
          </li>
          <li className="rounded-2xl hover:bg-white-100/10 flex items-center justify-center py-1 px-2">
            <MdOutlineSettings size={24} />
            <FaAngleDown />
          </li>
        </ul>
      </div>
      <ul className={`flex items-center justify-start gap-3 px-6 transition-transform w-fit ${scrolled && "lg:translate-x-[130px]"}`}>
        {
          NAV_LINKS.map((navLink, index) => (
            <li><NavLink key={index} {...navLink} /></li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Header
