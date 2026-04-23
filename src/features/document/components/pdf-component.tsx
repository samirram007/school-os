
import { useState } from "react";
import { Document as PdfDocument, Page, pdfjs } from "react-pdf";
import type { Document } from "../data/schema";

import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import { tr } from "@faker-js/faker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type PdfComponentProps = {
    document: Document
    handleRename: (e: React.FocusEvent<HTMLParagraphElement>) => void
}
const PdfComponent = ({ document, handleRename }: PdfComponentProps) => {
    const [open, setOpen] = useState(false);

    const fileUrl = `${import.meta.env.VITE_IMAGE_ROOT_PATH || "http://localhost:8000/documents/"}${document.path}`;
    // console.log("Rendering PDF for URL:", fileUrl);

    return (
        <>
            {/* Thumbnail */}
            <div
                onClick={() => setOpen(true)}
                className="w-36 shadow-sm flex flex-col items-center rounded-lg border cursor-pointer hover:bg-gray-500/20 transition pb-2"
            >
                <div className="h-26 w-full overflow-hidden rounded-t-lg bg-gray-100">
                    <object
                        data={`${fileUrl}#page=1`}
                        type="application/pdf"
                        className="w-full h-[120%] translate-y-[0%]"
                    />
                </div>

                <p
                    className="mt-2 text-center w-full px-2 text-sm text-muted-foreground truncate whitespace-nowrap overflow-hidden  focus:text-left focus:whitespace-normal focus:overflow-visible"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleRename}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            (e.target as HTMLParagraphElement).blur();
                        }
                    }}
                >
                    {document.originalName!}
                </p>
            </div>


        </>
    );
};
export default PdfComponent;