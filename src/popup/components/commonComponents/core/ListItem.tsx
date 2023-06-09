import { PencilSquareIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SpinnerLoader } from '../SpinnerLoader'
import { useNavigate } from 'react-router-dom'
import useSupabase from '../../../../supabase/use-supabase'
import { TopicParams } from '../../../../utils/global'
import { useRecoilState } from 'recoil'
import { isEditState } from '../../../../options/recoil/atoms'
import { Dialog, Transition } from '@headlessui/react'

const ListItem = ({ className, from, item, modalcHold }: any) => {
  const navigate = useNavigate()
  const { updateTopic, deleteTopic, getAllTopics } = useSupabase()
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
    <div
      className={`${className} group flex justify-between py-2 text-indigo-500 font-medium`}
      onClick={() => {
        if (from === 'popup') {
          navigate('/select', { state: item })
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
    </div>
  )
}

export default ListItem
