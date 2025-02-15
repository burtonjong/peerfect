import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ClientSideComponent from "@/components/client-side-component";

import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
            <Footer className="relative z-10" />
          </div>
      </body>
    </html>
  )
}

