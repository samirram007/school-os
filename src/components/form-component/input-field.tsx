import { Link } from "@tanstack/react-router"
import { Label } from "../ui/label"
import { Input } from "../ui/input"



export function InputField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='space-y-1.5'>
      <Label className='text-sm font-medium leading-none text-slate-700'>
        {label}
      </Label>
      <Input {...props} />
    </div>
  )
}

export function PasswordInputField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='space-y-1.5'>
      <div className='flex items-center justify-between'>
        <Label className='text-sm font-medium leading-none text-slate-700'>
          {label}
        </Label>
        <Link
          to='/forgot-password'
          className='text-sm font-medium text-muted-foreground underline-offset-4 hover:text-cyan-700 hover:underline'
        >
          Forgot password?
        </Link>
      </div>
      <Input type='password' {...props} />
    </div>
  )
}