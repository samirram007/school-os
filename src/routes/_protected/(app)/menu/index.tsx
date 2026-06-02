import MenuComponent from '#/features/app-modules/menu'
import { menuQueryOptions } from '#/features/app-modules/menu/data/queryOptions'
import { Await, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/(app)/menu/')({
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(menuQueryOptions())
  },
  component: RouteComponent,
  staticData: {
    breadcrumb: 'Menu Settings',
  },
})

function RouteComponent() {
  return <MenuComponent />
}
