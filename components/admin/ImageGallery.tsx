export function ImageGallery({ images }: { images: any[] }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {images.map((img) => (
                <img
                    key={img.id}
                    src={img.image_url}
                    className="rounded object-cover h-32 w-full"
                />
            ))}
        </div>
    );
}
