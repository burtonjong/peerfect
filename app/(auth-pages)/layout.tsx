export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-screen-xl flex-col items-start gap-12">
      {children}
    </div>
  );
}
