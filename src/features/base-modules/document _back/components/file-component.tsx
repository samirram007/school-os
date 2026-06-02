import AppImage from "#/components/app-image";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { Document } from "../data/schema";
import NameComponent from "./name-component";
import type { DraggableAttributes } from "@dnd-kit/core";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, VisuallyHidden } from "#/components/ui/dialog";

type FileComponentProps = {
    document: Document;
    dragListeners?: SyntheticListenerMap;
    dragAttributes?: DraggableAttributes;
}

const fileRootPath = import.meta.env.VITE_IMAGE_ROOT_PATH || "http://localhost:8000/documents/"

const FileComponent = ({ document, dragListeners, dragAttributes }: FileComponentProps) => {
    const [open, setOpen] = useState(false);
    const isImage = document.documentType === "image";
    const fileUrl = fileRootPath + document.path;

    return (
        <>
            <div className=" w-36 shadow-sm flex flex-col items-center rounded-lg border text-center text-sm text-muted-foreground
            hover:inset-2
            hover:bg-gray-500/20  transition cursor-pointer   pb-2
            active:inset-0 active:bg-gray-500/30 active:shadow-inner  active:outline-2 active:outline-offset-2 active:outline-gray-500/30
            ">
                <div className="w-full h-26 overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center"
                     onClick={() => isImage && setOpen(true)}>
                    <AppImage
                        src={fileUrl}
                        alt={document.originalName}
                        className="h-full w-full object-cover"
                    />
                </div>
                
                <div className="w-full px-1 pt-1" {...dragListeners} {...dragAttributes}>
                    <NameComponent document={document} />
                </div>
            </div>

            {/* Image Preview Dialog */}
            {isImage && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 overflow-hidden">
                        <DialogHeader className="p-4 border-b shrink-0">
                            <VisuallyHidden>
                                <DialogTitle>{document.originalName}</DialogTitle>
                            </VisuallyHidden>
                        </DialogHeader>
                        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-muted/30">
                            <img
                                src={fileUrl}
                                alt={document.originalName}
                                className="max-w-full max-h-full object-contain shadow-lg"
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
export default FileComponent;