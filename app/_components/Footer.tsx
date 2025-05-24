import Image from "next/image";
import Link from "next/link";
import { RiFacebookFill, RiInstagramFill, RiLinkedinBoxFill, RiTiktokFill, RiTwitterXFill } from "react-icons/ri";

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
    title: "Home",
    href: "/"
  },
  {
    title: "About developer",
    isOtherLink: true,
    href: "https://ezema.netlify.app"
  },
  {
    title: "GitHub",
    isOtherLink: true,
    href: "https://github.com/ennanuel/score_plug.git/"
  },
];

const OTHER_WEB_APPS = [
  {
    title: "Ridm",
    icon: "/ridm_logo.svg",
    href: "https://ridm.netlify.app"
  },
  {
    title: "Tekst",
    icon: "/tekst_logo.png",
    href: "https://tekst-live.netlify.app"
  }
]


const Footer = () => {
  return (
    <footer className="bg-[#191919] mt-10 flex flex-col items-center justify-center">
      <div className="w-full px-3 sm:px-4 pt-10 pb-8 max-w-[var(--max-width)] grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-3">
        <div className="lg:col-span-1 flex flex-col gap-6 min-h-[160px]">
          <Image src="/android-chrome-192x192.png" alt="Site Icon" width={48} height={48} className="w-10 aspect-square  object-contain" />
          <p className="max-w-[24ch] font-semibold text-[1.2rem] leading-[1.8rem] text-white-100">ScorePlug is the essential football app.</p>
        </div>
        <ul className="flex flex-col gap-3">
          {
            LINKS.map(({ title, href, isOtherLink }) => (
              <li key={title} >
                {
                  isOtherLink ?
                    <a href={href} target="_blank" className="text-base font-semibold text-white-100 hover:underline">{title}</a> :
                    <Link href={href} className="text-base font-semibold text-white-100 hover:underline">{title}</Link>
                }
              </li>
            ))
          }
        </ul>
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3 md:gap-4">
            <p className="text-base text-white-500">Other web apps</p>
            <div className="flex gap-4">
              {
                OTHER_WEB_APPS.map(({ icon, href, title }) => (
                  <a href={href} key={title} target="_blank" className="group flex items-center justify-center gap-2 h-10 aspect-square rounded-lg bg-white-100/5 hover:bg-white-100/10">
                    <Image src={icon} height={40} width={40} alt={title} className="w-6 h-auto" />
                  </a>
                ))
              }
            </div>
          </div>
          <p className="text-xs text-white-600">
            Developed by <a href="https://github.com/ennanuel" className="hover:underline text-white-100">Emmanuel Ezema</a>
          </p>
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
                [
                  { Icon: RiTiktokFill, href: "https://tiktok.com", title: "TikTok" }, 
                  { Icon: RiInstagramFill, href: "https://instagram.com/by.ezema", title: "Instagram" }, 
                  { Icon: RiFacebookFill, href: "https://facebook.com", title: "Facebook" },
                  { Icon: RiLinkedinBoxFill, href: "https://linkedin.com/in/ezema-emmanuel", title: "Linked in" }, 
                  { Icon: RiTwitterXFill, href: "https://x.com/nnanna-ezema", title: "Twitter" }
                ]
                  .map(({ Icon, href, title }) => (
                    <a href={href} title={title} key={title} target="_blank" className="flex items-center justify-center text-white-500 hover:text-white-600">
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
