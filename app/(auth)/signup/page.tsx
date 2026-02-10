"use client";

import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [state, action, isPending] = useActionState(signup, { message: "", error: {} });

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-lg font-semibold text-gray-900">Create an account</h2>
        <p className="text-sm text-gray-500 mt-0.5">Start managing your tasks today.</p>
      </div>

      {/* Form */}
      <form action={action}>
        <div className="px-6 py-4 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
            />
            {state.error?.email && <p className="text-xs text-red-500">{state.error.email[0]}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
            />
            {state.error?.password && <p className="text-xs text-red-500">{state.error.password[0]}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
            />
            {state.error?.confirmPassword && <p className="text-xs text-red-500">{state.error.confirmPassword[0]}</p>}
          </div>

          {state.error?.root && (
            <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2">
              <p className="text-xs text-red-600">{state.error.root[0]}</p>
            </div>
          )}
        </div>

        <div className="px-6 pb-6 space-y-3">
          <button
            type="submit"
            disabled={isPending}
            className="w-full h-10 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mx-auto" />
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-gray-900 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
