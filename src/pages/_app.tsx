import '../styles/globals.css'
import type { AppProps } from 'next/app'
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
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
      <Toaster />
    </QueryClientProvider>
  )
}

export default MyApp
