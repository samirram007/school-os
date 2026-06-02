import { useState } from "react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "./ui/dialog"
import { IconFileTypePdf } from "@tabler/icons-react"

type AppPdfProps = {
    src?: string
    alt?: string
    className?: string
    fallback?: string
    preview?: boolean

}

export default function AppPdf({
    src,
    alt = "image",
    className,
    fallback = "/images/placeholder.png",
    preview = true,

}: AppPdfProps) {

    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [open, setOpen] = useState(false)
    console.log("src", src);

    const finalSrc = error || !src ? fallback : src

    // ✅ detect image type
    const isPdf = /\.(pdf)$/i.test(finalSrc)

    const handleClick = () => {
        if (preview && isPdf) {
            setOpen(true)
        }
    }

    return (
        <>
            {/* Thumbnail */}
            <div
                className={cn(
                    "relative overflow-hidden cursor-pointer group",
                    "bg-red-300/20 ",
                    "hover:bg-gray-300",
                    className
                )}
                onClick={handleClick}
            >
                {/* Skeleton */}

                <IconFileTypePdf size={24}
                    className={cn(
                        "h-full w-full object-cover transition-all duration-300",
                        "",
                        // ✅ zoom effect
                        isPdf && "group-hover:scale-105 text-red-600"
                    )}
                />

                {/* Optional overlay for non-images */}
                {!isPdf && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs">
                        Preview not available
                    </div>
                )}
            </div>

            {/* Preview Dialog */}
            {preview && isPdf && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="w-[95vw] max-w-350 h-[90vh] p-0 border-none shadow-none bg-black/60 backdrop-blur-sm">
                        <object
                            data={finalSrc}
                            className="w-full h-full object-contain rounded-md"
                        />
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}