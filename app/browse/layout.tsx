"use client";

// Import the Sidebar component
import React, { useEffect, useState } from "react";

import Sidebar from "@/components/browse/sidebar";
import Header from "@/components/header";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await fetch(`${window.location.origin}/api/skills`);
      const data = await res.json();
      if (data && !data.error) {
        setSkills(data);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 pt-16">
        <Sidebar skills={skills} /> {/* Use Sidebar component */}
        <main className="ml-64 flex-1 p-8 pb-16">{children}</main>
      </div>
    </div>
  );
}
