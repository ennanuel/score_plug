import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, title }: { href: string; title: string }) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link href={href} className={`relative flex items-center justify-center px-2 text-sm mb-[-1px] border ${active ? 'border-secondary-900/50 border-b-primary-900' : 'border-transparent hover:bg-white-100/5'}`}>
            <span className={`${active ? 'text-secondary-500 font-semibold' : 'text-secondary-700'}`}>{title}</span>
        </Link>
    )
};

export default NavLink
