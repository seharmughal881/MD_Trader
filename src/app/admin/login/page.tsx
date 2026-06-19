import LoginForm from "./LoginForm";

export default function LoginPage() {
  // Show a credentials hint ONLY in development. In production (Vercel) this is
  // null, so the password never reaches the browser and nothing is exposed.
  const devHint =
    process.env.NODE_ENV !== "production"
      ? {
          username: process.env.ADMIN_USERNAME ?? "admin",
          password: process.env.ADMIN_PASSWORD ?? "admin",
        }
      : null;

  return <LoginForm devHint={devHint} />;
}
