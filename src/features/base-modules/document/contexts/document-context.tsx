
import React, { useState } from 'react'
import type { Document } from '../data/schema'
import useDialogState from '#/core/hooks/use-dialog-state'



type DocumentDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface DocumentContextType {
  open: DocumentDialogType | null
  setOpen: (str: DocumentDialogType | null) => void
  currentRow: Document | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Document | null>>
  currentFolder: Document | null
  // _setCurrentFolder: React.Dispatch<React.SetStateAction<Document | null>>
  setCurrentFolder: (document: Document | null) => void 
  keyName: string
}

const DocumentContext = React.createContext<DocumentContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function DocumentProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<DocumentDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Document | null>(null)
  const [currentFolder, _setCurrentFolder] = useState<Document | null>(() => {
    try {
      const raw = localStorage.getItem("currentFolder");
      return raw ? (JSON.parse(raw) as Document) : null;
    } catch {
      return null;
    }
  });
  const setCurrentFolder = (document: Document | null) => {
    if (!document) {
      _setCurrentFolder(null)
      localStorage.removeItem('currentFolder')
      return
    }
    _setCurrentFolder(document)
    localStorage.setItem('currentFolder', JSON.stringify(document))
  }


  return (
    <DocumentContext value={{ open, setOpen, currentRow, setCurrentRow, currentFolder, setCurrentFolder, keyName: "document" }}>
      {children}
    </DocumentContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDocument = () => {
  const documentContext = React.useContext(DocumentContext)

  if (!documentContext) {
    throw new Error('useDocument has to be used within <DocumentContext>')
  }

  return documentContext
}
