import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react';
import { Check, Loader2 } from 'lucide-react';
import { Link, useRouter } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useEffect, useRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { toast } from 'sonner';

import { useAuth } from '../../contexts/auth-context';
import { useLoginMutation } from '../../data/queryOptions';
import { clean_logout, clearAllCookies } from '#/utils/protectedRoute';
import { PasswordInput } from '#/components/password-input';
import { authRequestSchema, type AuthRequest } from '../../data/schema';
 
import { Label } from '#/components/ui/label';

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

 
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { successfullLogin } = useAuth();
  const loginMutation = useLoginMutation()
  const router = useRouter()
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as AuthRequest,
    onSubmit: async ({ value }) => {
      //console.log("Submitting form with values:", value);
      loginMutation.mutate(value,{
        onSuccess: async (data) => {
          setIsLoadingProfile(true);
          try {
            const loggedIn = await successfullLogin(data);
            if (!mountedRef.current) return
            if (loggedIn) {
              toast.success('Login successful!');
              setIsSuccess(true);
              setIsLoadingProfile(false);
              await new Promise((resolve) => setTimeout(resolve, 800));
              if (!mountedRef.current) return
              router.navigate({to: '/dashboard'})
            } else {
              toast.error('Login failed: Unable to load user profile. Please try again.');
            }
          } finally {
            if (!mountedRef.current) return
            setIsLoadingProfile(false);
            setIsSuccess(false);
          }
        },
        onError: (error) => {
          toast.error((error as Error)?.message || 'Login failed. Please try again.')
        },
      })
    },
  })

  return (
    <div className={cn('grid gap-5', className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className='grid gap-3'>
          <form.Field
            name='email'
            validators={{
              onChange: ({ value }) => {
                const result = authRequestSchema.shape.email.safeParse(value)
                if (!result.success) return result.error.issues[0]?.message
                return undefined
              },
              onBlur: ({ value }) => {
                const result = authRequestSchema.shape.email.safeParse(value)
                if (!result.success) return result.error.issues[0]?.message
                return undefined
              },
            }}
            children={(field) => (
              <div className='space-y-1.5'>
                <Label className='text-sm font-medium leading-none text-slate-700'>
                  Email
                </Label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={form.state.isSubmitting || isLoadingProfile || isSuccess}
                  placeholder='name@example.com'
                  className='rounded-lg border border-slate-200 bg-white shadow-sm focus-within:border-cyan-500/60 focus-within:ring-2 focus-within:ring-cyan-500/40'
                />
                {field.state.meta.errors.length > 0 && (
                  <p className='text-sm font-medium text-destructive'>
                    {field.state.meta.errors.join(', ')}
                  </p>
                )}
              </div>
            )}
          />

          <form.Field
            name='password'
            validators={{
              onChange: ({ value }) => {
                const result = authRequestSchema.shape.password.safeParse(value)
                if (!result.success) return result.error.issues[0]?.message
                return undefined
              },
              onBlur: ({ value }) => {
                const result = authRequestSchema.shape.password.safeParse(value)
                if (!result.success) return result.error.issues[0]?.message
                return undefined
              },
            }}
            children={(field) => (
              <div className='space-y-1.5'>
                <div className='flex items-center justify-between'>
                  <Label className='text-sm font-medium leading-none text-slate-700'>
                    Password
                  </Label>
                  <Link
                    to='/forgot-password'
                    className='text-sm font-medium text-muted-foreground underline-offset-4 hover:text-cyan-700 hover:underline'
                  >
                    Forgot password?
                  </Link>
                </div>
                <PasswordInput
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={form.state.isSubmitting || isLoadingProfile || isSuccess}
                  placeholder='********'
                  className='border-slate-200 bg-white shadow-sm focus-visible:border-cyan-500/60 focus-visible:ring-cyan-500/40'
                />
                {field.state.meta.errors.length > 0 && (
                  <p className='text-sm font-medium text-destructive'>
                    {field.state.meta.errors.join(', ')}
                  </p>
                )}
              </div>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => {
              const loading = isSubmitting || isLoadingProfile
              const disabled = !canSubmit || loading || isSuccess
              return (
                <Button
                  type='submit'
                  className='mt-2 h-11 text-base font-semibold relative overflow-hidden bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
                  disabled={disabled}
                >
                  <div
                    className='absolute inset-0 bg-linear-to-r from-emerald-500 to-green-600 transition-opacity duration-500 pointer-events-none'
                    style={{ opacity: isSuccess ? 1 : 0 }}
                  />
                  <span className='relative z-10 inline-flex items-center'>
                    {isSuccess && <Check className='mr-2 h-4 w-4 scale-in text-white' />}
                    {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                    {isSuccess ? 'Welcome!' : loading ? 'Logging in...' : 'Login'}
                  </span>
                </Button>
              )
            }}
          />

          <div className='relative my-2'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative hidden justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='hidden items-center gap-2'>
            <Button
              variant='outline'
              className='w-1/2'
              type='button'
            >
              <IconBrandGithub className='h-4 w-4' /> GitHub
            </Button>
            <Button
              variant='outline'
              className='w-1/2'
              type='button'
            >
              <IconBrandFacebook className='h-4 w-4' /> Facebook
            </Button>
          </div>
        </div>
      </form>
      <FailSafe />
    </div>
  )
}

const FailSafe = () => {
  const handleClick = () => {
    clean_logout();
    clearAllCookies();
  }

  return (
    <div
      onClick={handleClick}
      className='text-xs text-center text-slate-500 cursor-pointer hover:text-cyan-700 hover:underline'
    >
      Click here if you are facing issues logging in.
    </div>
  )
}