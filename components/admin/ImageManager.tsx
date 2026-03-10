"use client";

import { useState } from "react";
import { uploadImages, deleteImage, reorderImages } from "@/lib/admin/propertyActions";
import { Reorder } from "framer-motion";

export function ImageManager({ propertyId, initialImages }: any) {
    const [images, setImages] = useState(initialImages || []);

    return (
        <div className="space-y-4">
            <input
                type="file"
                multiple
                onChange={async (e) => {
                    if (!e.target.files) return;
                    await uploadImages(propertyId, Array.from(e.target.files));
                }}
            />

            <Reorder.Group
                axis="y"
                values={images}
                onReorder={async (newOrder) => {
                    setImages(newOrder);
                    await reorderImages(newOrder);
                }}
                className="grid grid-cols-3 gap-4"
            >
                {images.map((img: any) => (
                    <Reorder.Item key={img.id} value={img}>
                        <div className="relative">
                            <img src={img.image_url} className="rounded h-32 object-cover w-full" />
                            <button
                                onClick={() => deleteImage(img)}
                                className="absolute top-2 right-2 bg-black/70 text-white px-2 rounded"
                            >
                                ✕
                            </button>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
}
