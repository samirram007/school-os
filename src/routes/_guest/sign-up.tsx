import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guest/sign-up"!</div>
}
