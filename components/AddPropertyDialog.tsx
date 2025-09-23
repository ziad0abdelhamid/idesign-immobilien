"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function AddPropertyDialog({ onRecordAdded }: { onRecordAdded: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location_city: "",
    location_address: "",
    property_type: "",
    rooms: "",
    ground_area: "",
    house_area: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setUploadProgress(0);
  };

  const handleSubmit = async () => {
    if (!files || files.length === 0) {
      alert("Please select at least one image");
      return;
    }

    setIsUploading(true);
    const imageUrls: string[] = [];
    const total = files.length;
    let uploaded = 0;

    try {
      for (const file of Array.from(files)) {
        const filePath = `properties/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("properties").upload(filePath, file);
        if (error) {
          console.error("Upload error:", error);
          alert("Failed to upload: " + file.name + "\n" + error.message);
          continue;
        }

        const { data } = supabase.storage.from("properties").getPublicUrl(filePath);
        imageUrls.push(data.publicUrl);
        uploaded++;
        setUploadProgress(Math.round((uploaded / total) * 100));
      }

      const { data, error } = await supabase.from("properties").insert([
        { ...form, price: Number(form.price), rooms: Number(form.rooms), ground_area: Number(form.ground_area), house_area: Number(form.house_area), images: imageUrls }
      ]);

      if (error) {
        console.error("Failed to add property:", error);
        alert("Failed to add property: " + error.message);
      } else {
        onRecordAdded();
        setForm({
          title: "",
          description: "",
          price: "",
          location_city: "",
          location_address: "",
          property_type: "",
          rooms: "",
          ground_area: "",
          house_area: "",
        });
        setFiles(null);
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error adding property");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Property</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>
        <form className="space-y-3">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="price" type="number" placeholder="Price (€)" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="location_city" placeholder="City" value={form.location_city} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="location_address" placeholder="Address" value={form.location_address} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="property_type" placeholder="Type" value={form.property_type} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="rooms" type="number" placeholder="Rooms" value={form.rooms} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="ground_area" type="number" placeholder="Ground area (m²)" value={form.ground_area} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="house_area" type="number" placeholder="House area (m²)" value={form.house_area} onChange={handleChange} className="w-full border p-2 rounded" />

          {/* Hidden input + Browse button */}
          <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
          <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline">Browse Images</Button>

          {/* Thumbnails */}
          <div className="flex gap-2 flex-wrap">
            {files && Array.from(files).map((file, i) => (
              <div key={i} className="relative w-16 h-16 border rounded flex items-center justify-center text-xs text-gray-600">
                {file.name}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          {isUploading && (
            <div className="w-full bg-gray-200 rounded h-2">
              <div className="bg-blue-500 h-2 rounded" style={{ width: `${uploadProgress}%` }} />
            </div>
          )}

          <Button type="button" onClick={handleSubmit} className="w-full" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
