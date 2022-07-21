import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useState } from 'react'

export default function FormAnimate() {
  return (
    <div className="bg-yellow-300">
      <div className="mx-auto flex min-h-screen max-w-sm  items-center justify-center">
        <LayoutGroup>
          <motion.ul
            layout
            initial={{ borderRadius: 25 }}
            className="flex w-full flex-col gap-5"
          >
            {items.map(item => (
              <Item key={item} />
            ))}
          </motion.ul>
        </LayoutGroup>
      </div>
    </div>
  )
}

function Item() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <motion.li
      layout
      onClick={toggleOpen}
      initial={{ borderRadius: 10 }}
      className="flex flex-col gap-5 bg-gray p-5"
    >
      {/* avatar */}
      <motion.div className="h-10 w-10 rounded-full bg-blue-200" layout />
      <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
    </motion.li>
  )
}

function Content() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <input autoFocus />
      <div className="mt-5 h-3 w-full rounded bg-pink-200" />
      <div className="mt-5 h-3 w-full rounded bg-pink-200" />
      <div className="mt-5 h-3 w-full rounded bg-pink-200" />
    </motion.div>
  )
}

const items = [0, 1, 2]
