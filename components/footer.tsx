import Link from "next/link";

import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={`w-full bg-background px-4 py-6 text-xs ${className}`}>
      <div className="max-w-container mx-auto">
        <div className="border-t border-foreground/10 pt-0">
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div>© 2025 Peerfect. All rights reserved</div>

            <div className="flex items-center gap-4">
              <Link href="/sign-in" className="hover:underline">
                Sign in
              </Link>
              <Link href="/sign-up" className="hover:underline">
                Sign up
              </Link>
              <span className="hidden sm:inline">|</span>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:underline">
                Terms of Service
              </Link>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
