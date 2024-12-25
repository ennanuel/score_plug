import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

const NavLink = ({ href, title, Icon, alert }: { href: string; title: string; Icon: IconType; ActiveIcon: IconType; alert: boolean; }) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link href={href} className={`h-6 rounded-full flex items-center justify-center gap-2 px-3 ${active ? 'bg-white-400 text-black-600 font-semibold' : 'text-white-700 hover:bg-white-100/10 hover:text-white-500'}`}>
            <span className="text-xs font-semibold">{title}</span>
            {alert && <div className="absolute top-0 right-0 h-1 w-1 bg-white-400" />}
        </Link>
    )
};

export default NavLink
