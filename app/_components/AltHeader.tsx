import AltNavLink from "./AltNavLink";

const AltHeader = ({ links }: { links: { title: string; href: string; }[] }) => {

    return (
        <ul className="flex px-3 border-b border-secondary-900/50 sticky top-[50px] z-[2] h-[40px] bg-primary-900">
            {links.map((link, index) => <AltNavLink key={index} {...link} />)}
        </ul>
    )
};

export default AltHeader
