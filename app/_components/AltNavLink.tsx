import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, title }: { href: string; title: string }) => {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link href={href} className={`relative group flex flex-col gap-4 items-center justify-center after:w-full after:h-[2px] after:rounded-t-full ${active ? 'after:bg-white-100' : 'hover:text-white-100'}`}>
            <span className={`${active ? 'text-white-300' : 'text-white-700 group-hover:text-white-600'} font-semibold text-xs`}>{title}</span>
        </Link>
    )
};

export default NavLink
