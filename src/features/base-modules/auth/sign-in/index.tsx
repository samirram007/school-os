import { LeftPanel } from './components/left-panel'
import { RightPanel } from './components/right-panel'

export default function SignIn() {
  return (
    <div className='relative min-h-svh overflow-hidden bg-white'>
      <div className='pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-20 right-1/3 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl' />
      <div className='pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl' />

      <div className='relative grid min-h-svh lg:grid-cols-[1.2fr_0.8fr]'>
        <div className='lg:order-2'>
          <RightPanel />
        </div>
        <div className='lg:order-1'>
          <LeftPanel />
        </div>
      </div>
    </div >
  )
}
