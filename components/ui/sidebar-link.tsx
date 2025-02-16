"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

type SidebarLinkProps = {
  name: string;
  href: string;
};

export function SidebarLink({ name, href }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <motion.div
        className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {name}
        {isActive && (
          <motion.div
            className="absolute inset-y-0 left-0 w-1 rounded-full bg-blue-600 dark:bg-blue-400"
            layoutId="sidebar-indicator"
          />
        )}
      </motion.div>
    </Link>
  );
}
