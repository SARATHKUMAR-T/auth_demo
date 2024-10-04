import LoginForm from "@/components/LoginForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  return (
    <main className="flex min-h-screen bg-slate-200 items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <LoginForm />
      </Card>
    </main>
  );
}
