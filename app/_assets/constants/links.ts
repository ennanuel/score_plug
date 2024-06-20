import { AiFillHome, AiFillTrophy, AiOutlineHome, AiOutlineTrophy } from "react-icons/ai";
import { BsBarChart, BsBarChartFill } from "react-icons/bs";
import { GiSoccerBall } from "react-icons/gi";
import { MdOutlineSportsSoccer, MdStar, MdStarOutline } from "react-icons/md";

export const NAV_LINKS = [
    {
        title: "Home",
        href: "/",
        Icon: AiOutlineHome,
        ActiveIcon: AiFillHome,
        alert: false
    },
    {
        title: "Matches",
        href: "/matches",
        Icon: MdOutlineSportsSoccer,
        ActiveIcon: GiSoccerBall,
        alert: false
    },
    {
        title: "Competitions",
        href: "/competitions",
        Icon: AiOutlineTrophy,
        ActiveIcon: AiFillTrophy,
        alert: false
    },
    {
        title: "Predictions",
        href: "/predictions",
        Icon: BsBarChart,
        ActiveIcon: BsBarChartFill,
        alert: false
    },
    // {
    //     title: "Favorites",
    //     href: "/favorites",
    //     Icon: MdStarOutline,
    //     ActiveIcon: MdStar,
    //     alert: true
    // },
]