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

  // 🖋️ Rich Text Editor
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
    immediatelyRender: false, // ✅ prevents hydration issues
    onUpdate: ({ editor }) => {
      setForm((prev) => ({ ...prev, description: editor.getHTML() }));
    },
  });

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

      const { error } = await supabase.from("properties").insert([
        {
          ...form,
          price: Number(form.price),
          rooms: Number(form.rooms),
          ground_area: Number(form.ground_area),
          house_area: Number(form.house_area),
          images: imageUrls,
        },
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
        editor?.commands.clearContent();
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>

        <form className="space-y-3">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="price" type="number" placeholder="Price (€)" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="location_city" placeholder="City" value={form.location_city} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="location_address" placeholder="Address" value={form.location_address} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="property_type" placeholder="Type" value={form.property_type} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="rooms" type="number" placeholder="Rooms" value={form.rooms} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="ground_area" type="number" placeholder="Ground area (m²)" value={form.ground_area} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="house_area" type="number" placeholder="House area (m²)" value={form.house_area} onChange={handleChange} className="w-full border p-2 rounded" />

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

          {/* File Upload */}
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
