import { logout } from "@/app/actions/auth";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, CheckSquare } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white group-hover:bg-gray-700 transition-colors duration-200">
              <CheckSquare className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              Task Board
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {session?.email ? (
              <span className="text-xs text-gray-400 hidden sm:block">
                {String(session.email)}
              </span>
            ) : null}
            <form action={logout}>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {children}
      </main>
    </div>
  );
}
