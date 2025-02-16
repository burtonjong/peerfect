"use client";

import Link from "next/link";
import React from "react";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import { SmtpMessage } from "../smtp-message";

export default function Signup(props: { searchParams: Promise<Message> }) {
  const [message, setMessage] = React.useState<Message | null>(null);

  React.useEffect(() => {
    props.searchParams.then((params) => {
      if ("message" in params) {
        setMessage(params);
      }
    });
  }, [props.searchParams]);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await signUpAction(formData);
    setMessage({ message: "Please check your email to confirm your account." });
  };

  return (
    <>
      <form
        className="mx-auto flex min-w-96 max-w-96 flex-col"
        onSubmit={handleSignup}
      >
        <h1 className="font-brand text-3xl font-medium">Sign up</h1>
        <p className="text text-sm text-foreground">
          Already have an account?{" "}
          <Link className="font-medium text-primary underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="username">Username</Label>
          <Input name="username" placeholder="Mr. Calgary Hack" required />
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton
            pendingText="Signing up..."
            className="text-md font-brand"
          >
            Sign up
          </SubmitButton>
        </div>
      </form>
      {message && <FormMessage message={message} />}
      {/* <SmtpMessage /> */}
    </>
  );
}
