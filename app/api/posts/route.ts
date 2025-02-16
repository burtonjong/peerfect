import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // Supabase client creation

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  
  try {
    // Fetch posts
    const { data: posts, error } = await supabase.from("posts").select("*");
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
   

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const { title, body, skill, points } = await request.json();

    const { data, error: insertError } = await supabase
      .from("posts")
      .insert([{ title, body, author_id: user.id, skill, points }]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ data: {response: "Created post"} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

