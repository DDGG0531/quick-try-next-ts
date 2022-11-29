import { useCallback, useEffect, useRef, useState } from 'react'
import { Avatar } from '@chakra-ui/react'
import { MoonIcon, StarIcon } from '@chakra-ui/icons'
import { format } from 'date-fns'
import { debounce } from 'lodash-es'

interface Reviews {
  mostRelevant: Review[]
  newest: Review[]
}

interface Review {
  authorName: string
  commentedAt: number
  profilePhotoUrl: string
  rating: number // 先默認1-5 但之後要考慮小數點
  text: string
}

const reviews: Reviews = {
  mostRelevant: [
    {
      authorName: 'Luke Archibald',
      commentedAt: 1652286798,
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a-/AOh14GhGGmTmvtD34HiRgwHdXVJUTzVbxpsk5_JnNKM5MA=s128-c0x00000000-cc-rp-mo',
      rating: 1,
      text: "Called regarding paid advertising google pages to the top of its site of a scam furniture website misleading and taking peoples money without ever sending a product - explained the situation,  explained I'd spoken to an ombudsman regarding it.  Listed ticket numbers etc.\n\nThey left the advertisement running."
    },
    {
      authorName: 'Tevita Taufoou',
      commentedAt: 1637215605,
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a/AATXAJwZANdRSSg96QeZG--6BazG5uv_BJMIvpZGqwSz=s128-c0x00000000-cc-rp-mo',
      rating: 1,
      text: "I need help.  Google Australia is taking my money. Money I don't have any I am having trouble sorting this issue out"
    },
    {
      authorName: 'Jordy Baker',
      commentedAt: 1641389490,
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a/AATXAJwgg1tM4aVA4nJCMjlfJtHtFZuxF475Vb6tT74S=s128-c0x00000000-cc-rp-mo',
      rating: 1,
      text: "I have literally never been here in my life, I am 17 and they are taking money I don't have for no reason.\n\nThis is not ok. I have rent to pay and my own expenses to deal with and now this."
    },
    {
      authorName: 'Prem Rathod',
      commentedAt: 1640159655,
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a/AATXAJyEQpqs4YvPPzMPG2dnnRTFPC4jxJfn8YXnm2gz=s128-c0x00000000-cc-rp-mo',
      rating: 1,
      text: 'Terrible service. all reviews are fake and irrelevant. This is about reviewing google as business not the building/staff etc.'
    },
    {
      authorName: 'Husuni Hamza',
      commentedAt: 1633197305,
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a/AATXAJwRkyvoSlgd06ahkF9XI9D39o6Zc_Oycm5EKuRg=s128-c0x00000000-cc-rp-mo',
      rating: 5,
      text: 'Nice site. Please I want to work with you. Am Alhassan Haruna, from Ghana. Contact me +233553851616'
    }
  ],
  newest: [
    {
      authorName: 'Alice Hung',
      commentedAt: 1652286798,
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a/ALm5wu1qiLhX_T0HhCrJ7Ngm2gwqcEPIIkTihyK1iy_A=s40-c-c0x00000000-cc-rp-mo-br100',
      rating: 2,
      text: '很神秘的國際酒店住宿體驗'
    },
    {
      authorName: 'Camel Tsai',
      commentedAt: 1637215605,
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a-/ACNPEu9uEzYrs4I3Gf963YaCd-u0ltcrWMuMsOn9kcCR=s40-c-c0x00000000-cc-rp-mo-ba8-br100',
      rating: 3,
      text: '在雲林想要找到一間像樣的飯店真的不簡單，而三好國際酒店就是我想要的。有浴缸及泳池是我的首選，而酒店也都符合了我的需求，因為中秋連假我們會在這裡住上三天二夜。酒店的正對面就是斗六棒球場要看職棒比賽也相當方便，房間也能看到棒球場部份內部。四人房的空間也非常寬敞，落地窗前旁還有貴妃椅可躺，而浴室的浴缸為落地式。下完行李稍微休息一下之後帶著小朋友直衝游泳池，但是因疫情關係要事先預約所以作罷，和工作人員表示讓我拍個泳池照片就離開，結束之後只能悻悻然回到房間。隔日的早餐不能在餐廳裡內用，酒店已經準備好便當等房客取回客房食用。便當盒還蠻大的食物也不錯，怕吃不飽領取時向服務人員多要了一個，他們二話不說就直接放入提袋裡。這次住宿環境品質讓我也很滿意，以後來到雲林彰化地區三好國際酒店絕對是我的首選。（20210918）'
    },
    {
      authorName: 'Sandy Chen',
      commentedAt: 1641389490,
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a-/ACNPEu-VNm0QtJecNztoQkn1Mxqo84xY9Q9YjoSUJ0vE_w=s40-c-c0x00000000-cc-rp-mo-ba4-br100',
      rating: 4,
      text: '來雲林不想徹夜衝回台北，第一次在雲林住宿啦！找到了三好國際酒店，這是少數規模較大的雲林飯店，也是斗六飯店初體驗，飯店鄰近斗六棒球場，地理位置還算方便，房間很大。\n\n我們二大一小，所以住雙拼兩個單人的床，真是太舒爽了，小屁孩一進門就拼命滾床，要四圈才能滾完😅'
    },
    {
      authorName: 'Eric L',
      commentedAt: 1640159655,
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a-/ACNPEu9adUZPgzucI8tS10l60oiNAkBcjr75zUZXSkVjHVU=s40-c-c0x00000000-cc-rp-mo-ba4-br100',
      rating: 3,
      text: '空間蠻大的，有浴缸櫃檯服務也不錯。裝潢的風格蠻像汽車旅館，不是有設計感的文青風，很難吸引年輕旅客。隔音不是很好，隔壁看電視或聊天都很清楚😅😅。早餐以中式為主，菜色中規中矩，沒有當地特色菜餚有點可惜。有游泳池很棒，只可惜開放時間從下午5:30-晚上9:30，能使用時間不長，另外如果有附脫水機會更貼心。除此之外，也建議樓層間能放飲水機，這樣方便旅客取水，也無需勞動櫃檯請飯店人員送水過來。另外，如果飯店人員能臉帶微笑就更棒了，加油！有機會還會入住。'
    },
    {
      authorName: '陳佳蓮',
      commentedAt: 1633197305,
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a/ALm5wu30Dy7xQgUTlmlh_jNW1kCc_MXLlTrad7Zob2It=s40-c-c0x00000000-cc-rp-mo-br100',
      rating: 2,
      text: '幾年前剛開幕的時候有來住過，當時感覺很舒適整體評價非常好，這三天去住宿，一開始整體品質感覺還不錯，房內寬敞乾淨，床躺起來很舒適空調也很適中，兩天早餐變化不多，吃起來尚可，但最後一天早上吃早餐遇到一組客人，去盛菜時完全沒戴口罩，還在料理前跟裡面的廚師詢問菜的內容，在菜的附近咳嗽，也沒看見廚師提醒他們盛菜要戴口罩的舉動，後來看不下去跑去跟餐廳的門口接待說，他跟我說好他會注意，結果他去跟那組其中一位客人說，請他戴上口罩，那位客人就回一句”我在吃飯ㄟ”，餐廳接待竟然回一句好，就走了？？？不是你自己飯店在進餐廳前有標語說離開座位請戴口罩的嗎！！？然後人家回你一句你飯店就算了！！！現在疫情這麼嚴重，連衛生都隨便，誰敢住啊！退房時跟櫃台反應，也只說”好的 會再注意，不好意思”，根本也沒有要處理的意思，好意思說自己是國際酒店，這樣的員工素質真的令人不敢領教⋯⋯'
    }
  ]
}

