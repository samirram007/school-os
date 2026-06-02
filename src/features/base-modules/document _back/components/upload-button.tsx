import { Button } from "@/components/ui/button"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { useRef, useState } from "react"
import { Upload, X, File as FileIcon } from "lucide-react"
import { useUploadDocumentMutation } from "../data/queryOptions"
import { toast } from "sonner"
import type { AxiosError } from "axios"
import { useDocument } from "../contexts/document-context"

export default function UploadButton() {

    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen} >
            <SheetTrigger asChild>
                <Button variant="outline" className="inline-flex items-center gap-2 rounded-md bg-linear-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium text-white 
            cursor-pointer transition hover:bg-linear-to-r
            hover:shadow-lg
            hover:text-gray-50
            hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <Upload size={16} />
                    Upload</Button>
            </SheetTrigger>
            <SheetContent className="w-8/12 mx-auto rounded-b-xl" side="top" showCloseButton={false}>
                <SheetHeader>
                    <SheetTitle>Upload File(s)</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">


                    <DragAndDrop setOpen={setOpen} />
                </div>
                <SheetFooter className="mt-4 flex flex-row justify-end">
                    {/* <Button type="submit">Upload</Button> */}
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}







export function DragAndDrop({ setOpen }: { setOpen: (open: boolean) => void }) {
    const mutation = useUploadDocumentMutation()
    const { currentFolder } = useDocument();
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [dragging, setDragging] = useState(false)
    const [files, setFiles] = useState<File[]>([])

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList) return
        const newFiles = Array.from(fileList)

        // avoid duplicates (optional)
        setFiles((prev) => [...prev, ...newFiles])
    }

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }
    const handleUpload = () => {
        console.log(files.length);

        if (files.length === 0) return

        const formData = new FormData()
        files.forEach((file) => formData.append("files[]", file))
        formData.append("parentId", currentFolder?.id ? currentFolder.id.toString() : "")

        mutation.mutate(formData, {
            onSuccess: () => {
                setFiles([])
                toast.success("Files uploaded successfully!")
                setOpen(false)
            },
            onError: (error) => {
                const err = error as AxiosError<{ message?: string }>

                toast.info(
                    err.response?.data?.message || "Failed to upload files. Please try again."
                )
                // console.error("INSIDE ERROR: Document upload failed:", error)
            },
        })
    }

    const clearAll = () => setFiles([])

    return (
        <div className="space-y-4">
            {/* Drop zone */}
            <div
                className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed text-center transition ${dragging
                    ? "border-primary bg-primary/10"
                    : "border-muted"
                    }`}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault()
                    setDragging(false)
                    handleFiles(e.dataTransfer.files)
                }}
            >
                <Upload size={28} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                    Drag & drop files, or click to select
                </p>

                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            {/* Preview list */}
            {files.length > 0 && (
                <div className="rounded-md border p-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                            {files.length} file(s) ready
                        </p>
                        <button
                            onClick={clearAll}
                            className="text-xs text-red-500"
                        >
                            Clear all
                        </button>
                    </div>

                    <ul className="space-y-2 max-h-40 overflow-auto">
                        {files.map((file, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between rounded bg-muted px-2 py-1"
                            >
                                <div className="flex items-center gap-2 truncate">
                                    <FileIcon size={16} />
                                    <span className="text-sm truncate">
                                        {file.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {(file.size / 1024).toFixed(1)} KB
                                    </span>
                                </div>

                                <button onClick={() => removeFile(index)}>
                                    <X size={14} />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            onClick={clearAll}
                            className="text-sm px-3 py-1 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpload}
                            className="text-sm px-3 py-1 bg-primary text-white rounded"
                        >
                            Upload
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}