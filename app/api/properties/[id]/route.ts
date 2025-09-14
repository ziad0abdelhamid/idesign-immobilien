import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // <-- params is a Promise
) {
  const { id } = await params; // <-- await to get the id

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || "Property not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