export default function CommentPage() {
  return (
    <div className="container mx-auto py-5">
      <div className="grid place-content-center gap-2">
        {reviews.mostRelevant.map((review, index) => (
          <ReviewCard review={review} key={index} />
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col gap-2 rounded-[10px] border border-gray-medium p-4">
      <section className="flex items-center gap-2">
        <Avatar
          size="xs"
          name={review.authorName}
          src={review.profilePhotoUrl}
        />
        <div className="truncate font-semibold text-gray-600">
          {review.authorName}
        </div>
      </section>
      <section className="flex items-center justify-between">
        <Rating value={3} />
        <div className="text-sm">
          {format(new Date(review.commentedAt), 'yyyy-MM-dd')}
        </div>
      </section>

      <section>
        <Collapse text={review.text} />
      </section>
    </div>
  )
}

function Rating({ value }: { value: number }) {
  // 小數點星號 轉成 整數、半數星號

  const [full, half] = (() => {
    let full = 0
    let half = 0

    let point = (value * 10) % 10
    let integer = Math.floor(value)

    if (point === 0 || point === 1 || point === 2) {
      full = integer
    } else if (point === 8 || point === 9) {
      full = integer + 1
    } else {
      full = integer
      half = 1
    }

    return [full, half]
  })()

  return (
    <div className="flex gap-1">
      {[...Array(full)].map((e, index) => (
        <StarIcon w={4} h={4} color="yellow.500" key={index} />
      ))}

      {[...Array(half)].map((e, index) => (
        <MoonIcon w={4} h={4} color="yellow.500" key={index} />
      ))}
    </div>
  )
}

function Collapse({
  text,
  maxLines = 3
}: {
  text: string
  maxLines?: 1 | 2 | 3 | 4 | 5
}) {
  const ref = useRef(null)
  const [collapsible, setCollapsible] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const [currentHeight, setCurrentHeight] = useState<null | number>(null)
  const [height, setHeight] = useState(0)
  const [fullHeight, setFullHeight] = useState(0)

  const lineClass = (() => {
    const classMap = {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      5: 'line-clamp-5'
    }

    return classMap[maxLines]
  })()

  useEffect(() => {
    const debounceInit = debounce(() => {
      init()
    }, 50)
    init()
    window.addEventListener('resize', debounceInit)
    return () => {
      window.removeEventListener('resize', debounceInit)
    }
  }, [])

  const init = () => {
    setCollapsible(false)
    setCollapsed(true)
    setCurrentHeight(null)
    setHeight(0)
    setFullHeight(0)

    // checking hasClamping in nextTick

    setTimeout(() => {
      const collapsible = hasClamping(ref.current)
      setCollapsible(collapsible)

      const height = ref.current.clientHeight
      const fullHeight = ref.current.scrollHeight

      setHeight(height)
      setFullHeight(fullHeight)
      setCurrentHeight(height)
    }, 0)
  }

  const hasClamping = el => {
    const { clientHeight, scrollHeight } = el
    return clientHeight !== scrollHeight
  }

  const clickHandler = () => {
    if (collapsed) {
      // to open
      setCurrentHeight(fullHeight)
      setCollapsed(false)
    } else {
      // to close
      setCurrentHeight(height)
      setCollapsed(true)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div
        ref={ref}
        style={{
          height: `${currentHeight === null ? 'auto' : `${currentHeight}px`}`
        }}
        className={`overflow-hidden text-ellipsis transition-height duration-300 ease-in-out ${
          collapsed && lineClass
        }`}
      >
        <p className="whitespace-pre-wrap break-all">{text}</p>
      </div>
      {collapsible && (
        <button onClick={clickHandler} className="cursor-pointer text-left">
          {collapsed ? '展開' : '收合'}
        </button>
      )}
    </div>
  )
}
