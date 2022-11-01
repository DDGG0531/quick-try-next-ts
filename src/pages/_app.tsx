import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import {
  createContext,
  startTransition,
  Suspense,
  useEffect,
  useRef,
  useState
} from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../chakra'
import Header from '@/components/header'
import toast, { Toaster } from 'react-hot-toast'
import { useTestStore } from '@/store/test'
import shallow from 'zustand/shallow'
import dynamic from 'next/dynamic'
import { store } from '@/libs/redux/store'

import { Provider } from 'react-redux'

export const BasicContext = createContext(undefined)

function MyApp({ Component, pageProps }: AppProps) {
  const [num, setNum] = useState(1)
  return (
    <Provider store={store}>
      <BasicContext.Provider
        value={{
          num,
          setNum
        }}
      >
        <Component {...pageProps} />
      </BasicContext.Provider>
    </Provider>
    // <QueryClientProvider client={queryClient}>
    //   <ChakraProvider theme={theme}>
    //     <Header />
    //     <Component {...pageProps} />
    //   </ChakraProvider>
    //   <Toaster />
    // </QueryClientProvider>
  )
}

export default MyApp
