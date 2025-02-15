import { Gabarito, Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";

import Footer from "@/components/footer";
import Header from "@/components/header";
import ClientSideComponent from "@/components/client-side-component";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
  variable: "--geist-font",
});

const gabarito = Gabarito({
  display: "swap",
  subsets: ["latin"],
  variable: "--gabarito-font",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${gabarito.variable}`}
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <ClientSideComponent>
              <Header />
            </ClientSideComponent>
            <main className="flex-1 flex min-h-screen flex-col items-center">
              <div className="flex w-full flex-1 flex-col items-center gap-20">
                <div className="flex max-w-5xl flex-col gap-20 p-5">
                  {children}
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
