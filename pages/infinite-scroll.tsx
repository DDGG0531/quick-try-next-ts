import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from 'react-query'
import axios, { AxiosResponse } from 'axios'
import { flatten } from 'lodash-es'

export default function MyInfiniteScroll() {
  const [wording, setWording] = React.useState('xxx')
  // 此api 一頁100筆
  const fetchBooks = async (wording: string, page: number) => {
    interface Book {
      title: string
    }
    interface BooksRes {
      numFound: number
      docs: Book[]
    }
    const res: AxiosResponse<BooksRes> = await axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: wording, page: page }
    })

    // 測試用
    if (page >= 3) {
      return {
        names: [],
        hasMore: false
      }
    }

    return {
      names: res.data.docs.map(book => book.title),
      hasMore: res.data.docs.length > 0
    }
  }

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['books', wording],
    ({ pageParam = 1 }) => fetchBooks(wording, pageParam),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (_lastPage.hasMore) {
          return pages.length + 1
        } else {
          // 沒有資料了
          return undefined
        }
      }
    }
  )

  const dataLength = flatten(data?.pages).length
  return (
    <>
      <input
        type="text"
        value={wording}
        onChange={e => {
          setWording(e.target.value)
        }}
      ></input>

      <InfiniteScroll
        dataLength={dataLength} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={hasNextPage === undefined ? true : hasNextPage}
        loader={<h4>Loading...</h4>}
        scrollThreshold={'0px'}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {data &&
          data.pages.map((group, i) => (
            <div key={i}>
              {group.names.map((name, index) => (
                <p key={index}>{name}</p>
              ))}
            </div>
          ))}
      </InfiniteScroll>
    </>
  )
}
