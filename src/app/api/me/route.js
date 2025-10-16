import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const token = req.cookies.get("access_token")?.value;
    if (!token) return NextResponse.json({ user: null });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await prisma.users.findUnique({
      where: { id_user: decoded.id_user },
      select: { id_user: true, username: true, email: true },
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ user: null });
  }
}
