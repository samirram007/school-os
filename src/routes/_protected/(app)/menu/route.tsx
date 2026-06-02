import MenuProvider from '#/features/app-modules/menu/contexts/menu-context'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/(app)/menu')({
  component: () => <MenuProvider>
    <Outlet />
  </MenuProvider>,
})


