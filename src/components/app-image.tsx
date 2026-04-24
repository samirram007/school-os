import { useState } from "react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "./ui/dialog"

type AppImageProps = {
    src?: string
    alt?: string
    className?: string
    fallback?: string
    preview?: boolean
    attr?: any
}

export default function AppImage({
    src,
    alt = "image",
    className,
    fallback = "/images/placeholder.png",
    preview = true,
    attr
}: AppImageProps) {

    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [open, setOpen] = useState(false)

    const finalSrc = error || !src ? fallback : src

    // ✅ detect image type
    const isImage = /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(finalSrc)

    const handleClick = () => {
        if (preview && isImage) {
            setOpen(true)
        }
    }

    return (
        <>
            {/* Thumbnail */}
            <div
                className={cn(
                    "relative overflow-hidden cursor-pointer group",
                    className
                )}
                onClick={handleClick}
            >
                {/* Skeleton */}
                {!loaded && (
                    <div className="absolute inset-0 animate-pulse bg-muted" />
                )}

                <img
                    src={finalSrc}
                    alt={alt}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    onError={() => setError(true)}
                    {...attr}
                    className={cn(
                        "h-full w-full object-cover transition-all duration-300",
                        loaded ? "opacity-100" : "opacity-0",
                        // ✅ zoom effect
                        isImage && "group-hover:scale-105"
                    )}
                />

                {/* Optional overlay for non-images */}
                {!isImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs">
                        Preview not available
                    </div>
                )}
            </div>

            {/* Preview Dialog */}
            {preview && isImage && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-5xl p-0 border-none shadow-none bg-black/60 backdrop-blur-sm">
                        <img
                            src={finalSrc}
                            alt={alt}
                            className="w-full h-auto max-h-[90vh] object-contain rounded-md"
                        />
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}