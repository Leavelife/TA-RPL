"use client";

import { useState, useEffect } from "react";
import {gsap} from "gsap";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [bubbles, setBubbles] = useState([]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validasi password match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Password dan konfirmasi password tidak sama");
      setLoading(false);
      return;
    }

    try {
      // Kirim hanya field yang diperlukan ke backend
      const { confirmPassword, ...dataToSend } = formData;
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Pendaftaran berhasil! Mengalihkan...");
        window.location.href = "/"; // redirect ke home page
      } else {
        setMessage(data.message || "Gagal mendaftar");
      }
    } catch (err) {
      setMessage("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    const randomBubbles = Array.from({ length: 10 }, () => ({
        x: `${Math.random() * 100}%`,
    }));
    setBubbles(randomBubbles);

    requestAnimationFrame(() => {
        // Background animasi — warna laut bergerak halus
        gsap.to(".bg-animate", {
            backgroundPosition: "200% center",
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "linear",
        });
  
        // Background animasi — warna laut bergerak halus
        gsap.to(".bg-animate", {
            backgroundPosition: "200% center",
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "linear",
        });
    
        // Animasi form masuk dari bawah
        gsap.from(".register-card", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.4,
        });
    
        // Logo muncul pelan
        gsap.from(".logo", {
            opacity: 0,
            scale: 0.8,
            duration: 1.5,
            ease: "back.out(1.7)",
        });
        const bubbles = gsap.utils.toArray(".bubble");
        gsap.to(bubbles, {
            y: -600,
            opacity: 0,
            duration: "random(6, 10)",
            repeat: -1,
            delay: "random(0, 5)",
            ease: "none",
        });
    })
  }, []);

  return (
    <div className="relative bg-animate min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#001D3D] via-[#003566] to-[#001D3D] bg-[length:200%_200%]">
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble absolute bottom-0 w-2 h-2 bg-white/30 rounded-full"
          style={{ left: b.x }}
        ></div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="register-card bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="logo text-2xl font-bold mb-6 text-center">Register Account</h2>
        <div>
          <span>Username</span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 rounded-sm bg-gray-200 focus:outline-none"
            />
        </div>
        <div>
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 rounded-sm bg-gray-200 focus:outline-none"
            />
        </div>
        <div>
          <span>Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 rounded-sm bg-gray-200 focus:outline-none"
            />
        </div>
        <div>
          <span>Confirm Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-2 mb-2 rounded-sm bg-gray-200 focus:outline-none"
            />
        </div>
        <div className="gap-1 flex mb-2">
          <input type="checkbox" onChange={() => setShowPassword((prev) => !prev)} /><p>Show Password</p>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#4292c6] p-2 rounded-md text-white shadow-md shadow-gray-400 ">{loading? "Memproses.." : "Register"}</button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#4292c6] underline">
            Sign In
          </a>
        </p>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </form>
    </div>
  );
}
