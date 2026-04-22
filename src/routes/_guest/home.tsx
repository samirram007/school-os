import App from '#/features/App'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/home')({
  beforeLoad: async ({ context }) => {
    if (context.auth) {
      throw redirect({ to: '/user' });
    }
  },
  component: App,
})

