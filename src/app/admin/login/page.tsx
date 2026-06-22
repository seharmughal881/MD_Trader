import LoginForm from "./LoginForm";

// Read credentials at REQUEST time (not build time) so the details shown on the
// page always match what the login action actually accepts at runtime.
export const dynamic = "force-dynamic";

export default function LoginPage() {
  const credentials = {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "admin",
  };

  return <LoginForm credentials={credentials} />;
}
