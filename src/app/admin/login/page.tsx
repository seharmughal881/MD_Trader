import LoginForm from "./LoginForm";

export default function LoginPage() {
  // Login details shown on the page for convenience. They reflect the configured
  // ADMIN_USERNAME / ADMIN_PASSWORD. ⚠️ Remove before a real public launch, or
  // anyone can sign in to the admin.
  const credentials = {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "admin",
  };

  return <LoginForm credentials={credentials} />;
}
