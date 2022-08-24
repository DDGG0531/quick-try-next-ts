import React from 'react'
import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Drawer,
  DrawerOverlay,
  useDisclosure,
  Button
} from '@chakra-ui/react'

export default function TestDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open</Button>

      <div className="flex flex-col gap-3">
        <div className="h-[300px] bg-pink-200"></div>
        <div className="h-[300px] bg-pink-400"></div>
        <div className="h-[300px] bg-pink-600"></div>
        <div className="h-[300px] bg-pink-800"></div>
      </div>

      <Drawer
        placement="bottom"
        onClose={onClose}
        isOpen={isOpen}
        blockScrollOnMount={true}
      >
        <DrawerOverlay />
        <DrawerContent
          className="mx-auto !max-w-md rounded-t-lg"
          h={'80vh'}
          maxH={'80vh'}
        >
          <DrawerCloseButton />
          <DrawerHeader className="mt-5"></DrawerHeader>
          <DrawerBody>Hello 你好嗎</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
