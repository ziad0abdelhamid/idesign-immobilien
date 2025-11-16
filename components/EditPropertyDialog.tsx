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

export default function EditPropertyDialog({
  record,
  onRecordUpdated,
}: {
  record: any;
  onRecordUpdated: () => void;
}) {
  const [open, setOpen] = useState(false); // ✅ control dialog
  const [form, setForm] = useState(record);
  const [newFiles, setNewFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: form.description,
    immediatelyRender: false,
    onUpdate: ({ editor }) => setForm((prev: any) => ({ ...prev, description: editor.getHTML() })),
  });

  const handleSubmit = async () => {
    setIsUploading(true);
    let imageUrls = form.images || [];

    try {
      if (newFiles && newFiles.length > 0) {
        let uploaded = 0;
        for (const file of Array.from(newFiles)) {
          const filePath = `properties/${Date.now()}-${file.name}`;
          const { error } = await supabase.storage.from("properties").upload(filePath, file);
          if (error) { alert(`Failed to upload ${file.name}`); continue; }
          const { data } = supabase.storage.from("properties").getPublicUrl(filePath);
          imageUrls.push(data.publicUrl);
          uploaded++;
          setUploadProgress(Math.round((uploaded / newFiles.length) * 100));
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
        alert("Failed to update property: " + error.message);
      } else {
        onRecordUpdated(); // ✅ refresh dataset
        setOpen(false); // ✅ close dialog
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="max-w-full w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>

        <form className="space-y-3 flex flex-col">
          {/* Inputs */}
          {["title","price","location_city","location_address","property_type","rooms","ground_area","house_area"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.replace("_"," ")}
              type={["price","rooms","ground_area","house_area"].includes(field) ? "number" : "text"}
              className="w-full border p-2 rounded"
            />
          ))}

          {/* Rich Text Editor */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">Description</label>
            {editor && (
              <div className="flex flex-wrap gap-2 mb-2 border rounded p-2 bg-gray-50 overflow-x-auto">
                <Button size="sm" type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "bg-blue-100" : ""}>B</Button>
                <Button size="sm" type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "bg-blue-100" : ""}><i>I</i></Button>
                <Button size="sm" type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "bg-blue-100" : ""}>U</Button>
              </div>
            )}
            <div className="border rounded p-2 min-h-[20vh] max-h-[30vh] overflow-y-auto">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* File Upload */}
          <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
          <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline">Browse Images</Button>

          {/* Thumbnails */}
          <div className="flex gap-2 flex-wrap max-h-[20vh] overflow-y-auto">
            {form.images?.map((img: string, i: number) => (
              <div key={i} className="relative w-[20vw] h-[10vh] border rounded overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => handleRemoveImage(i)} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">×</button>
              </div>
            ))}
            {newFiles && Array.from(newFiles).map((file, i) => (
              <div key={i} className="relative w-[20vw] h-[10vh] border rounded flex items-center justify-center text-xs text-gray-600">{file.name}</div>
            ))}
          </div>

          {/* Progress Bar */}
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
