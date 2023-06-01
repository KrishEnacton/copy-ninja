import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useImperativeHandle, useState } from 'react'

const Modal = (props, ref) => {
  const [isModal, setIsModal] = useState(false)

  useImperativeHandle(ref, () => {
    return { closeModal, openModal }
  })

  function closeModal() {
    setIsModal(false)
  }

  function openModal() {
    setIsModal(true)
  }

  return (
    <Transition.Root show={isModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-[63%] items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {props.children}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default React.forwardRef(Modal)
