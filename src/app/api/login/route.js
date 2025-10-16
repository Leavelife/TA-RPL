import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email dan password wajib diisi" }, { status: 400 });
    }

    // cari user berdasarkan email
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Email tidak ditemukan" }, { status: 404 });
    }

    // cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    // buat token JWT
    const accessToken = jwt.sign(
      { id_user: user.id_user, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    const refreshToken = jwt.sign(
      { id_user: user.id_user, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    await prisma.users.update({
        where: {id_user: user.id_user},
        data: {token: refreshToken}
    })
    // kirim cookie ke client
    const response = NextResponse.json({ 
        message: "Login berhasil", 
        user: {
            id_user: user.id_user,
            username: user.username,
            email: user.email
        }
    }, { status: 200 });

    response.cookies.set("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60, // 15 menit
        path: "/",
    });
  
    response.cookies.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 hari
        path: "/",
    });

    return response;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
