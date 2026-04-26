import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/(app)/menu/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/(app)/menu/"!</div>
}
