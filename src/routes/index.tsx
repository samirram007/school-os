import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.auth?.user) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='grid grid-cols-8 gap-8'>
    <Link to='/sign-in'>Login</Link>
    <Link to='/dashboard'>Dashboard</Link>

  </div>
}
