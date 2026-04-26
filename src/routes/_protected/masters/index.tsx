
import { createFileRoute } from '@tanstack/react-router'

import MastersLanding from '@/features/masters/index'

export const Route = createFileRoute('/_protected/masters/')({
    component: MastersLanding,
})

