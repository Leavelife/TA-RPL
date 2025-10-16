import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    // Ambil cookie dari request
    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: "Token tidak ditemukan" }, { status: 401 });
    }

    // Validasi refresh token
    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return NextResponse.json({ message: "Token tidak valid atau kedaluwarsa" }, { status: 403 });
    }

    // Cek apakah refresh token masih terdaftar di DB
    const user = await prisma.users.findUnique({
      where: { id_user: payload.id_user },
    });

    if (!user || user.token !== refreshToken) {
      return NextResponse.json({ message: "Token tidak cocok dengan database" }, { status: 403 });
    }

    // Generate access token baru
    const newAccessToken = jwt.sign(
      { id_user: user.id_user, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // (Opsional) generate refresh token baru juga
    const newRefreshToken = jwt.sign(
      { id_user: user.id_user, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Update DB dengan refresh token baru
    await prisma.users.update({
      where: { id_user: user.id_user },
      data: { token: newRefreshToken },
    });

    // Simpan token baru ke cookie
    const response = NextResponse.json({
      message: "Access token diperbarui",
      user: {
        id_user: user.id_user,
        username: user.username,
        email: user.email,
      },
    });

    response.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60, // 15 menit
      path: "/",
    });

    response.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 hari
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Terjadi kesalahan server", error: error.message }, { status: 500 });
  }
}
