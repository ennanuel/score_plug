import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

const NavLink = ({ href, title, Icon, ActiveIcon, alert }: { href: string; title: string; Icon: IconType; ActiveIcon: IconType; alert: boolean; }) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link href={href} className={`relative h-[50px] flex items-center justify-center gap-2 px-6 text-sm ${active ? 'bg-secondary-900/50 text-secondary-100 font-semibold' : 'bg-transparent text-secondary-700 hover:bg-primary-900/30 hover:text-secondary-500'}`}>
            {active ? <ActiveIcon size={15} /> : <Icon size={15} />}
            <span>{title}</span>
            {alert && <div className="absolute top-0 right-0 h-2 w-2 bg-highlight-400" />}
        </Link>
    )
};

export default NavLink
