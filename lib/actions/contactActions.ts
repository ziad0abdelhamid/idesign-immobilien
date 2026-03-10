"use server";

import { supabase } from "@/lib/db/supabase";

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  language: string;
}) {
  try {
    const { error } = await supabase.from("contact_messages").insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        language: data.language,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Error submitting contact form:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
