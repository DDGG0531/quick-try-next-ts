import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config'

const tailwind = resolveConfig(tailwindConfig)

const theme = extendTheme(
  {
    colors: { ...tailwind.theme.colors },
    breakpoints: {
      ...tailwind.theme.screens
    },
    styles: {
      global: () => ({
        body: {
          bg: 'green.light',
          color: 'gray.500'
        }
      })
    },
    // customize component
    components: {
      Button: {
        // example
        baseStyle: {
          borderRadius: '10px'
        },
        variants: {
          'with-shadow': {
            boxShadow: '0 0 2px 2px #efdfde'
          },
          // 'light-blue': {
          //   color: 'white',
          //   bg: 'blue.400',
          //   _hover: { bg: 'blue.500' },
          //   _active: {
          //     bg: 'blue.700'
          //   }
          // },
          lighter: props => ({
            color: 'white',
            bg: `${props.colorScheme}.400`,
            _hover: {
              bg: `${props.colorScheme}.500`
            },
            _active: {
              bg: `${props.colorScheme}.700`
            }
          })
        }
      }
    }
  },
  withDefaultColorScheme({
    colorScheme: 'green'
  })
)

export default theme
