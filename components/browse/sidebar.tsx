import { SidebarLink } from "@/components/ui/sidebar-link";

type SidebarProps = {
  skills: string[];
};

function Sidebar({ skills }: SidebarProps) {
  const sidebarLinks = [
    { name: "All Skills", href: "/dashboard/bros" },
    ...skills.map((skill) => ({
      name: skill,
      href: `/dashboard/browse/${skill.toLowerCase()}`,
    })),
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 space-y-4 border-r p-6">
      <nav className="space-y-1">
        {sidebarLinks.map((link) => (
          <SidebarLink key={link.href} name={link.name} href={link.href} />
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
