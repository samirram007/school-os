import { cn } from '@/lib/utils'
import React from 'react'

interface MainProps extends React.HTMLAttributes<HTMLElement> {
    fixed?: boolean
    ref?: React.Ref<HTMLElement>
}

export const Main = ({ fixed, ...props }: MainProps) => {
    return (
        <main
            className={cn(
                'max-w-full flex flex-1 flex-col gap-4 p-4 pt-0',
                'peer-[.header-fixed]/header:mt-16',
                'px-2 py-0 md:px-2 2xl:px-3',
                fixed && 'fixed-main flex grow flex-col overflow-hidden',
                props.className
            )}
            {...props}
        />
    )
}

Main.displayName = 'Main'
