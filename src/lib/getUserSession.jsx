import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserSession() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) return null;

    // verifikasi token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return decoded; // { id_user, email, iat, exp }
  } catch (err) {
    return null;
  }
}
