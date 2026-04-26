import { useRenameDocumentMutation } from "../data/queryOptions";
import type { Document } from "../data/schema";

export default function NameComponent({ document }: { document: Document }) {
    const mutation = useRenameDocumentMutation();
    const handleRename = (e: React.FocusEvent<HTMLParagraphElement>) => {
        const newName = e.currentTarget.innerText.trim();

        if (!newName || newName === document.originalName) return;

        mutation.mutate({
            id: document.id!,
            name: newName,
        },);
    };

    return (<p className="cursor-text text-sm text-muted-foreground   w-full"
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
    )
}