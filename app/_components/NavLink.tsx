import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

const NavLink = ({ Icon, ActiveIcon, href, title, alert }: { Icon: IconType; ActiveIcon: IconType; href: string; title: string; alert: boolean; }) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link href={href} className={`h-10 md:h-6 rounded-full flex flex-col items-center justify-center gap-1 px-3 ${active ? 'bg-white-400 text-black-600 font-semibold' : 'text-white-700 hover:bg-white-100/10 hover:text-white-500'}`}>
            <span className="flex md:hidden items-center justify-center">
                {
                    active ? <ActiveIcon size={20} /> : <Icon size={20} />
                }
            </span>
            <div className="flex items-center justify-center gap-2">
                <span className="text-tiny md:text-xs font-semibold">{title}</span>
                {alert && <div className="absolute top-0 right-0 h-1 w-1 bg-green-400" />}
            </div>
        </Link>
    )
};

export default NavLink
