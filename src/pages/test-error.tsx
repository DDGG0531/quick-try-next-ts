import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

const getData = axiosRes => {
  console.log('axiosRes', axiosRes)
  return axiosRes?.data.data
}

const getError = error => {
  return error?.response.data.error
}

export default function TestError() {
  const {
    data: testData,
    error: testError,
    refetch
  } = useQuery(['test'], () => axios.get(`/api/test`), {
    // 如果有這個meta，全域就不觸發
    // 如果這邊要處理，就寫在onError
    // PS: 這邊onError拿不到第二個參數query
    meta: {
      handleLocal: true
    },
    onError: error => {
      toast(`有錯誤: ${getError(error)}`)
    }
  })

  const {
    data: testMutateData,
    mutate,
    error: testMutateError
  } = useMutation(['test-mutate'], () => axios.post(`/api/testMutate`), {
    meta: {
      handleLocal: true
    },
    onError: error => {
      toast(`有錯誤M: ${getError(error)}`)
    }
  })

  return (
    <div className="grid h-[300px] content-center">
      <section>
        <button
          className="w-full rounded bg-green-300 p-3 text-white"
          onClick={refetch}
        >
          觸發 取得
        </button>
        <div>資料：{getData(testData)}</div>
        <div>錯誤: {getError(testError)}</div>
      </section>

      <div className="my-5" />

      <section>
        <button
          className="w-full rounded bg-blue-300 p-3 text-white"
          onClick={mutate}
        >
          觸發 修改
        </button>
        <div>資料：{getData(testMutateData)}</div>
        <div>錯誤: {getError(testMutateError)}</div>
      </section>
    </div>
  )
}
