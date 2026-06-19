import "server-only";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "md_session";

function sessionToken(): string {
  return process.env.AUTH_SECRET ?? "dev-secret";
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === sessionToken();
}

export async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

export async function createSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export function verifyCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME ?? "admin";
  const p = process.env.ADMIN_PASSWORD ?? "admin";
  return username === u && password === p;
}
