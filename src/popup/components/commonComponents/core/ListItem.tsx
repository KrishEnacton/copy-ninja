import { PencilSquareIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SpinnerLoader } from '../SpinnerLoader'
import { useNavigate } from 'react-router-dom'
import useSupabase from '../../../../supabase/use-supabase'
import { TopicParams } from '../../../../utils/global'
import { useRecoilState } from 'recoil'
import { isEditState } from '../../../../options/recoil/atoms'
import { Dialog, Transition } from '@headlessui/react'
const ListItem = ({ className, from, item }: any) => {
  const navigate = useNavigate()
  const { updateTopic, deleteTopic, getAllTopics } = useSupabase()

  const [isEditTopic, setIsEditTopic] = useRecoilState(isEditState)
  const [isModal, setIsModal] = useState(false)
  const [loading, setLoading] = useState<{ editLoading?: boolean, deleteLoading?: boolean }>({
    editLoading: false,
    deleteLoading: false,
  })
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [updatedInput, setUpdatedInput] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  function editTopicHandler(body: TopicParams) {
    setIsEdit(false)
    setLoading({editLoading: true })
    if (updateTopic) {
      updateTopic({ ...body, topic: updatedInput }).then((res: any) => {
        if (res?.data?.length > 0) {
          setLoading({editLoading: false, deleteLoading: false})
          setIsEditTopic((prev) => !prev)
        }
      })
    }
  }

  function deleteTopicHandler(id: number) {
    setLoading({ deleteLoading: true})
    deleteTopic(id).then((res) => {
      setIsEditTopic((prev) => !prev)
      setLoading({editLoading: false, deleteLoading: false})
      setIsModal(false)
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
    <div
      className={`${className} group flex justify-between py-2 text-indigo-500 font-medium`}
      onClick={() => {
        if (from === 'popup') {
          navigate('/select')
        }
      }}
    >
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
        <div
          className="group-hover:cursor-pointer"
          onClick={() => navigate('/create', { state: item })}
        >
          {item?.topic}
        </div>
      )}
      <div className="flex gap-x-4">
        {from === 'option' && (
          <div
            className="group-hover:cursor-pointer"
            onClick={() => {
              setIsEdit((prev) => !prev)
            }}
          >
            {isEdit ? (
              <CheckCircleIcon className="w-6 h-6" />
            ) : loading.editLoading ? (
              <SpinnerLoader className="w-6 h-6" />
            ) : (
              <PencilSquareIcon className="w-6 h-6" />
            )}
          </div>
        )}
        <div className="group-hover:cursor-pointer" onClick={() => setIsModal(true)}>
          <TrashIcon className="w-6 h-6 text-black" />
        </div>
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-bold leading-6 text-red-900 mb-4"
                        >
                          Sure, you want to delete the Topic?
                        </Dialog.Title>
                        <div className='text-xs text-red-500'>It will delete all the answers and ctas inside it.</div>
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
                        onClick={() => setIsModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  )
}

export default ListItem
