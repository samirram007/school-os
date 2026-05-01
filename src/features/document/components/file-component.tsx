import AppImage from "#/components/app-image";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { Document } from "../data/schema";
import NameComponent from "./name-component";
import type { DraggableAttributes } from "@dnd-kit/core";
import { FileContextMenu } from "./file-context-menu";
import { useRef } from "react";
import type { AppImageHandle } from "#/components/app-image";

type FileComponentProps = {
    document: Document;
    dragListeners: SyntheticListenerMap
    dragAttributes: DraggableAttributes
}

const fileRootPath = import.meta.env.VITE_IMAGE_ROOT_PATH 
const FileComponent = ({ document, dragListeners, dragAttributes }: FileComponentProps) => {
    const imageRef = useRef<AppImageHandle>(null);

    const handleOpenImage = () => {
        // Trigger the AppImage modal using the exposed openModal method
        imageRef.current?.openModal();
    }

    return (
        <FileContextMenu document={document} onOpen={handleOpenImage}>
            <div className=" w-36 border-brounded-sm shadow-sm flex flex-col items-center   rounded-lg border text-center text-sm text-muted-foreground
        hover:inset-2
        hover:bg-gray-500/20  transition cursor-pointer   pb-2
        active:inset-0 active:bg-gray-500/30 active:shadow-inner  active:outline-2 active:outline-offset-2 active:outline-gray-500/30
        ">
                {/* {fileRootPath + document.path} */}
                <span {...dragListeners}
                    {...dragAttributes}>
                    <AppImage
                        ref={imageRef}
                        src={fileRootPath + document.path}
                        alt={document.originalName}
                        className="h-26 w-full rounded-tl-lg rounded-tr-lg object-cover"
                    />
                </span>
                <NameComponent document={document} />
            </div>
        </FileContextMenu>
    )
}
export default FileComponent;