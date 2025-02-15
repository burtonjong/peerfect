import Footer from "@/components/footer";
import Header from "@/components/header";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex min-h-screen flex-col`}>
      <Header />
      <div className="flex w-full flex-1 flex-col items-start gap-12">
        {children}
      </div>
      <Footer />
    </div>
  );
}
