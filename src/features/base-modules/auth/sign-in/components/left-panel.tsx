export function LeftPanel() {
    return (
        <section className='flex items-center px-6 py-10 sm:px-10 lg:px-16 xl:px-20'>
            <div className='w-full max-w-2xl'>
                {/* Brand */}
                <div className='mb-5 flex items-center gap-2.5 sm:mb-8'>
                    <div className='flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 shadow-[0_4px_12px_-4px_rgba(59,130,246,0.35)]'>
                        <svg viewBox='0 0 20 20' fill='white' className='size-[18px]'>
                            <path d='M10 2a1 1 0 0 1 .993.883L11 3v1.5a1 1 0 0 1-1.993.117L9 4.5V3a1 1 0 0 1 1-1Z' />
                            <path d='M5.5 4.5a1 1 0 0 1 1.414 0l1.06 1.06a1 1 0 0 1-1.414 1.414L5.5 5.914a1 1 0 0 1 0-1.414Z' />
                            <path d='M14.5 4.5a1 1 0 0 1 0 1.414l-1.06 1.06a1 1 0 1 1-1.414-1.414l1.06-1.06a1 1 0 0 1 1.414 0Z' />
                            <path d='M10 6a4 4 0 0 1 4 4v5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-5a4 4 0 0 1 4-4Z' />
                        </svg>
                    </div>
                    <span className='text-lg font-bold tracking-tight text-slate-800'>PolyERP</span>
                </div>

                {/* Badge */}
                <p className='mb-5 inline-flex items-center gap-1.5 rounded-full border border-blue-200/70 bg-blue-50/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700'>
                    <span className='size-1.5 rounded-full bg-blue-500/60' />
                    Secure Access Portal
                </p>

                {/* Heading */}
                <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl'>
                    Your Enterprise
                    <span className='block bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent'>
                        Control Center
                    </span>
                </h1>
                <p className='mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:mt-4 sm:text-base lg:text-lg'>
                    Log in to manage approvals, monitor live operations, and keep your
                    business decisions backed by protected real-time intelligence.
                </p>

                {/* Dashboard Preview Card */}
                <div className='mt-8 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:mt-10 sm:p-6'>
                    <svg
                        viewBox='0 0 620 260'
                        aria-hidden='true'
                        className='h-auto w-full'
                    >
                        <defs>
                            <linearGradient id='barBlue' x1='0%' x2='0%' y1='100%' y2='0%'>
                                <stop offset='0%' stopColor='#dbeafe' />
                                <stop offset='100%' stopColor='#3b82f6' />
                            </linearGradient>
                            <linearGradient id='barCyan' x1='0%' x2='0%' y1='100%' y2='0%'>
                                <stop offset='0%' stopColor='#cffafe' />
                                <stop offset='100%' stopColor='#06b6d4' />
                            </linearGradient>
                            <linearGradient id='barBlueLight' x1='0%' x2='0%' y1='100%' y2='0%'>
                                <stop offset='0%' stopColor='#eff6ff' />
                                <stop offset='100%' stopColor='#60a5fa' />
                            </linearGradient>
                            <filter id='cardShadow'>
                                <feDropShadow dx='0' dy='1' stdDeviation='2' floodOpacity='0.04' />
                            </filter>
                        </defs>
                        {/* Card backdrop */}
                        <rect x='0' y='0' width='620' height='260' rx='16' fill='#f8fafc' stroke='#e2e8f0' />
                        {/* Mini header bar */}
                        <rect x='20' y='18' width='580' height='32' rx='8' fill='#f1f5f9' />
                        <circle cx='36' cy='34' r='4' fill='#94a3b8' />
                        <rect x='52' y='28' width='60' height='12' rx='4' fill='#cbd5e1' />
                        <rect x='460' y='26' width='40' height='16' rx='6' fill='#dbeafe' />
                        <text x='467' y='38' fill='#3b82f6' fontSize='9' fontWeight='600'>LIVE</text>
                        {/* Bar chart */}
                        <rect x='36' y='175' width='28' height='55' rx='4' fill='url(#barBlue)' filter='url(#cardShadow)' />
                        <rect x='74' y='152' width='28' height='78' rx='4' fill='url(#barBlue)' filter='url(#cardShadow)' />
                        <rect x='112' y='130' width='28' height='100' rx='4' fill='url(#barCyan)' filter='url(#cardShadow)' />
                        <rect x='150' y='145' width='28' height='85' rx='4' fill='url(#barBlueLight)' filter='url(#cardShadow)' />
                        <rect x='188' y='120' width='28' height='110' rx='4' fill='url(#barCyan)' filter='url(#cardShadow)' />
                        <rect x='226' y='158' width='28' height='72' rx='4' fill='url(#barBlueLight)' filter='url(#cardShadow)' />
                        <rect x='264' y='135' width='28' height='95' rx='4' fill='url(#barBlue)' filter='url(#cardShadow)' />
                        {/* Mini line chart on the right */}
                        <path d='M330 200 Q354 180 378 188 Q402 162 426 170 Q450 140 474 155 Q498 125 522 148 Q546 115 570 140' fill='none' stroke='#3b82f6' strokeWidth='2.5' strokeLinecap='round' />
                        <path d='M330 200 Q354 190 378 195 Q402 178 426 182 Q450 160 474 170 Q498 148 522 165 Q546 138 570 158' fill='none' stroke='#06b6d4' strokeWidth='2' strokeLinecap='round' />
                        {/* Grid lines */}
                        <line x1='330' y1='140' x2='570' y2='140' stroke='#f1f5f9' strokeWidth='1' />
                        <line x1='330' y1='170' x2='570' y2='170' stroke='#f1f5f9' strokeWidth='1' />
                        <line x1='330' y1='200' x2='570' y2='200' stroke='#f1f5f9' strokeWidth='1' />
                        {/* Bottom stats */}
                        <rect x='36' y='228' width='8' height='8' rx='2' fill='#3b82f6' />
                        <text x='50' y='236' fill='#64748b' fontSize='9'>Revenue</text>
                        <rect x='120' y='228' width='8' height='8' rx='2' fill='#06b6d4' />
                        <text x='134' y='236' fill='#64748b' fontSize='9'>Orders</text>
                        <rect x='204' y='228' width='8' height='8' rx='2' fill='#60a5fa' />
                        <text x='218' y='236' fill='#64748b' fontSize='9'>Users</text>
                    </svg>
                </div>

                {/* Feature cards */}
                <div className='mt-6 grid grid-cols-1 gap-2 text-sm sm:mt-8 sm:gap-3 sm:grid-cols-3'>
                    <div className='group rounded-xl border border-slate-200/70 bg-white/90 p-3.5 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-blue-200/80 hover:shadow-[0_4px_16px_-8px_rgba(59,130,246,0.12)]'>
                        <div className='mb-2 flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100'>
                            <svg viewBox='0 0 16 16' fill='currentColor' className='size-4'>
                                <path d='M8 1a.5.5 0 0 1 .5.5V3a.5.5 0 0 1-1 0V1.5A.5.5 0 0 1 8 1ZM3.11 3.11a.5.5 0 0 1 .707 0l1.06 1.06a.5.5 0 0 1-.707.707L3.11 3.818a.5.5 0 0 1 0-.707Zm9.78 0a.5.5 0 0 1 0 .707l-1.06 1.06a.5.5 0 0 1-.707-.707l1.06-1.06a.5.5 0 0 1 .707 0ZM8 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z' />
                            </svg>
                        </div>
                        <p className='font-semibold text-slate-800'>Encrypted Sessions</p>
                        <p className='mt-0.5 text-xs leading-relaxed text-slate-500'>Secure login and transport-level protection.</p>
                    </div>
                    <div className='group rounded-xl border border-slate-200/70 bg-white/90 p-3.5 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-cyan-200/80 hover:shadow-[0_4px_16px_-8px_rgba(6,182,212,0.12)]'>
                        <div className='mb-2 flex size-7 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 transition-colors group-hover:bg-cyan-100'>
                            <svg viewBox='0 0 16 16' fill='currentColor' className='size-4'>
                                <path d='M13.5 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L3.707 7.5H13a.5.5 0 0 1 .5.5Z' />
                            </svg>
                        </div>
                        <p className='font-semibold text-slate-800'>Permission Layers</p>
                        <p className='mt-0.5 text-xs leading-relaxed text-slate-500'>Role-based controls for each critical action.</p>
                    </div>
                    <div className='group rounded-xl border border-slate-200/70 bg-white/90 p-3.5 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-blue-200/80 hover:shadow-[0_4px_16px_-8px_rgba(96,165,250,0.12)]'>
                        <div className='mb-2 flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100'>
                            <svg viewBox='0 0 16 16' fill='currentColor' className='size-4'>
                                <path d='M8 1a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1ZM2 6a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1Zm10 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1ZM4.05 5.464a1 1 0 0 1 1.414 0l1.06 1.06a1 1 0 0 1-1.414 1.415l-1.06-1.06a1 1 0 0 1 0-1.415Zm7.78 0a1 1 0 0 1 0 1.415l-1.06 1.06a1 1 0 1 1-1.414-1.415l1.06-1.06a1 1 0 0 1 1.414 0ZM8 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' />
                            </svg>
                        </div>
                        <p className='font-semibold text-slate-800'>Live Visibility</p>
                        <p className='mt-0.5 text-xs leading-relaxed text-slate-500'>Instant status and performance monitoring.</p>
                    </div>
                </div>

                {/* Footer */}
                <p className='mt-6 text-xs text-slate-400 sm:mt-8'>
                    &copy; {new Date().getFullYear()} PolyERP. All rights reserved.
                </p>
            </div>
        </section>
    )
}