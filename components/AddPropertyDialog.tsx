"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { Level } from "@tiptap/extension-heading";

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

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: form.description,
    immediatelyRender: false,
    onUpdate: ({ editor }) => setForm((prev) => ({ ...prev, description: editor.getHTML() })),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setUploadProgress(0);
  };

  const handleSubmit = async () => {
    if (!files || files.length === 0) return alert("Please select at least one image");
    setIsUploading(true);

    const imageUrls: string[] = [];
    let uploaded = 0;

    try {
      for (const file of Array.from(files)) {
        const filePath = `properties/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("properties").upload(filePath, file);
        if (error) { alert(`Failed to upload ${file.name}`); continue; }
        const { data } = supabase.storage.from("properties").getPublicUrl(filePath);
        imageUrls.push(data.publicUrl);
        uploaded++;
        setUploadProgress(Math.round((uploaded / files.length) * 100));
      }

      const { error } = await supabase.from("properties").insert([{
        ...form,
        price: Number(form.price),
        rooms: Number(form.rooms),
        ground_area: Number(form.ground_area),
        house_area: Number(form.house_area),
        images: imageUrls,
      }]);

      if (error) alert("Failed to add property: " + error.message);
      else {
        onRecordAdded();
        setForm({ title: "", description: "", price: "", location_city: "", location_address: "", property_type: "", rooms: "", ground_area: "", house_area: "" });
        setFiles(null);
        editor?.commands.clearContent();
      }
    } catch (err) { alert("Unexpected error"); console.error(err); }
    finally { setIsUploading(false); setUploadProgress(0); }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Property</Button>
      </DialogTrigger>
      <DialogContent className="max-w-full w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>

        <form className="space-y-3 flex flex-col">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="price" type="number" placeholder="Price (€)" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="location_city" placeholder="City" value={form.location_city} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="location_address" placeholder="Address" value={form.location_address} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="property_type" placeholder="Type" value={form.property_type} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="rooms" type="number" placeholder="Rooms" value={form.rooms} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="ground_area" type="number" placeholder="Ground area (m²)" value={form.ground_area} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="house_area" type="number" placeholder="House area (m²)" value={form.house_area} onChange={handleChange} className="w-full border p-2 rounded" />

          {/* Rich Text Editor */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">Description</label>
            {editor && (
              <div className="flex flex-wrap gap-2 mb-2 border rounded p-2 bg-gray-50 overflow-x-auto">
                {/* Toolbar buttons here, same as your original code */}
                <Button size="sm" type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "bg-blue-100" : ""}>B</Button>
                <Button size="sm" type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "bg-blue-100" : ""}><i>I</i></Button>
                <Button size="sm" type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "bg-blue-100" : ""}>U</Button>
                <Button size="sm" type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive("strike") ? "bg-blue-100" : ""}>S</Button>
              </div>
            )}
            <div className="border rounded p-2 min-h-[20vh] max-h-[30vh] overflow-y-auto">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* File Upload */}
          <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
          <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline">Browse Images</Button>
          <div className="flex gap-2 flex-wrap max-h-[20vh] overflow-y-auto">
            {files && Array.from(files).map((file, i) => (
              <div key={i} className="relative w-[20vw] h-[10vh] border rounded flex items-center justify-center text-xs text-gray-600 overflow-hidden">
                {file.name}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
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
