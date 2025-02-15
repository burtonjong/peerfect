import type { Metadata } from "next";
import { Gabarito, Inter } from "next/font/google";
import type React from "react";

import { ThemeProvider } from "next-themes";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });
const gabarito = Gabarito({ subsets: ["latin"], variable: "--gabarito-font" });

export const metadata: Metadata = {
  title: "Peerfect - Connect with Skilled Peers",
  description:
    "Peerfect matches people with skills to those who need help. Learn, grow, and succeed together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${gabarito.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          {children}{" "}
        </ThemeProvider>
      </body>
    </html>
  );
}
