import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { username, email, password, alamat } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Semua field wajib diisi" }, { status: 400 });
    }

    // cek email sudah terdaftar atau belum
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email sudah terdaftar" }, { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan user baru
    const newUser = await prisma.users.create({
        data: {
            username,
            email,
            password: hashedPassword,
            alamat: alamat || null,
        },
    });

    const accessToken = jwt.sign(
        {id_user: newUser.id_user, email: newUser.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1d"}
    )
    const refreshToken = jwt.sign(
        {id_user: newUser.id_user, email: newUser.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "1d"}
    )

    await prisma.users.update({
        where: {id_user: newUser.id_user},
        data: {token: refreshToken}
    })

    // simpan token di cookie
    const response = NextResponse.json({ 
        message: "Registrasi berhasil dan login otomatis", 
        user: {
            id_user: newUser.id_user,
            username: newUser.username,
            email: newUser.email,
            alamat: newUser.alamat
        }
    }, { status: 201 });


    response.cookies.set("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60,
        path: "/"
    });
    response.cookies.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
        path: "/"
    });

    return response;
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
