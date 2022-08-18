import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="sticky top-0 flex gap-5 bg-blue-300 p-5 text-white">
      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/ssr">
        <a>SSR</a>
      </Link>

      <Link href="/static">
        <a>Static</a>
      </Link>
    </div>
  )
}
