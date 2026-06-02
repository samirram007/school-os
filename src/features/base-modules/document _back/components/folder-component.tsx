import { useDocument } from "../contexts/document-context";
import type { Document } from "../data/schema";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { DraggableAttributes } from "@dnd-kit/core";
import NameComponent from "./name-component";
import folderIcon from '@/assets/folder.png'
import AppImage from "#/components/app-image";
import { FolderContextMenu } from "./folder-context-menu";

const FolderComponent = ({
    document,
    dragListeners,
    dragAttributes,
}: {
    document: Document;
    dragListeners?: SyntheticListenerMap;
    dragAttributes?: DraggableAttributes;
}) => {
    const { setCurrentFolder } = useDocument();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentFolder(document);
    }

    return (
        <FolderContextMenu>
            <div className="w-36 shadow-sm flex flex-col items-center rounded-lg border text-center text-sm text-muted-foreground
            hover:inset-2
            hover:bg-gray-500/20 transition cursor-pointer pb-2
            active:inset-0 active:bg-gray-500/30 active:shadow-inner active:outline-2 active:outline-offset-2 active:outline-gray-500/30
            ">
                <span {...dragListeners}
                {...dragAttributes}>
                <span onClick={handleClick}>
                    <AppImage
                        src={folderIcon}
                        alt={document.originalName}
                        className="h-26 w-full rounded-tl-lg rounded-tr-lg object-cover"
                    />
                </span>
                </span>
                <NameComponent document={document} />
            </div>
        </FolderContextMenu>
    )
}

export default FolderComponent;