import { FileText, ExternalLink } from "lucide-react";
import type { Document } from "../data/schema";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, VisuallyHidden } from "#/components/ui/dialog";

import NameComponent from "./name-component";
import { Button } from "#/components/ui/button";

type PdfComponentProps = {
    document: Document;
    dragListeners?: SyntheticListenerMap;
    dragAttributes?: DraggableAttributes;
}

const PdfComponent = ({ document, dragListeners, dragAttributes }: PdfComponentProps) => {
    const [open, setOpen] = useState(false);

    const baseUrl = import.meta.env.VITE_IMAGE_ROOT_PATH || "http://localhost:8000/documents/";
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const cleanPath = document.path?.startsWith('/') ? document.path.substring(1) : document.path;
    const fileUrl = `${cleanBaseUrl}${cleanPath}`;

    const handlePreview = () => {
        window.open(fileUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <div className="w-36 shadow-sm flex flex-col items-center rounded-lg border cursor-pointer hover:bg-gray-500/20 transition pb-2">
                <div 
                    className="h-26 w-full rounded-t-lg bg-gray-100 flex items-center justify-center cursor-pointer group relative"
                    onClick={() => setOpen(true)}
                >
                    <FileText size={48} className="text-red-500" />
                </div>

                <div className="w-full px-1 pt-1" {...dragListeners} {...dragAttributes}>
                    <NameComponent document={document} />
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
                    <DialogHeader className="p-4 border-b">
                        <VisuallyHidden>
                            <DialogTitle>{document.originalName}</DialogTitle>
                        </VisuallyHidden>
                    </DialogHeader>
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
                        <FileText size={64} className="text-red-500" />
                        <h2 className="text-xl font-semibold">{document.originalName}</h2>
                        <p className="text-muted-foreground">PDF preview is currently disabled to prevent CORS issues.</p>
                        <Button onClick={handlePreview} className="gap-2">
                            <ExternalLink size={16} /> Open in New Tab
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PdfComponent;