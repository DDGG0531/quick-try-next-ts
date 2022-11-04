import Link from 'next/link'
import React, { useState } from 'react'
import { event } from 'nextjs-google-analytics'

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

      <Link href="/order/8877">
        <a>order</a>
      </Link>

      <div
        className="ml-auto cursor-pointer rounded bg-green px-5 text-center"
        onClick={() => {
          event('CurrentCount', {
            category: 'Contact',
            label: `${count + 1}`
          })
          setCount(count + 1)
        }}
      >
        數字：{count}
      </div>
    </div>
  )
}
