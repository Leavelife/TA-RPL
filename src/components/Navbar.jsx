"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between px-5 md:px-15 py-4 bg-gray-800/50 text-white">
        <div className="flex items-center gap-8">
            <Link href="/" className="font-semibold text-lg">GAKTAU</Link>
            <Link href="/">Home</Link>
        </div>
        <div className="flex items-center gap-4">

            {status === "loading" ? (
            <span>Loading...</span>
            ) : session ? (
            <>
                <span className="text-sm md:block hidden">Welcome, {session.user.name}</span>
                <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-3 py-1 bg-transparent text-red-500 cursor-pointer"
                >
                Logout
                </button>
            </>
            ) : (
            <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="px-3 py-1 bg-transparent text-white cursor-pointer"
            >
                Sign in
            </button>
            )}
        </div>
    </nav>
  );
}
