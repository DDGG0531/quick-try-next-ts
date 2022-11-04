import '../styles/globals.css'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../chakra'
import Header from '@/components/header'
import toast, { Toaster } from 'react-hot-toast'
import { GoogleAnalytics, event } from 'nextjs-google-analytics'

const gaMeasurementId = 'G-69L90MFTQJ'

export function reportWebVitals({
  id,
  name,
  label,
  value
}: NextWebVitalsMetric) {
  event(
    name,
    {
      category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
      label: id, // id unique to current page load
      nonInteraction: true // avoids affecting bounce rate.
    },
    gaMeasurementId
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 0
          }
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            const handleLocal = query.meta?.handleLocal
            if (!handleLocal) {
              toast.error(`全域有錯誤: ${error?.response.data.error}`)
            }
          }
        }),
        mutationCache: new MutationCache({
          onError: (error, _, __, mutation) => {
            const handleLocal = mutation.meta?.handleLocal
            if (!handleLocal) {
              toast.error(`全域有錯誤M: ${error?.response.data.error}`)
            }
          }
        })
      })
  )

  return (
    <>
      <GoogleAnalytics trackPageViews gaMeasurementId={gaMeasurementId} />

      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
        <Toaster />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
