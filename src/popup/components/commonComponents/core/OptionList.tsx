import { PencilSquareIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SpinnerLoader } from '../SpinnerLoader'
import useSupabase from '../../../../supabase/use-supabase'
import { TopicParams } from '../../../../utils/global'
import { useRecoilState } from 'recoil'
import { isEditState } from '../../../../options/recoil/atoms'
import { Dialog } from '@headlessui/react'
import Modal from './Modal'
import { XMarkIcon } from '@heroicons/react/20/solid'

const OptionList = ({ className, item, onItemClick }: any) => {
  const { updateTopic, deleteTopic } = useSupabase()
  const modalRef = useRef<any>()

  const [isEditTopic, setIsEditTopic] = useRecoilState(isEditState)
  const [loading, setLoading] = useState<{ editLoading?: boolean; deleteLoading?: boolean }>({
    editLoading: false,
    deleteLoading: false,
  })
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [updatedInput, setUpdatedInput] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  function editTopicHandler(body: TopicParams) {
    setIsEdit(false)
    setLoading({ editLoading: true })
    if (updateTopic) {
      updateTopic({ ...body, topic: updatedInput }).then((res: any) => {
        if (res?.data?.length > 0) {
          setLoading({ editLoading: false, deleteLoading: false })
          setIsEditTopic((prev) => !prev)
        }
      })
    }
  }

  function deleteTopicHandler(id: number) {
    setLoading({ deleteLoading: true })
    deleteTopic(id).then((res) => {
      setIsEditTopic((prev) => !prev)
      setLoading({ editLoading: false, deleteLoading: false })
      modalRef.current.closeModal()
    })
  }

  useLayoutEffect(() => {
    setUpdatedInput(item?.topic)
  }, [])

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEdit])

  return (
    <div className={`${className} group flex justify-between py-2 text-indigo-500 font-medium`}>
      {isEdit ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            editTopicHandler(item)
          }}
          className="group-hover:cursor-pointer"
        >
          <input
            ref={inputRef}
            type="text"
            readOnly={!isEdit}
            className="border-transparent focus:border-transparent focus:ring-0"
            value={updatedInput}
            onBlur={() => setIsEdit(false)}
            onChange={(e) => setUpdatedInput(e.target.value)}
          />
          <button type="submit" className="hidden"></button>
        </form>
      ) : (
        <div className="group-hover:cursor-pointer" onClick={onItemClick}>
          {item?.topic}
        </div>
      )}
      <div className="flex gap-x-4">
        {
          <div
            className="group-hover:cursor-pointer"
            onClick={() => {
              setIsEdit((prev) => !prev)
            }}
          >
            {isEdit ? (
              <XMarkIcon className="w-6 h-6" />
            ) : loading.editLoading ? (
              <SpinnerLoader className="w-6 h-6" />
            ) : (
              <PencilSquareIcon className="w-6 h-6" />
            )}
          </div>
        }
        {
          <div className="group-hover:cursor-pointer" onClick={() => modalRef.current.openModal()}>
            <TrashIcon className="w-6 h-6 text-black" />
          </div>
        }
        <Modal ref={modalRef}>
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title as="h3" className="text-base font-bold leading-6 text-red-900 mb-4">
                  Sure, you want to delete the Topic?
                </Dialog.Title>
                <div className="text-xs text-red-500">
                  It will delete all the answers and ctas inside it.
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 flex gap-x-2">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                onClick={() => deleteTopicHandler(item.id)}
              >
                {loading.deleteLoading ? <SpinnerLoader className="w-5 h-5" /> : 'Yes'}
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                onClick={() => modalRef.current.closeModal()}
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </Modal>
      </div>
    </div>
  )
}

export default OptionList
