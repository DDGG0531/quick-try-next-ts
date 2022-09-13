import { useRouter } from 'next/router'
import React from 'react'

export default function SingleOrder() {
  const router = useRouter()
  const code = router.query.code as string | undefined
  console.log('code', code)
  return <div>訂單編號：{code}</div>
}
