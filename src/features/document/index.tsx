"use client"
import { Main } from "#/layouts/protected/components/main";
import { useQuery } from "@tanstack/react-query";
import { documentQueryOptions, useRenameDocumentMutation } from "./data/queryOptions";

import { IconFolderFilled } from "@tabler/icons-react";
import { Upload } from "lucide-react";
import UploadButton from "./components/upload-button";



export default function DocumentPage() {
    return (
        <Main className="max-w-full flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3 rounded-lg border border-slate-200/70 bg-white/80 px-4 py-3 shadow-sm dark:border-white/[0.07] dark:bg-white/5">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Document</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Manage your Document  here.
                    </p>
                </div>
                <div>
                    <UploadButton />
                </div>
            </div>
            <DocumentBodyComponent />
        </Main>
    )
}

const DocumentBodyComponent = () => {
    const documents = useQuery(documentQueryOptions())
    console.log(documents.data);

    return (
        <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min  " >
            <div className="flex flex-row gap-4 p-4">

                {documents.data?.data?.map((document: any) => (
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
        });
    };
    return (
        <div key={document.id} className=" border-brounded-sm shadow-sm flex flex-col items-center   rounded-lg border text-center text-sm text-muted-foreground
        hover:inset-2
        hover:bg-gray-500/20  transition cursor-pointer   pb-2
        active:inset-0 active:bg-gray-500/30 active:shadow-inner  active:outline-2 active:outline-offset-2 active:outline-gray-500/30
        ">
            <IconFolderFilled size={124} className="  icon-folder " />
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
            >
                {document.name}
            </p>
        </div>
    )
}