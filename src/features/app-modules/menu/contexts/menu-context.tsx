import useDialogState from '@/core/hooks/use-dialog-state'
import React, { useState } from 'react'
import type { Menu } from '../data/schema'



type MenuDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface MenuContextType {
    open: MenuDialogType | null
    setOpen: (str: MenuDialogType | null) => void
    currentRow: Menu | null
    setCurrentRow: React.Dispatch<React.SetStateAction<Menu | null>>
    keyName: string
}

const MenuContext = React.createContext<MenuContextType | null>(null)

interface Props {
    children: React.ReactNode
}

export default function MenuProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<MenuDialogType>(null)
    const [currentRow, setCurrentRow] = useState<Menu | null>(null)

    return (
        <MenuContext value={{ open, setOpen, currentRow, setCurrentRow, keyName: "app_modules" }}>
            {children}
        </MenuContext>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMenu = () => {
    const menuContext = React.useContext(MenuContext)

    if (!menuContext) {
        throw new Error('useMenu has to be used within <MenuContext>')
    }

    return menuContext
}
