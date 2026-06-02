'use client'

import { useField } from '@tanstack/react-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SelectDropdown } from '@/components/select-dropdown'
import { PasswordInput } from '@/components/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { capitalizeAllWords, lowerCase } from '@/utils/format-utils'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
  CommandEmpty,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import type { z } from 'zod'

export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'date' | 'hidden' | 'password'

export type SelectOption = { label: string; value: string }

type AppFormFieldProps = {
  form: any
  name: string
  label?: string
  type?: FieldType
  placeholder?: string
  disabled?: boolean
  noLabel?: boolean
  className?: string
  gapClass?: string
  rtl?: boolean
  validator?: z.ZodType<any, any, any>
  options?: SelectOption[]
  items?: SelectOption[]
  sheetTitle?: string
  isPending?: boolean
  [key: string]: any
}

export function AppFormField(props: AppFormFieldProps) {
  const {
    form,
    name,
    label,
    type = 'text',
    options,
    items,
    placeholder,
    disabled,
    noLabel,
    className,
    gapClass,
    rtl,
    sheetTitle,
    isPending,
    validator,
    ...rest
  } = props

  const field = useField({
    form,
    name,
    ...(validator
      ? {
          validators: {
            onChange: ({ value }: { value: any }) => {
              const result = validator.safeParse(value)
              if (!result.success) return result.error.issues[0]?.message
              return undefined
            },
            onBlur: ({ value }: { value: any }) => {
              const result = validator.safeParse(value)
              if (!result.success) return result.error.issues[0]?.message
              return undefined
            },
          },
        }
      : {}),
  })

  const error = field.state.meta.errors?.[0]
  const showError = field.state.meta.isTouched && error

  const toValue = (val: any): string | number | readonly string[] | undefined => {
    if (val == null) return ''
    if (typeof val === 'string' || typeof val === 'number') return val
    return ''
  }

  const renderField = () => {
    switch (type) {
      case 'select':
        return (
          <SelectDropdown
            defaultValue={field.state.value?.toString() ?? ''}
            onValueChange={(value) => field.handleChange(value)}
            placeholder={placeholder ?? `Select a ${label ?? capitalizeAllWords(name)}`}
            disabled={disabled}
            isPending={isPending}
            className='w-full'
            items={(items ?? options) as SelectOption[] | undefined}
            sheetTitle={sheetTitle ?? label ?? capitalizeAllWords(name)}
          />
        )

      case 'multiselect': {
        const selectedValues: string[] = Array.isArray(field.state.value) ? field.state.value : []
        const multiItems = (items ?? options) as SelectOption[] | undefined
        return (
          <MultiSelectField
            value={selectedValues}
            onChange={(newValues) => field.handleChange(newValues)}
            items={multiItems ?? []}
            label={label ?? name}
            disabled={disabled}
          />
        )
      }

      case 'checkbox': {
        const checkboxOptions = options ?? []
        const currentValue = field.state.value

        const isChecked =
          typeof currentValue === 'boolean'
            ? currentValue
            : currentValue === 'active' || currentValue === true

        return (
          <div className='flex items-center gap-2'>
            <Checkbox
              id={name}
              checked={isChecked}
              onCheckedChange={(checked) => {
                if (checkboxOptions.length > 0) {
                  field.handleChange(checked ? checkboxOptions[0].value : (checkboxOptions[1]?.value ?? false))
                } else {
                  field.handleChange(checked)
                }
              }}
              disabled={disabled}
            />
            {checkboxOptions.length > 0 && (
              <Badge variant={isChecked ? 'default' : 'secondary'} className='cursor-pointer'>
                {(() => {
                  const selected = checkboxOptions.find((opt) => opt.value === currentValue)
                  return selected ? selected.label : isChecked ? 'Yes' : 'No'
                })()}
              </Badge>
            )}
          </div>
        )
      }

      case 'textarea':
        return (
          <Textarea
            value={toValue(field.state.value)}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder ?? `Enter ${lowerCase(label ?? name)}`}
            className='resize-none w-full'
            disabled={disabled}
            {...rest}
          />
        )

      case 'password':
        return (
          <PasswordInput
            value={toValue(field.state.value)}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder ?? '********'}
            disabled={disabled}
            className={className}
          />
        )

      case 'date':
        return (
          <Input
            type='date'
            value={
              typeof field.state.value === 'string' && field.state.value.includes('T')
                ? field.state.value.split('T')[0]
                : toValue(field.state.value)
            }
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder ?? `Enter ${lowerCase(label ?? name)}`}
            className='w-full'
            disabled={disabled}
            {...rest}
          />
        )

      case 'hidden':
        return <input type='hidden' value={toValue(field.state.value)} readOnly />

      case 'number':
        return (
          <Input
            type='number'
            value={toValue(field.state.value)}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder ?? `Enter ${lowerCase(label ?? name)}`}
            className='w-full'
            disabled={disabled}
            autoComplete='off'
            {...rest}
          />
        )

      default: // text
        return (
          <Input
            value={toValue(field.state.value)}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder ?? `Enter ${lowerCase(label ?? name)}`}
            className='w-full'
            disabled={disabled}
            autoComplete='off'
            {...rest}
          />
        )
    }
  }

  if (type === 'hidden') {
    return renderField()
  }

  const defaultGapClass = 'grid grid-cols-1 items-start space-y-0 gap-x-4 gap-y-2 sm:grid-cols-[100px_1fr] sm:items-center sm:gap-y-1'

  return (
    <div className={cn(defaultGapClass, gapClass, className)}>
      {!noLabel && (
        <Label className={cn('min-w-0', rtl ? 'order-last' : '')} htmlFor={name}>
          {label ?? capitalizeAllWords(name)}
        </Label>
      )}
      <div className='space-y-1.5'>
        {renderField()}
        {showError && (
          <p className='text-sm font-medium text-destructive'>{error}</p>
        )}
      </div>
    </div>
  )
}

function MultiSelectField({
  value,
  onChange,
  items,
  label,
  disabled,
}: {
  value: string[]
  onChange: (val: string[]) => void
  items: SelectOption[]
  label: string
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)

  const toggleValue = (itemValue: string) => {
    const newValues = value.includes(itemValue)
      ? value.filter((v) => v !== itemValue)
      : [...value, itemValue]
    onChange(newValues)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          role='combobox'
          className='justify-between w-full'
          disabled={disabled}
        >
          {value.length > 0 ? `${value.length} selected` : `Select ${label}`}
          <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[250px]'>
        <Command>
          <CommandInput placeholder='Search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => toggleValue(item.value)}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${value.includes(item.value) ? 'opacity-100' : 'opacity-0'}`}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default AppFormField
