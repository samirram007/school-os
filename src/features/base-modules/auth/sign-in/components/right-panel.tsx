import { Card } from '@/components/ui/card'
import { LoginPanelBackground } from './login-panel-background'
import { UserAuthForm } from './user-auth-form'
export function RightPanel() {
    return (
        <LoginPanelBackground>
            <Card className='relative overflow-hidden rounded-[24px] border border-white/80 bg-white/72 p-5 shadow-[0_24px_56px_-34px_rgba(59,130,246,0.12)] backdrop-blur-md sm:rounded-[28px] sm:p-7 xl:p-8'>
                <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-200/70 to-transparent' />
                <div className='pointer-events-none absolute -right-20 -top-20 h-36 w-36 rounded-full bg-blue-200/35 blur-3xl' />

                <div className='relative'>
                    <div className='mb-6 flex items-center justify-between border-b border-blue-100/70 pb-4'>
                        <div className='text-sm font-semibold tracking-wide text-blue-600/70'>
                            {import.meta.env.VITE_APP_NAME}
                        </div>
                    </div>

                    <div className='flex flex-col space-y-2 text-left'>
                        <h2 className='text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl'>
                            Welcome Back
                        </h2>
                        <p className='text-sm text-blue-600/65'>
                            Sign in to continue to your secure dashboard and daily workflows.
                        </p>
                    </div>

                    <div className='mt-6 rounded-2xl border border-blue-100/80 bg-white/88 p-4 shadow-[0_14px_34px_-26px_rgba(59,130,246,0.10)] sm:p-5'>
                        <UserAuthForm className='mt-0' />
                    </div>

                    <p className='mt-5 border-t border-blue-100 px-2 pt-4 text-center text-xs leading-relaxed text-blue-500/60 sm:px-4 sm:text-sm'>
                        By clicking login, you agree to our{' '}
                        <a
                            href='/terms'
                            className='underline underline-offset-4 transition-colors hover:text-blue-800'
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            href='/privacy'
                            className='underline underline-offset-4 transition-colors hover:text-blue-800'
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </Card>
        </LoginPanelBackground>
    )
}