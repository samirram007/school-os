import AppImage from "#/components/app-image";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { Document } from "../data/schema";
import NameComponent from "./name-component";
import type { DraggableAttributes } from "@dnd-kit/core";

type FileComponentProps = {
    document: Document;
    dragListeners: SyntheticListenerMap
    dragAttributes: DraggableAttributes
}

const fileRootPath = import.meta.env.VITE_IMAGE_ROOT_PATH || "http://localhost:8000/uploads/"
const FileComponent = ({ document, dragListeners, dragAttributes }: FileComponentProps) => {
    return (
        <div className=" w-36 border-brounded-sm shadow-sm flex flex-col items-center   rounded-lg border text-center text-sm text-muted-foreground
        hover:inset-2
        hover:bg-gray-500/20  transition cursor-pointer   pb-2
        active:inset-0 active:bg-gray-500/30 active:shadow-inner  active:outline-2 active:outline-offset-2 active:outline-gray-500/30
        ">
            <span {...dragListeners}
                {...dragAttributes}>
                <AppImage
                    src={fileRootPath + document.path}
                    alt={document.originalName}
                    className="h-26 w-full rounded-tl-lg rounded-tr-lg object-cover"
                />
            </span>
            <NameComponent document={document} />
        </div>
    )
}
export default FileComponent;