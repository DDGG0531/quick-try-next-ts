import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('-----inside middleware-----', request.nextUrl.pathname)

  if (request.nextUrl.pathname.startsWith('/static')) {
    return NextResponse.redirect(new URL('/ssr', request.url))
  }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/order/:path*'
// }
