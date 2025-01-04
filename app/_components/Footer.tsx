import Link from "next/link";
import { FaGooglePlay } from "react-icons/fa6";
import { PiPlug } from "react-icons/pi";
import { RiFacebookFill, RiInstagramFill, RiLinkedinBoxFill, RiTiktokFill, RiTwitterXFill } from "react-icons/ri";
import { SiMusescore, SiTiktok, SiVimeo } from "react-icons/si";

const LINKS = [
  {
    title: "Matches",
    href: "/matches"
  },
  {
    title: "Competitions",
    href: "/competitions"
  },
  {
    title: "Predictions",
    href: "/predictions"
  },
  {
    title: "About developer",
    href: "/about"
  },
  {
    title: "FAQ",
    href: "/faq"
  },
  {
    title: "Source code",
    href: "/"
  },
  {
    title: "Home",
    href: "/"
  },
]


const Footer = () => {
  return (
    <footer className="bg-[#191919] mt-10 flex flex-col items-center justify-center">
      <div className="w-full px-3 sm:px-4 pt-10 pb-8 max-w-[var(--max-width)] grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-3">
        <div className="lg:col-span-1 flex flex-col gap-6 min-h-[160px]">
          <span className="flex items-end justify-start bg-green-400 text-black-900 w-10 aspect-square rounded-full">
            <PiPlug size={36} className="" />
          </span>
          <p className="max-w-[24ch] font-semibold text-[1.2rem] leading-[1.8rem] text-white-100">ScorePlug is the essential football app.</p>
        </div>
        <ul className="flex flex-col gap-3">
          {
            LINKS.map(({ title, href }) => (
              <li key={title} className="text-base font-semibold text-white-100 hover:underline">
                <Link href={href}>{title}</Link>
              </li>
            ))
          }
        </ul>
        <div className="flex flex-col gap-3 md:gap-6">
          <p className="text-base text-white-500">Other web apps</p>
          <div className="flex gap-6">
            <span className="w-10 aspect-square rounded-full bg-white-100/10 flex items-center justify-center text-white-100">
              <SiVimeo size={20} />
            </span>
            <span className="w-10 aspect-square rounded-full bg-white-100/10 flex items-center justify-center text-white-100">
              <FaGooglePlay size={20} />
            </span>
          </div>
        </div>
      </div>
      <div className="flex bg-white-100/5 w-full px-3 sm:px-4">
        <div className="pt-8 pb-10 m-auto w-full max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          <div className="gap-4 h-fit">
              <span className="text-2xs text-white-700 font-semibold">© Copyright {(new Date()).getFullYear()} ScorePlug.</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-2xs text-white-700 font-semibold">
              <span>Terms of use</span>
              <span>•</span>
              <span>Cookie policy</span>
              <span>•</span>
              <span>Privacy policy</span>
            </div>
            <p className="text-3xs text-white-800 max-w-[60ch]">The use of automatic services (robots, crawler, indexing etc.) as well as other methods for systematic or regular use is not permitted.</p>
          </div>
          <div className="flex items-center gap-6 h-fit">
            <span className="text-xs font-semibold text-white-400">Follow us</span>
            <div className="flex items-center gap-4">
              {
                [RiTiktokFill, RiInstagramFill, RiFacebookFill, RiLinkedinBoxFill, RiTwitterXFill]
                  .map((Icon, index) => (
                    <a href="#" key={index} target="_blank" className="flex items-center justify-center text-white-500 hover:text-white-600">
                      <Icon size={16} />
                    </a>
                  ))
              }
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
