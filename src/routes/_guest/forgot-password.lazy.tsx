import { createLazyFileRoute } from '@tanstack/react-router'
import ForgotPassword from '#/features/base-modules/auth/forgot-password'

export const Route = createLazyFileRoute('/_guest/forgot-password')({
  component: ForgotPassword,
})
