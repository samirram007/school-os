"use client"
import { Main } from "#/layouts/protected/components/main";
import { useQuery } from "@tanstack/react-query";
import { documentChildrenQueryOptions, documentQueryOptions, useRenameDocumentMutation } from "./data/queryOptions";

import { IconFolderFilled } from "@tabler/icons-react";

import UploadButton from "./components/upload-button";
import AppImage from "#/components/app-image";
import NewFolderButton from "./components/new-folder-button";
import { useDocument } from "./contexts/document-context";
import { useMemo } from "react";


const fileRootPath = import.meta.env.VITE_IMAGE_ROOT_PATH || "http://localhost:8000/uploads/"
export default function DocumentPage() {
    const { currentFolder } = useDocument();
    return (
        <Main className="max-w-full flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3 rounded-lg border border-slate-200/70 bg-white/80 px-4 py-3 shadow-sm dark:border-white/[0.07] dark:bg-white/5">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Document</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        path: /{currentFolder ? `${currentFolder.path ?? ''}` : ""} 
                    </p>
                </div>
                <div>
                    <NewFolderButton />
                    <UploadButton />
                </div>
            </div>
            <DocumentBodyComponent />
        </Main>
    )
}

const DocumentBodyComponent = () => {
    const { currentFolder } = useDocument();
    const fetchedDocuments = useQuery(documentQueryOptions(currentFolder?.id));
    const documents = useMemo(() => fetchedDocuments.data?.data || [], [currentFolder, fetchedDocuments.data]);
    return (
        <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min  " >
            <div className="flex flex-row flex-wrap gap-4 p-4">

                {documents?.map((document: any) => (
                    <DocumentItem key={document.id} document={document} />
                ))}
            </div>
        </div >
    )
}

const DocumentGrid = ({ documents }: { documents: any[] }) => {
    return (
        <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min  " >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {documents.map((document: any) => (
                    <DocumentItem key={document.id} document={document} />
                ))}
            </div>
        </div >
    )
}

const DocumentItem = ({ document }: { document: any }) => {
    const mutation = useRenameDocumentMutation();

    const handleRename = (e: React.FocusEvent<HTMLParagraphElement>) => {
        const newName = e.currentTarget.innerText.trim();

        if (!newName || newName === document.name) return;

        mutation.mutate({
            id: document.id,
            name: newName,
        },);
    };
    return (
        <>
            {
                document.documentType === "folder" ?
                    <FolderComponent document={document} handleRename={handleRename} /> : <FileComponent document={document} handleRename={handleRename} />
            }

        </ >
    )
}

const FolderComponent = ({ document, handleRename }: { document: any, handleRename: (e: React.FocusEvent<HTMLParagraphElement>) => void }) => {
    const { setCurrentFolder } = useDocument();
    const fetchDocumentsQuery = useQuery(documentChildrenQueryOptions(document.id));
    const handleClick = () => {

        setCurrentFolder(document);
        // fetchDocumentsQuery.refetch();
    }
    return (
        <div className=" w-36 border-brounded-sm shadow-sm flex flex-col items-center   rounded-lg border text-center text-sm text-muted-foreground
        hover:inset-2
        hover:bg-gray-500/20  transition cursor-pointer   pb-2
        active:inset-0 active:bg-gray-500/30 active:shadow-inner  active:outline-2 active:outline-offset-2 active:outline-gray-500/30
        ">
            <IconFolderFilled size={124} className="  icon-folder " onClick={handleClick} />
            <p className="cursor-text text-sm text-muted-foreground   -mt-4 w-full"
                onBlur={handleRename}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        (e.target as HTMLParagraphElement).blur();
                    }
                }}
                contentEditable
                suppressContentEditableWarning
            >{document.originalName}</p>
        </div>
    )
}

const FileComponent = ({ document, handleRename }: { document: any, handleRename: (e: React.FocusEvent<HTMLParagraphElement>) => void }) => {
    return (
        <div className=" w-36 border-brounded-sm shadow-sm flex flex-col items-center   rounded-lg border text-center text-sm text-muted-foreground
        hover:inset-2
        hover:bg-gray-500/20  transition cursor-pointer   pb-2
        active:inset-0 active:bg-gray-500/30 active:shadow-inner  active:outline-2 active:outline-offset-2 active:outline-gray-500/30
        ">

            <AppImage src={fileRootPath + document.path} alt={document.originalName} className="h-26 w-full rounded-tl-lg rounded-tr-lg object-cover" />
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
                {document.originalName}
            </p>
        </div>
    )
}