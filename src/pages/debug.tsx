import { useState } from 'react'

function UpperCase(name: string) {
  const x = 0
  return name.toUpperCase()
}

interface People {
  name: string
  age: number
}

const people: People[] = [
  {
    name: 'Jim',
    age: 28
  },
  {
    name: 'Dennis',
    age: 26
  },
  {
    name: undefined,
    age: 55
  }
]

export default function Debug() {
  let [open, setOpen] = useState(false)
  let data = people

  return (
    <>
      <button
        className="h-20  w-20 rounded-sm bg-blue-400 text-white"
        onClick={() => setOpen(true)}
      >
        Start: {open}
      </button>
      {open && (
        <div>
          {data.map((e, index) => (
            <div key={index}>
              <div>{UpperCase(e.name)}</div>
              <div>{e.age}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
