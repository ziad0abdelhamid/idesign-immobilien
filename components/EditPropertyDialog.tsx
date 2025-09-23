"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function EditPropertyDialog({
  record,
  onRecordUpdated,
}: {
  record: any;
  onRecordUpdated: () => void;
}) {
  const [form, setForm] = useState(record);
  const [newFiles, setNewFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFiles(e.target.files);
    setUploadProgress(0);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...form.images];
    updatedImages.splice(index, 1);
    setForm({ ...form, images: updatedImages });
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    let imageUrls = form.images || [];

    try {
      if (newFiles && newFiles.length > 0) {
        const total = newFiles.length;
        let uploaded = 0;

        for (const file of Array.from(newFiles)) {
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
      }

      const { error } = await supabase
        .from("properties")
        .update({
          ...form,
          price: Number(form.price),
          rooms: Number(form.rooms),
          ground_area: Number(form.ground_area),
          house_area: Number(form.house_area),
          images: imageUrls,
        })
        .eq("id", form.id);

      if (error) {
        console.error("Failed to update property:", error);
        alert("Failed to update property: " + error.message);
      } else {
        onRecordUpdated();
        setNewFiles(null);
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error updating property");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>
        <form className="space-y-3">
          <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="location_city" value={form.location_city} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="location_address" value={form.location_address} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="property_type" value={form.property_type} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="rooms" type="number" value={form.rooms} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="ground_area" type="number" value={form.ground_area} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="house_area" type="number" value={form.house_area} onChange={handleChange} className="w-full border p-2 rounded" />

          {/* Hidden input + Browse button */}
          <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
          <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline">Browse Images</Button>

          {/* Existing + new thumbnails */}
          <div className="flex gap-2 flex-wrap">
            {form.images?.map((img: string, i: number) => (
              <div key={i} className="relative w-16 h-16 border rounded overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
            {newFiles && Array.from(newFiles).map((file, i) => (
              <div key={i} className="relative w-16 h-16 border rounded overflow-hidden flex items-center justify-center text-xs text-gray-600">
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
            {isUploading ? "Uploading..." : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
