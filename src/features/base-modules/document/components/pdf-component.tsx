
import { useState } from "react";
import { Document as PdfDocument, Page, pdfjs } from "react-pdf";
import type { Document } from "../data/schema";

import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import { tr } from "@faker-js/faker";
import NameComponent from "./name-component";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { DraggableAttributes } from "@dnd-kit/core";
import { IconFileTypePdf, IconPdf } from "@tabler/icons-react";
import { Dialog, DialogContent } from "#/components/ui/dialog";
import AppPdf from "#/components/app-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type PdfComponentProps = {
    document: Document  
    dragListeners: SyntheticListenerMap
    dragAttributes: DraggableAttributes
}

const PdfComponent = ({ document, dragListeners, dragAttributes }: PdfComponentProps) => {
    const [open, setOpen] = useState(false);

    const fileUrl = `${import.meta.env.VITE_IMAGE_ROOT_PATH || "http://localhost:8000/documents/"}${document.path}`;
    // console.log("Rendering PDF for URL:", fileUrl);

    return (
        <>
            {/* Thumbnail */}
            <span {...dragListeners}
                {...dragAttributes}>
                <AppPdf
                    src={fileUrl}
                    alt={document.originalName}
                    className="h-26 w-full rounded-tl-lg rounded-tr-lg object-cover"
                />
            </span>
            <NameComponent document={document} />


        </>
    );
};
export default PdfComponent;