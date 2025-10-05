"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen text-black bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {/* Form login pajangan */}
        <input
          type="text"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          disabled
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border rounded"
          disabled
        />

        {/* Tombol login dengan Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
