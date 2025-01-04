import AltNavLink from "./AltNavLink";

const AltHeader = ({ links }: { links: { title: string; href: string; }[] }) => {

    return (
        <ul className="flex px-4 lg:px-6 gap-6">
            {links.map((link, index) => <AltNavLink key={index} {...link} />)}
        </ul>
    )
};

export default AltHeader
