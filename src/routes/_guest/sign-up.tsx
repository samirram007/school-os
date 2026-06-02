import { createFileRoute } from '@tanstack/react-router'
import SignUp from '@/features/base-modules/auth/sign-up'

export const Route = createFileRoute('/_guest/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignUp />
}
