import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import type { getContext } from './integrations/tanstack-query/root-provider';



export function getRouter() {

  const router = createTanStackRouter({
    routeTree,
    context: { auth: undefined!, queryClient: undefined! },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  // setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
    context: ReturnType<typeof getContext>;

  }
  interface StaticDataRouteOption {
    breadcrumb?: string
  }
}
