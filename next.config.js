/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  typescript: {
    // 暫時
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  }
}

// const fs = require('fs')
// const getDirectories = source =>
//   fs
//     .readdirSync(source, { withFileTypes: true })
//     .filter(dirent => dirent.isDirectory())
//     .map(dirent => `@chakra-ui/${dirent.name}`)

// const arr = getDirectories('node_modules/@chakra-ui')
// const withTM = require('next-transpile-modules')([...arr]) // pass the modules you would like to see transpiled

// const packageJSON = require('./package.json')
// const transpiledPackages = Object.keys(packageJSON.dependencies).filter(it =>
//   it.includes('@chakra-ui/')
// )

// const withTM = require('next-transpile-modules')(
//   [
//     '@chakra-ui/accordion',
//     '@chakra-ui/alert',
//     '@chakra-ui/anatomy',
//     '@chakra-ui/avatar',
//     '@chakra-ui/breadcrumb',
//     '@chakra-ui/breakpoint-utils',
//     '@chakra-ui/button',
//     '@chakra-ui/checkbox',
//     '@chakra-ui/clickable',
//     '@chakra-ui/close-button',
//     '@chakra-ui/color-mode',
//     '@chakra-ui/control-box',
//     '@chakra-ui/counter',
//     '@chakra-ui/css-reset',
//     '@chakra-ui/descendant',
//     '@chakra-ui/dom-utils',
//     '@chakra-ui/editable',
//     '@chakra-ui/event-utils',
//     '@chakra-ui/focus-lock',
//     '@chakra-ui/form-control',
//     '@chakra-ui/hooks',
//     '@chakra-ui/icon',
//     '@chakra-ui/image',
//     '@chakra-ui/input',
//     '@chakra-ui/layout',
//     '@chakra-ui/lazy-utils',
//     '@chakra-ui/live-region',
//     '@chakra-ui/media-query',
//     '@chakra-ui/menu',
//     '@chakra-ui/modal',
//     '@chakra-ui/number-input',
//     '@chakra-ui/number-utils',
//     '@chakra-ui/object-utils',
//     '@chakra-ui/pin-input',
//     '@chakra-ui/popover',
//     '@chakra-ui/popper',
//     '@chakra-ui/portal',
//     '@chakra-ui/progress',
//     '@chakra-ui/provider',
//     '@chakra-ui/radio',
//     '@chakra-ui/react',
//     '@chakra-ui/react-children-utils',
//     '@chakra-ui/react-context',
//     '@chakra-ui/react-env',
//     '@chakra-ui/react-types',
//     '@chakra-ui/react-use-animation-state',
//     '@chakra-ui/react-use-callback-ref',
//     '@chakra-ui/react-use-controllable-state',
//     '@chakra-ui/react-use-disclosure',
//     '@chakra-ui/react-use-event-listener',
//     '@chakra-ui/react-use-focus-effect',
//     '@chakra-ui/react-use-focus-on-pointer-down',
//     '@chakra-ui/react-use-interval',
//     '@chakra-ui/react-use-merge-refs',
//     '@chakra-ui/react-use-outside-click',
//     '@chakra-ui/react-use-pan-event',
//     '@chakra-ui/react-use-previous',
//     '@chakra-ui/react-use-safe-layout-effect',
//     '@chakra-ui/react-use-size',
//     '@chakra-ui/react-use-timeout',
//     '@chakra-ui/react-use-update-effect',
//     '@chakra-ui/react-utils',
//     '@chakra-ui/select',
//     '@chakra-ui/shared-utils',
//     '@chakra-ui/skeleton',
//     '@chakra-ui/slider',
//     '@chakra-ui/spinner',
//     '@chakra-ui/stat',
//     '@chakra-ui/styled-system',
//     '@chakra-ui/switch',
//     '@chakra-ui/system',
//     '@chakra-ui/table',
//     '@chakra-ui/tabs',
//     '@chakra-ui/tag',
//     '@chakra-ui/textarea',
//     '@chakra-ui/theme',
//     '@chakra-ui/theme-tools',
//     '@chakra-ui/toast',
//     '@chakra-ui/tooltip',
//     '@chakra-ui/transition',
//     '@chakra-ui/utils',
//     '@chakra-ui/visually-hidden'
//   ],
//   { debug: true }
// )
module.exports = nextConfig
