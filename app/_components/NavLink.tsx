import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

const NavLink = ({ href, title, Icon, ActiveIcon, alert }: { href: string; title: string; Icon: IconType; ActiveIcon: IconType; alert: boolean; }) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link href={href} className={`relative h-[30px] flex items-center justify-center gap-2 px-3 rounded-md ${active ? 'bg-secondary-100 text-black-900 font-semibold' : 'bg-primary-100/10 text-secondary-600 hover:bg-primary-200/20 hover:text-white-200'}`}>
            {active ? <ActiveIcon /> : <Icon />}
            <span>{title}</span>
            {alert && <div className="absolute top-[-3px] left-[-3px] h-3 aspect-square rounded-full bg-highlight-400 border-2 border-primary-600" />}
        </Link>
    )
};

export default NavLink
