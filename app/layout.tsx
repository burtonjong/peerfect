import type { Metadata } from "next";
import { Gabarito, Inter } from "next/font/google";
import type React from "react";

import { ThemeProvider } from "next-themes";

import ClientSideComponent from "@/components/client-side-component";
import Footer from "@/components/footer";
import Header from "@/components/header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });
const gabarito = Gabarito({ subsets: ["latin"], variable: "--gabarito-font" });

export const metadata: Metadata = {
  title: "Peerfect - Connect with Skilled Peers",
  description:
    "Peerfect matches people with skills to those who need help. Learn, grow, and succeed together.",
};

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${gabarito.variable} ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <div className="flex min-h-screen flex-col">
            <ClientSideComponent>
              <Header />
            </ClientSideComponent>
            <main className="flex flex-1 flex-col items-center">
              <div className="flex w-full flex-1 flex-col items-center gap-20">
                <div className="flex h-full w-full max-w-screen-xl flex-1 flex-col gap-20 p-5">
                  {children}
                </div>
              </div>
            </main>
            <Footer className="relative z-10" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}