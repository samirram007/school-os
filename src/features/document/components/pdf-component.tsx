
import { useState } from "react";
import { Document as PdfDocument, Page, pdfjs } from "react-pdf";
import type { Document } from "../data/schema";

import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import NameComponent from "./name-component";
import { PdfContextMenu } from "./pdf-context-menu";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type PdfComponentProps = {
    document: Document
}
const PdfComponent = ({ document }: PdfComponentProps) => {
    const [open, setOpen] = useState(false);
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    // const fileUrl = `${import.meta.env.VITE_IMAGE_ROOT_PATH || "http://localhost:8000/documents/"}${document.path}`;

    const resolveFileUrl = (path: string) => {
        const rootPath = import.meta.env.VITE_IMAGE_ROOT_PATH || "";
        if (rootPath) {
            return `${rootPath}${path}`;
        }
        if (path.startsWith("http://") || path.startsWith("https://")) {
            try {
                const parsed = new URL(path);
                if (parsed.pathname.startsWith("/storage/")) {
                    return parsed.pathname;
                }
            } catch {
                return path;
            }
        }
        return path;
    };

    // const fileUrl = resolveFileUrl(document.path);
    const fileUrl = document.path ? resolveFileUrl(document.path) : "";
    // console.log("Rendering PDF for URL:", fileUrl);

    const handleClose = () => {
        setOpen(false);
        setPageNumber(1);
    };

    const handleLoadSuccess = ({ numPages: loadedPages }: { numPages: number }) => {
        setNumPages(loadedPages);
        setPageNumber(1);
    };

    const handlePrevPage = () => {
        setPageNumber((current) => Math.max(1, current - 1));
    };

    const handleNextPage = () => {
        setPageNumber((current) => Math.min(numPages || 1, current + 1));
    };

    return (
        <>
            {/* Thumbnail */}
            <PdfContextMenu document={document} onOpen={() => setOpen(true)}>
                <div className="w-36 shadow-sm flex flex-col items-center rounded-lg border transition pb-2">
                    <div
                        onClick={() => setOpen(true)}
                        className="h-26 w-full overflow-hidden rounded-t-lg bg-gray-100 cursor-pointer hover:bg-gray-500/20"
                    >
                        {/* <object
                        data={`${fileUrl}#page=1`}
                        type="application/pdf"
                        className="w-full h-[120%] translate-y-[0%] pointer-events-none"
                    /> */}
                        <img src={`/images/pdf.webp`} alt={document.originalName} />
                    </div>

                    <NameComponent document={document} />
                </div>
            </PdfContextMenu>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-lg">
                        <div className="flex items-center justify-between border-b px-4 py-3">
                            <div className="text-sm font-medium text-gray-700">
                                Page {pageNumber} of {numPages || 1}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handlePrevPage}
                                    disabled={pageNumber <= 1}
                                    className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextPage}
                                    disabled={pageNumber >= (numPages || 1)}
                                    className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
                                >
                                    Next
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="rounded-md border px-3 py-1 text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                        <div className="max-h-[75vh] overflow-auto p-4">
                            <PdfDocument file={fileUrl} onLoadSuccess={handleLoadSuccess}>
                                <Page
                                    pageNumber={pageNumber}
                                    width={800}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                />
                            </PdfDocument>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};
export default PdfComponent;