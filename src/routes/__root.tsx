import {

  Outlet,

  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router'





import type { QueryClient } from '@tanstack/react-query'
import type { AuthContextType } from '#/features/auth/contexts/auth-context'
import NotFoundError from '#/features/errors/not-found-error'
import GeneralError from '#/features/errors/general-error'
import { NavigationProgress } from '#/components/navigation-progress'

interface MyRouterContext {
  queryClient: QueryClient,
  auth: AuthContextType
}




export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <NavigationProgress />
      <Outlet />
    </>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})

