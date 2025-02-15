import Link from "next/link";

interface SidebarLinkProps {
  name: string;
  href: string;
}

export function SidebarLink({ name, href }: SidebarLinkProps) {
  return (
    <Link href={href} className="block py-2 text-sm hover:text-primary">
      {name}
    </Link>
  );
}
