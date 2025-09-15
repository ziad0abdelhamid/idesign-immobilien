import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

interface Params {
  id?: string; // optional to validate later
}

export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  const { id } = params;

  // Validate that id exists
  if (!id) {
    return NextResponse.json(
      { error: "Property ID is required" },
      { status: 400 }
    );
  }

  // Fetch property from Supabase by matching ID
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id) // ensures it matches the DB's ID column
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Property not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
