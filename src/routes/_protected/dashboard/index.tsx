import Dashboard from '#/features/app-modules/dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/')({
  component: RouteComponent,
  staticData: {
    breadcrumb: 'Home',
  },
})

function RouteComponent() {
  return <Dashboard />
}
