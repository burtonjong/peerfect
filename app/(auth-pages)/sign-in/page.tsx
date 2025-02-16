import Link from "next/link";
import { redirect } from "next/navigation";

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const searchParams = await props.searchParams;
  return (
    <form className="mx-auto mt-12 flex min-w-96 max-w-96 flex-col">
      <h1 className="font-brand text-3xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="font-medium text-primary underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton
          pendingText="Signing In..."
          formAction={signInAction}
          className="text-md font-brand"
        >
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
