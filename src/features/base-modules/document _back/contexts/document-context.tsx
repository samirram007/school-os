
import React, { useState } from 'react'
import type { Document } from '../data/schema'
import useDialogState from '#/core/hooks/use-dialog-state'



type DocumentDialogType = 'invite' | 'add' | 'edit' | 'delete'
type ViewMode = 'grid' | 'list'
type SortBy = 'name' | 'createdAt' | 'size' | 'type'

interface DocumentContextType {
  open: DocumentDialogType | null
  setOpen: (str: DocumentDialogType | null) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: SortBy
  setSortBy: (sort: SortBy) => void
  selectedIds: number[]
  toggleSelect: (id: number) => void
  clearSelection: () => void
  currentRow: Document | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Document | null>>
  currentFolder: Document | null
  setCurrentFolder: (document: Document | null) => void 
  keyName: string
}

const DocumentContext = React.createContext<DocumentContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function DocumentProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<DocumentDialogType>(null)
  const [viewMode, _setViewMode] = useState<ViewMode>(() => (localStorage.getItem("viewMode") as ViewMode) || 'grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
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
    _setCurrentFolder(document);
    clearSelection(); // Clear selection when changing folder
    if (!document) {
      localStorage.removeItem('currentFolder')
      return
    }
    localStorage.setItem('currentFolder', JSON.stringify(document))
  }
  const setViewMode = (view: ViewMode) => {
    _setViewMode(view)
    localStorage.setItem("viewMode", view)
  }
  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  const clearSelection = () => setSelectedIds([]);

  return (
    <DocumentContext value={{
      open, setOpen,
      viewMode, setViewMode,
      searchQuery, setSearchQuery,
      sortBy, setSortBy,
      selectedIds, toggleSelect, clearSelection,
      currentRow, setCurrentRow,
      currentFolder, setCurrentFolder,
      keyName: "document"
    }}>
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
