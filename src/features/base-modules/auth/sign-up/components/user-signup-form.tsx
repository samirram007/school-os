import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Check, Loader2 } from 'lucide-react';
import { Link, useRouter } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useEffect, useRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { toast } from 'sonner';

import { useAuth } from '../../contexts/auth-context';
import { useSignupMutation } from '../../data/queryOptions';
import { signupFormSchema, type SignupFormValues } from '../../data/schema';
import { PasswordInput } from '#/components/password-input';
import { Label } from '#/components/ui/label';

type UserSignUpFormProps = HTMLAttributes<HTMLDivElement>;

export function UserSignUpForm({ className, ...props }: UserSignUpFormProps) {
  const { successfullLogin } = useAuth()
  const signupMutation = useSignupMutation()
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
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    } as SignupFormValues,
    onSubmit: async ({ value }) => {
      signupMutation.mutate(value, {
        onSuccess: async (data) => {
          setIsLoadingProfile(true)
          try {
            const loggedIn = await successfullLogin(data)
            if (loggedIn) {
              if (!mountedRef.current) return
              toast.success('Account created successfully!')
              setIsSuccess(true)
              setIsLoadingProfile(false)
              await new Promise((resolve) => setTimeout(resolve, 800))
              if (!mountedRef.current) return
              router.navigate({ to: '/dashboard' })
            } else {
              toast.error('Sign up failed: Unable to load user profile. Please try again.')
            }
          } finally {
            if (!mountedRef.current) return
            setIsLoadingProfile(false)
            setIsSuccess(false)
          }
        },
        onError: (error) => {
          toast.error((error as Error)?.message || 'Sign up failed. Please try again.')
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
            name='name'
            validators={{
              onChange: ({ value }) => {
                const result = signupFormSchema.shape.name.safeParse(value)
                if (!result.success) return result.error.issues[0]?.message
                return undefined
              },
              onBlur: ({ value }) => {
                const result = signupFormSchema.shape.name.safeParse(value)
                if (!result.success) return result.error.issues[0]?.message
                return undefined
              },
            }}
            children={(field) => (
              <div className='space-y-1.5'>
                <Label className='text-sm font-medium leading-none text-slate-700'>
                  Full Name
                </Label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={signupMutation.isPending || isLoadingProfile || isSuccess}
                  placeholder='John Doe'
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
            name='email'
            validators={{
              onChange: ({ value }) => {
                const result = signupFormSchema.shape.email.safeParse(value)
                if (!result.success) return result.error.issues[0]?.message
                return undefined
              },
              onBlur: ({ value }) => {
                const result = signupFormSchema.shape.email.safeParse(value)
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
                  disabled={signupMutation.isPending || isLoadingProfile || isSuccess}
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
                const result = signupFormSchema.shape.password.safeParse(value)
                if (!result.success) return result.error.issues[0]?.message
                return undefined
              },
              onBlur: ({ value }) => {
                const result = signupFormSchema.shape.password.safeParse(value)
                if (!result.success) return result.error.issues[0]?.message
                return undefined
              },
            }}
            children={(field) => (
              <div className='space-y-1.5'>
                <Label className='text-sm font-medium leading-none text-slate-700'>
                  Password
                </Label>
                <PasswordInput
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={signupMutation.isPending || isLoadingProfile || isSuccess}
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

          <form.Field
            name='password_confirmation'
            validators={{
              onChange: ({ value, fieldApi }) => {
                const passwordField = fieldApi.form.getFieldValue('password')
                if (value !== passwordField) {
                  return "Passwords don't match"
                }
                return undefined
              },
              onBlur: ({ value, fieldApi }) => {
                const passwordField = fieldApi.form.getFieldValue('password')
                if (value !== passwordField) {
                  return "Passwords don't match"
                }
                return undefined
              },
            }}
            children={(field) => (
              <div className='space-y-1.5'>
                <Label className='text-sm font-medium leading-none text-slate-700'>
                  Confirm Password
                </Label>
                <PasswordInput
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={signupMutation.isPending || isLoadingProfile || isSuccess}
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
              const loading = isSubmitting || signupMutation.isPending || isLoadingProfile
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
                    {isSuccess ? 'Welcome!' : loading ? 'Signing up...' : 'Sign Up'}
                  </span>
                </Button>
              )
            }}
          />

          <div className='text-center text-sm text-slate-500'>
            Already have an account?{' '}
            <Link
              to='/sign-in'
              className='font-medium text-cyan-600 hover:text-cyan-700 hover:underline'
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
