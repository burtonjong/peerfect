import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    try {
      const supabase = await createClient();
      await supabase.auth.exchangeCodeForSession(code);

      // Check if the user's email is verified
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error retrieving user:", userError);
        return NextResponse.json({
          message: "Error retrieving user data.",
        });
      }

      if (
        user &&
        user.email_confirmed_at !== null &&
        user.email_confirmed_at !== ""
      ) {
        // Redirect to onboarding if email is verified

        let { data: enums } = await supabase.rpc("get_types", {
          enum_type: "skills_enum",
        });

        return NextResponse.redirect(
          `${origin}/dashboard/onboarding?enums=${encodeURIComponent(enums)}?userId=${user.id}`
        );
      } else {
        // Inform the user to verify their email
        return NextResponse.json({
          message: "Please verify your email to continue.",
        });
      }
    } catch (error) {
      console.error("Error in callback route:", error);
      return NextResponse.json({
        message: "An error occurred during the authentication process.",
      });
    }
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/dashboard`);
}
