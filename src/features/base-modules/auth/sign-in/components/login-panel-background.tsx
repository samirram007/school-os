import { useMemo, useState   } from 'react'
import type {MouseEvent, ReactNode} from 'react';

type LoginPanelBackgroundProps = {
    children: ReactNode
}

export function LoginPanelBackground({ children }: LoginPanelBackgroundProps) {
    const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 })

    const lineArtTransform = useMemo(
        () => ({ transform: `translate(${pointerOffset.x}px, ${pointerOffset.y}px)` }),
        [pointerOffset.x, pointerOffset.y]
    )

    const glowTransform = useMemo(
        () => ({ transform: `translate(${pointerOffset.x * -1.5}px, ${pointerOffset.y * -1.5}px)` }),
        [pointerOffset.x, pointerOffset.y]
    )

    const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        setPointerOffset({
            x: x * 18,
            y: y * 14,
        })
    }

    const handleMouseLeave = () => {
        setPointerOffset({ x: 0, y: 0 })
    }

    return (
        <section
            className='relative flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-white to-cyan-50 px-6 py-10 sm:px-10 lg:px-12'
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.7),transparent_50%),radial-gradient(circle_at_90%_85%,rgba(6,182,212,0.04),transparent_50%)]' />
            <div
                className='pointer-events-none absolute -right-16 top-12 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl transition-transform duration-300 ease-out'
                style={glowTransform}
            />
            <style>{`
        .line-art-grid {
          stroke-dasharray: 6 10;
          animation: lineGridShift 24s linear infinite;
        }

        .line-art-flow {
          stroke-dasharray: 10 14;
          animation: lineFlowShift 16s linear infinite;
        }

        .line-art-wrap {
          animation: lineArtFloat 18s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes lineGridShift {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -160; }
        }

        @keyframes lineFlowShift {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -220; }
        }

        @keyframes lineArtFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
            <svg
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 h-full w-full opacity-50 transition-transform duration-300 ease-out'
                viewBox='0 0 800 900'
                preserveAspectRatio='none'
                style={lineArtTransform}
            >
                <g className='line-art-wrap'>
                    <defs>
                        <linearGradient id='lineArtStroke' x1='0%' y1='0%' x2='100%' y2='100%'>
                            <stop offset='0%' stopColor='rgba(59,130,246,0.06)' />
                            <stop offset='100%' stopColor='rgba(6,182,212,0.15)' />
                        </linearGradient>
                    </defs>
                    <path className='line-art-grid' d='M0 130 H800' stroke='url(#lineArtStroke)' strokeWidth='1' />
                    <path className='line-art-grid' d='M0 250 H800' stroke='url(#lineArtStroke)' strokeWidth='1' />
                    <path className='line-art-grid' d='M0 370 H800' stroke='url(#lineArtStroke)' strokeWidth='1' />
                    <path className='line-art-grid' d='M0 490 H800' stroke='url(#lineArtStroke)' strokeWidth='1' />
                    <path className='line-art-grid' d='M0 610 H800' stroke='url(#lineArtStroke)' strokeWidth='1' />
                    <path className='line-art-grid' d='M120 0 V900' stroke='url(#lineArtStroke)' strokeWidth='1' />
                    <path className='line-art-grid' d='M300 0 V900' stroke='url(#lineArtStroke)' strokeWidth='1' />
                    <path className='line-art-grid' d='M480 0 V900' stroke='url(#lineArtStroke)' strokeWidth='1' />
                    <path className='line-art-grid' d='M660 0 V900' stroke='url(#lineArtStroke)' strokeWidth='1' />
                    <path className='line-art-flow' d='M-40 720 Q220 540 520 700 T860 650' fill='none' stroke='rgba(59,130,246,0.12)' strokeWidth='1.2' />
                    <path className='line-art-flow' d='M-60 790 Q190 620 470 760 T860 725' fill='none' stroke='rgba(6,182,212,0.10)' strokeWidth='1' />
                </g>
            </svg>
            <div className='w-full max-w-lg'>{children}</div>
        </section>
    )
}