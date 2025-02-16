
import React from "react";
import { SidebarLink } from "@/components/ui/sidebar-link";  
import Link from "next/link";

type SidebarProps = {
  skills: string[];
};

const Sidebar: React.FC<SidebarProps> = ({ skills }) => {
  const sidebarLinks = [
    { name: "All Skills", href: "/browse" },
    ...skills.map((skill) => ({
      name: skill,
      href: `/browse/${skill.toLowerCase()}`, 
    })),
  ];

  return (
    <aside className="w-64 border-r p-6 space-y-4 fixed top-16 left-0 h-[calc(100vh-4rem)]">
      <nav className="space-y-1">
        {sidebarLinks.map((link) => (
          <SidebarLink key={link.href} name={link.name} href={link.href} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
