import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
    const supabase = await createClient();
const skill = request.nextUrl.searchParams.get('skill');
  
    try {
      let query = supabase.from("posts").select("*");
      
      if (skill) {
        query = query.eq('skill', skill);  // Filter posts by skill
      }
  
      const { data: posts, error } = await query;
  
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

  
