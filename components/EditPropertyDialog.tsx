"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

// 🖋️ Tiptap imports
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import {Table} from "@tiptap/extension-table";
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

  // 🖋️ Tiptap Editor for description (same as AddPropertyDialog)
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
    immediatelyRender: false, // ✅ avoids hydration issues
    onUpdate: ({ editor }) => {
      setForm((prev: any) => ({ ...prev, description: editor.getHTML() }));
    },
  });

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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>
        <form className="space-y-3">
          <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="location_city" value={form.location_city} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="location_address" value={form.location_address} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="property_type" value={form.property_type} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="rooms" type="number" value={form.rooms} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="ground_area" type="number" value={form.ground_area} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="house_area" type="number" value={form.house_area} onChange={handleChange} className="w-full border p-2 rounded" />
          
          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>

            {/* Toolbar */}
            {editor && (
              <div className="flex flex-wrap gap-2 mb-2 border rounded p-2 bg-gray-50">
                {/* Basic */}
                <Button size="sm" variant="outline" type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "bg-blue-100" : ""}>B</Button>
                <Button size="sm" variant="outline" type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "bg-blue-100" : ""}><i>I</i></Button>
                <Button size="sm" variant="outline" type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "bg-blue-100" : ""}>U</Button>
                <Button size="sm" variant="outline" type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive("strike") ? "bg-blue-100" : ""}>S</Button>

                {/* Headings */}
                {([1, 2, 3] as Level[]).map((level) => (
                  <Button
                    key={level}
                    size="sm"
                    variant="outline"
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                    className={editor.isActive("heading", { level }) ? "bg-blue-100" : ""}
                  >
                    H{level}
                  </Button>
                ))}

                {/* Lists */}
                <Button size="sm" variant="outline" type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "bg-blue-100" : ""}>• List</Button>
                <Button size="sm" variant="outline" type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "bg-blue-100" : ""}>1. List</Button>

                {/* Quote & Code */}
                <Button size="sm" variant="outline" type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "bg-blue-100" : ""}>❝</Button>
                <Button size="sm" variant="outline" type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive("codeBlock") ? "bg-blue-100" : ""}>{`</>`}</Button>

                {/* Align */}
                {["left", "center", "right", "justify"].map((align) => (
                  <Button key={align} size="sm" variant="outline" type="button"
                    onClick={() => editor.chain().focus().setTextAlign(align).run()}
                    className={editor.isActive({ textAlign: align }) ? "bg-blue-100" : ""}>
                    {align[0].toUpperCase()}
                  </Button>
                ))}

                {/* Link */}
                <Button size="sm" variant="outline" type="button"
                  onClick={() => {
                    const url = prompt("Enter URL");
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                  }}
                  className={editor.isActive("link") ? "bg-blue-100" : ""}>
                  🔗
                </Button>
                <Button size="sm" variant="outline" type="button" onClick={() => editor.chain().focus().unsetLink().run()}>❌</Button>

                {/* Images */}
                <Button size="sm" variant="outline" type="button"
                  onClick={() => {
                    const url = prompt("Enter image URL");
                    if (url) editor.chain().focus().setImage({ src: url }).run();
                  }}>
                  🖼️
                </Button>

                {/* Tables */}
                <Button size="sm" variant="outline" type="button"
                  onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                  ▦ Table
                </Button>

                {/* Undo / Redo */}
                <Button size="sm" variant="outline" type="button" onClick={() => editor.chain().focus().undo().run()}>↶</Button>
                <Button size="sm" variant="outline" type="button" onClick={() => editor.chain().focus().redo().run()}>↷</Button>
              </div>
            )}

            <div className="border rounded p-2 min-h-[150px]">
              <EditorContent editor={editor} />
            </div>
          </div>

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
