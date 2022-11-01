import dynamic from 'next/dynamic'
import React, { Suspense, useEffect, useRef, useState } from 'react'
const List = dynamic(() => import('@/components/list'), {
  suspense: true
})
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/libs/redux/counter'

import { BasicContext } from '@/pages/_app'
import { useContext } from 'react'

export default function TestRedux() {
  let times = useRef(1)
  const [localCount, setLocalCount] = useState(0)
  // const count = useSelector(state => state.counter.value)
  // const dispatch = useDispatch()

  const { num, setNum } = useContext(BasicContext)

  console.log('localCount', localCount)
  console.log('num', num)

  useEffect(() => {
    if (times.current !== 1) return
    times.current += 1
    // dispatch(increment())
    setLocalCount(e => e + 1)
    // setNum(e => e + 1)
    // const { setTest } = useTestStore.getState()
    // setTest('asd')
    // setTestLocal('xxx')
  }, [])
  return (
    <div>
      hello - {times.current}
      <Suspense>
        <List text={num} />
      </Suspense>
    </div>
  )
}
