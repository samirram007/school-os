import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "#/components/ui/sheet"
import { useQuery } from "@tanstack/react-query"
import { tenantQueryOptions } from "../data/queryOption"
import { FormControl } from "#/components/ui/form"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "#/components/ui/command"
import { IconLoader } from "@tabler/icons-react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { Button } from "#/components/ui/button"
import { cn } from "#/lib/utils"
import type { Tenant } from "../data/schema"




export default function TenantSelect() {
    const [open, setOpen] = useState(false)
    const { data: fetchTenants, isPending } = useQuery(tenantQueryOptions())

    const items = useMemo(() => {
        return fetchTenants?.data?.map((tenant: any) => ({
            label: tenant.name,
            value: tenant.id.toString(),
        })) ?? []
    }, [fetchTenants])



    const handleSelect = (value: string) => {
        // VITE_APP_TENANT_ID
        // onValueChange?.(value)
        localStorage.setItem("tenant_id", value);
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>

            <SheetTrigger asChild>
                {/* <Button
                    type='button'
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    disabled={false}
                    className={cn('h-11 w-full justify-between')}
                >
                    {/* <span className='truncate text-left'>
                            {  'Select'}
                        </span> 
                    <p className='rounded-full border border-slate-300/80 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600'>
                        Trusted Access
                    </p>
                    <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button> */}
                <Button className='py-0 h-6! cursor-pointer rounded-full border border-slate-300/80 bg-white/85 
                px-3   text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 hover:text-slate-50'>
                    Trusted Access
                </Button>
            </SheetTrigger>


            <SheetContent side='right' className='p-0 sm:max-w-md'>
                <SheetHeader className="p-6">
                    <SheetTitle>{'Select option'}</SheetTitle>
                    <SheetDescription>
                        Search and choose a value from the list.
                    </SheetDescription>
                </SheetHeader>

                <Command className='h-full rounded-none border-0 shadow-none'>
                    <CommandInput placeholder='Search...' />
                    <CommandList className='max-h-[70vh]'>
                        {isPending ? (
                            <div className='flex items-center gap-2 px-3 py-4 text-sm text-muted-foreground'>
                                <IconLoader className='h-4 w-4 animate-spin' /> Loading...
                            </div>
                        ) : (
                            <>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {items?.map(({ label, value }: { label: string, value: string }) => (
                                        <CommandItem
                                            key={value}
                                            value={label}
                                            onSelect={() => handleSelect(value)}
                                        >
                                            <CheckIcon
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                )}
                                            />
                                            {label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </SheetContent>
        </Sheet >
    )
}
