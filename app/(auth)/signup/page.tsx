import SignUpForm from "@/components/SignUpForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUp() {
  return (
    <main className="flex min-h-screen bg-slate-200 items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
        </CardHeader>
        <SignUpForm />
      </Card>
    </main>
  );
}
