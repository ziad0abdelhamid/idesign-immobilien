import { supabase } from "@/lib/db/supabase";

/* ---------------- Properties ---------------- */

export async function createProperty(data: any) {
  const { data: property, error } = await supabase
    .from("properties")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return property;
}

export async function duplicateProperty(propertyId: string) {
  // Fetch the original property
  const { data: originalProperty, error: fetchError } = await supabase
    .from("properties")
    .select("*")
    .eq("id", propertyId)
    .single();

  if (fetchError) throw fetchError;
  if (!originalProperty) throw new Error("Property not found");

  // Only copy content fields, exclude system fields and id
  const propertyData = {
    title_en: originalProperty.title_en,
    title_ar: originalProperty.title_ar,
    title_de: originalProperty.title_de,
    description_en: originalProperty.description_en,
    description_ar: originalProperty.description_ar,
    description_de: originalProperty.description_de,
    price: originalProperty.price,
    area: originalProperty.area,
    bedrooms: originalProperty.bedrooms,
    location_en: originalProperty.location_en,
    location_ar: originalProperty.location_ar,
    location_de: originalProperty.location_de,
    facilities: originalProperty.facilities,
    floor: originalProperty.floor,
    view: originalProperty.view,
    maintenance: originalProperty.maintenance,
    maintenance_type: originalProperty.maintenance_type,
    maintenance_percentage: originalProperty.maintenance_percentage,
    has_pool: originalProperty.has_pool,
    date_of_completion: originalProperty.date_of_completion,
    object_number: originalProperty.object_number,
    load_factor: originalProperty.load_factor,
    cash_discount: originalProperty.cash_discount,
    down_payments: originalProperty.down_payments,
    display_order: (originalProperty.display_order || 0) + 1,
  };

  // Create new property with copied data
  const { data: newProperty, error: createError } = await supabase
    .from("properties")
    .insert([propertyData])
    .select()
    .single();

  if (createError) throw createError;

  // Copy images from original property
  const { data: originalImages, error: imagesError } = await supabase
    .from("property_images")
    .select("*")
    .eq("property_id", propertyId);

  if (imagesError) {
    console.error("Error fetching images:", imagesError);
  } else if (originalImages && originalImages.length > 0) {
    // Insert copies of images for new property
    const imagesToInsert = originalImages.map((img) => ({
      property_id: newProperty.id,
      image_url: img.image_url,
      display_order: img.display_order,
    }));

    const { error: imageInsertError } = await supabase
      .from("property_images")
      .insert(imagesToInsert);

    if (imageInsertError) {
      console.error("Error copying images:", imageInsertError);
    }
  }

  return newProperty;
}

export async function updateProperty(id: string, data: any) {
  const { error } = await supabase.from("properties").update(data).eq("id", id);

  if (error) throw error;
}

export async function deleteProperty(id: string) {
  await supabase.from("property_images").delete().eq("property_id", id);
  await supabase.from("properties").delete().eq("id", id);
}

/* ---------------- Images ---------------- */

export async function uploadImages(propertyId: string, files: File[]) {
  for (let i = 0; i < files.length; i++) {
    const path = `${propertyId}/${crypto.randomUUID()}`;

    await supabase.storage.from("properties").upload(path, files[i]);

    const { data } = supabase.storage.from("properties").getPublicUrl(path);

    await supabase.from("property_images").insert({
      property_id: propertyId,
      image_url: data.publicUrl,
      display_order: i,
    });
  }
}

export async function deleteImage(image: any) {
  const path = image.image_url.split("/properties/")[1];

  await supabase.storage.from("properties").remove([path]);
  await supabase.from("property_images").delete().eq("id", image.id);
}

export async function reorderImages(images: any[]) {
  for (let i = 0; i < images.length; i++) {
    await supabase
      .from("property_images")
      .update({ display_order: i })
      .eq("id", images[i].id);
  }
}
