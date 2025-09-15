import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(
  request: Request,
  context: any // 👈 use any so TypeScript won’t complain
) {
  const { id } = context.params; // safe at runtime, Next.js always passes params

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const propertyId = Number(id);
  if (Number.isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", propertyId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
