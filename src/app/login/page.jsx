'use client'
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import {gsap} from "gsap";


const Loginpage = () => {

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [bubbles, setBubbles] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage("Login berhasil! Mengalihkan...");
            window.location.href = "/"; // redirect ke home page
        } else {
            setMessage(data.message || "Login gagal");
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
            gsap.from(".login-card", {
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
        <div className="relative bg-animate min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-r from-[#001D3D] via-[#003566] to-[#001D3D] bg-[length:200%_200%]">
            <div className="absolute inset-0 overflow-hidden">
                {bubbles.map((b, i) => (
                <div
                    key={i}
                    className="bubble absolute bottom-0 w-2 h-2 bg-white/30 rounded-full"
                    style={{ left: b.x }}
                ></div>
                ))}
            </div>

            <div className="container flex justify-center items-center min-h-screen">
                <div className="login-card bg-white text-black p-10 flex flex-col items-center gap-5 rounded-lg shadow-neutral-800 w-96">
                    <p className="logo text-2xl font-bold">Welcome Back</p>
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="px-0 py-3 flex flex-col">
                            <span className="">Email</span>
                            <input className="bg-gray-200 p-2 rounded-sm focus:outline-none" type="text" name="email" placeholder="email" value={formData.email} onChange={handleChange} required/>
                        </div>
                        <div className="px-0 py-3 flex flex-col">
                            <span className="">Password</span>
                            <input className="bg-gray-200 p-2 rounded-sm focus:outline-none" type="text" name="password" placeholder="password" value={formData.password} onChange={handleChange} required/>
                        </div>
                        {message && <p className="text-red-500">{message}</p>}
                        <div className="flex flex-col gap-4 mt-4">
                            <button type="submit" disabled={loading} className="bg-[#4292c6] p-2 rounded-md text-white shadow-md shadow-gray-400 ">{loading? "Memproses.." : "Sign In"}</button>
                        </div>
                    </form>
                    <button onClick={() => signIn("google", {callbackUrl: "/" })} className="w-full cursor-pointer flex justify-center items-center gap-2 bg-[#ffffff] p-2 rounded-md text-black shadow-md border-1 border-stone-500"><FcGoogle />Sign In with Google</button>
                    <div className="">
                        <span>Don't have an account? </span>
                        <a href="/register" className="text-[#4292c6] underline">Register</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Loginpage;