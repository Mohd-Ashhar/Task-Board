import { CheckSquare } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-900 text-white group-hover:bg-gray-700 transition-colors duration-200">
          <CheckSquare className="h-5 w-5" />
        </div>
        <span className="text-xl font-semibold tracking-tight text-gray-900">
          Task Board
        </span>
      </Link>

      {/* Auth Card */}
      <div className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}
