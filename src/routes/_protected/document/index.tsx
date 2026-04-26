import DocumentPage from '#/features/base-modules/document'
import DocumentProvider from '#/features/base-modules/document/contexts/document-context'
import { documentQueryOptions } from '#/features/base-modules/document/data/queryOptions'

import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_protected/document/')({
  loader: async ({ context }) => {

    return await context.queryClient.ensureQueryData(documentQueryOptions())
  },
  component: RouteComponent,
  staticData: {
    breadcrumb: 'Documents',
  },
})

function RouteComponent() {
  return <Suspense fallback={<div>Loading Document...</div>}>
    <DocumentProvider>

      <DocumentPage />
    </DocumentProvider>
  </Suspense>
}
