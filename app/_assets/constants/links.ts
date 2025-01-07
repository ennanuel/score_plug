import { FiHome } from "react-icons/fi";
import { GiSoccerBall, GiTrophy, GiTrophyCup } from "react-icons/gi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoAnalytics, IoAnalyticsOutline } from "react-icons/io5";
import { PiSoccerBallFill } from "react-icons/pi";

export const NAV_LINKS = [
    {
        title: "Home",
        href: "/",
        Icon: GoHome,
        ActiveIcon: GoHomeFill,
        alert: false
    },
    {
        title: "Matches",
        href: "/matches",
        Icon: GiSoccerBall,
        ActiveIcon: PiSoccerBallFill,
        alert: false
    },
    {
        title: "Competitions",
        href: "/competitions",
        Icon: GiTrophy,
        ActiveIcon: GiTrophyCup,
        alert: false
    },
    {
        title: "Predictions",
        href: "/predictions",
        Icon: IoAnalyticsOutline,
        ActiveIcon: IoAnalytics,
        alert: false
    }
]