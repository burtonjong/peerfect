import Sidebar from "@/components/browse/sidebar";
import { API_URL } from "@/utils/supabase/prodFlag";

const fetchSkills = async () => {
  try {
    const res = await fetch(`${API_URL}/api/skills`);
    const data = await res.json();
    if (data && !data.error) {
      return data;
    }
  } catch (error) {
    console.error("Error fetching skills:", error);
  }
  return [];
};

export default async function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const skills = await fetchSkills();
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 pt-16">
        <Sidebar skills={skills} />
        {children}
      </div>
    </div>
  );
}
