import ProtectedLayout from '#/layouts/protected/ProtectedLayout'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({

    beforeLoad: ({ context, location }) => {

        if (!context.auth?.user) {
            throw redirect({
                to: '/sign-in',
                search: {
                    redirect: location.href,
                },
            })
        }
    },

    component: () => <ProtectedLayout />,
})

