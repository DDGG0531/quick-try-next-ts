import Link from 'next/link'
import React, { useState } from 'react'

export default function Header() {
  const [count, setCount] = useState(0)
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

      <div
        className="ml-auto cursor-pointer rounded bg-green px-5 text-center"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        {count}
      </div>
    </div>
  )
}
