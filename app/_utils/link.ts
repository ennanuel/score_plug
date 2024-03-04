

export function getHeaderLinks({ path, id, links }: { path: string; id: string; links: { title: string; href: string }[] }) {
  const result = links.map(link => ({ ...link, href: `/${path}/${id}${link.href ? `/${link.href}` : ''}` }));
  return result;
}