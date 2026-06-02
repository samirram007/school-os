
import { toast } from "sonner"
import { useCreateFolderMutation } from "../data/queryOptions"
import type { AxiosError } from "axios"
import { Button } from "#/components/ui/button"
import { IconFolderFilled } from "@tabler/icons-react"
import { useDocument } from "../contexts/document-context"

export default function NewFolderButton() {
    const { currentFolder } = useDocument();
    const createFolderMutation = useCreateFolderMutation()



    const handleCreateFolder = () => {
        const folderName = prompt("Enter folder name:")
        if (folderName) {
            createFolderMutation.mutate({ name: folderName, parentId: currentFolder?.id ?? null }, {
                onSuccess: () => {
                    toast.success("Folder created successfully!")
                },
                onError: (error) => {
                    const err = error as AxiosError<{ message?: string }>
                    toast.error(err.response?.data?.message || "Failed to create folder. Please try again.")

                },
            })
        }
    }

    return (
        <Button variant="outline" className="inline-flex items-center gap-2 rounded-md bg-linear-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium text-white 
            cursor-pointer transition hover:bg-linear-to-r
            hover:shadow-lg
            hover:text-gray-50
            hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleCreateFolder}
        >
            <IconFolderFilled size={16} className="text-yellow-400" />
            New Folder
        </Button>
    )
}