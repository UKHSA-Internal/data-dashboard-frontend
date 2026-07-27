'use client'

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { SessionProvider } from 'next-auth/react'
import * as React from 'react'

import { authEnabled } from '@/config/constants'

import { AcknowledgementRouteGuard } from './features/Acknowledgement/AcknowledgementRouteGuard'
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export function Providers(props: { children: React.ReactNode; isAuthenticated?: boolean }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {authEnabled ? (
        <SessionProvider>
          <AcknowledgementRouteGuard isAuthenticated={props.isAuthenticated ?? false}>
            <ReactQueryStreamedHydration>{props.children}</ReactQueryStreamedHydration>
          </AcknowledgementRouteGuard>
        </SessionProvider>
      ) : (
        <ReactQueryStreamedHydration>{props.children}</ReactQueryStreamedHydration>
      )}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  )
}
