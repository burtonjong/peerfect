import { UserPlus } from "lucide-react";
import Link from "next/link";


export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="sr-only">Peerfect</span>
          <UserPlus className="h-6 w-6 text-teal-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">
            Peerfect
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Testimonials
          </Link>
        </nav>
      </header>
  );
}
