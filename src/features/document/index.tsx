"use client"
import { Main } from "#/layouts/protected/components/main";
import { useQuery } from "@tanstack/react-query";
import { documentQueryOptions, useMoveDocumentMutation } from "./data/queryOptions";



import UploadButton from "./components/upload-button";

import NewFolderButton from "./components/new-folder-button";
import { useDocument } from "./contexts/document-context";
import { useMemo } from "react";
import PdfComponent from "./components/pdf-component";
import FolderComponent from "./components/folder-component";
import FileComponent from "./components/file-component";
import { toast } from "sonner";
import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";


const pathSymbol = " > "
export default function DocumentPage() {



    return (
        <Main className="max-w-full flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3 rounded-lg border border-slate-200/70 bg-white/80 px-4 py-3 shadow-sm dark:border-white/[0.07] dark:bg-white/5">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Document</h2>
                    <DoucmentPath />
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

const DoucmentPath = () => {
    const { currentFolder, setCurrentFolder } = useDocument();

    const pathSegments = useMemo(() => {
        if (!currentFolder) return [];

        
        const parents = currentFolder.parents?.sort((a, b) => (b.depth ?? 0) - (a.depth ?? 0)) || [];
    

        return [
            ...parents,
            {
                id: currentFolder.id,
                name: currentFolder.name,
                originalName: currentFolder.originalName,
                parentId: currentFolder.parentId,
                parents: parents.slice(0, parents.length - 1),
                depth: 0
            },
        ];
    }, [currentFolder]);

    const handleClick = (folder: any) => {
        setCurrentFolder({
            id: folder.id,
            parentId: folder.parentId ?? null,
            documentType:"folder",
            name: folder.name,
            originalName: folder.originalName,
            parents: pathSegments?.slice(0, pathSegments.findIndex((seg) => seg.id === folder.id)),
        });

    }

    // if (!currentFolder) {
    //     return <p className="text-slate-600 dark:text-slate-400 cursor-pointer hover:underline"
    //         onClick={() => setCurrentFolder(null)} >root{pathSymbol}</p>;
    // }

    console.log("pathSegments ------ :  ", pathSegments);

    return (
        <p className="text-slate-600 dark:text-slate-400">
            <span onClick={() => setCurrentFolder(null)} className="cursor-pointer hover:underline">
                {" root " + pathSymbol}
            </span>
            {pathSegments.map((segment, index) => {
                const isLast = index === pathSegments.length - 1;

                return (
                    <span key={segment.id}>
                        {!isLast ? (
                            <span
                                className="cursor-pointer hover:underline"
                                onClick={() => handleClick(segment)}
                            >
                                {segment.originalName!}
                            </span>
                        ) : (
                            <span className="font-semibold">
                                {segment.originalName!}
                            </span>
                        )}
                        {index < pathSegments.length - 1 && " " + pathSymbol + " "}
                    </span>
                );
            })}
        </p>
    );
};


const DocumentBodyComponent = () => {
    const { currentFolder } = useDocument();
    console.log("page : ",currentFolder?.id);
    const fetchedDocuments = useQuery(documentQueryOptions(currentFolder?.id));
    const documents = useMemo(() => fetchedDocuments.data?.data || [], [currentFolder, fetchedDocuments.data]);
    return (
        <DocumentGrid documents={documents} />
    )
}
type DragData = {
    type: string;
    document: any;
};
const DocumentGrid = ({ documents }: { documents: any[] }) => {
    const moveMutation = useMoveDocumentMutation()
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        })
    );
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const dragged = active.data.current as DragData;
        const target = over.data.current as DragData;

        if (target?.type !== "folder") return;

        const draggedDoc = dragged?.document;
        const targetFolder = target.document;

        if (draggedDoc.id === targetFolder.id) return;

        // 🚀 move API
        moveMutation.mutate({ id: draggedDoc.id, parentId: targetFolder.id }, {
            onSuccess: () => {
                toast.success("Move sueccessfully complete")
            }
        });
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min  " > 
                <div className="flex flex-row flex-wrap gap-8 p-8">
                    {documents.map((document: any) => (
                        <DocumentItem key={document.id} document={document} />
                    ))}
                </div>
            </div >
        </DndContext>
    )
}

const DocumentItem = ({ document }: { document: any }) => {



    const isFolder = document.documentType === "folder";

    // ✅ ALL items draggable
    const {
        setNodeRef: setDragRef,
        listeners,
        attributes,
        transform,
    } = useDraggable({
        id: `doc-${document.id}`,
        data: {
            type: document.documentType,
            document,
        },
    });

    // ✅ ONLY folders droppable
    const { setNodeRef: setDropRef, isOver, } = useDroppable({
        id: `folder-${document.id}`,
        data: {
            type: "folder",
            document,
        },
        disabled: !isFolder,
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
    };

    const componentMap: Record<string, React.FC<any>> = {
        folder: FolderComponent,
        pdf: PdfComponent,
        file: FileComponent,
    };

    const Component = componentMap[document.documentType] || FileComponent;

    return (
        <div
            ref={(node) => {
                setDragRef(node);       // still required for drag positioning
                if (isFolder) setDropRef(node); // keep drop on folder
            }}
            style={style}
            className={isFolder && isOver ? "bg-blue-200 rounded-lg" : ""}
        >
            <Component
                document={document}
                dragListeners={listeners}
                dragAttributes={attributes}
            />
        </div>
    );
}





