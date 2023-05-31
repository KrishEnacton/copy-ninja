import { ChevronRightIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SpinnerLoader } from '../SpinnerLoader'
import { useNavigate } from 'react-router-dom'
import useSupabase from '../../../../supabase/use-supabase'
import { TopicParams } from '../../../../utils/global'
import { useRecoilState } from 'recoil'
import { isEditState } from '../../../../options/recoil/atoms'
const ListItem = ({ className, from, item }: any) => {
  const navigate = useNavigate()
  const { updateTopic, deleteTopic, getAllTopics } = useSupabase()

  const [isEditTopic, setIsEditTopic] = useRecoilState(isEditState)
  const [loading, setLoading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [updatedInput, setUpdatedInput] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  function editTopicHandler(body: TopicParams) {
    console.log({ ...body, topic: updatedInput })
    setLoading(true)
    if (updateTopic)
      updateTopic({ ...body, topic: updatedInput })
        .then((res: any) => {
          console.log('res', res)
          if (res?.data?.length > 0) {
            setLoading(false)
            setIsEdit(false)
            setIsEditTopic(prev => !prev)
          }
        })
        .finally(() => setLoading(false))
  }

  function deleteTopicHandler(id: number) {
    deleteTopic(id).then(res => {
      setIsEditTopic(prev => !prev)
    })
  }
  useLayoutEffect(() => {
    setUpdatedInput(item?.topic)
  }, [])

  useEffect(() => {
    console.log('check', inputRef)
    //@ts-ignore
    if (inputRef.current) inputRef.current['focus'] = true
  }, [isEdit, inputRef])
  return (
    <div
      className={`${className} group flex justify-between py-2`}
      onClick={() => {
        console.log({ from })
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
          className='group-hover:cursor-pointer'
        >
          <input
            ref={inputRef}
            type='text'
            className='border-none focus:border-none focus:ring-none focus:outline-none'
            value={updatedInput}
            onChange={(e) => setUpdatedInput(e.target.value)}
          />
          <button type='submit' className='hidden'></button>
        </form>
      ) : (
        <div className='group-hover:cursor-pointer' onClick={() => navigate('/create')}>
          {item?.topic}
        </div>
      )}
      <div className='flex gap-x-4'>
        {from === 'option' && (
          <div
            className='group-hover:cursor-pointer'
            onClick={() => {
              setIsEdit((prev) => !prev)
            }}
          >
            {loading ? (
              <SpinnerLoader className='w-6 h-6' />
            ) : (
              <PencilSquareIcon className='w-6 h-6' />
            )}
          </div>
        )}
        <div className='group-hover:cursor-pointer'>
          <TrashIcon className='w-6 h-6' onClick={() => deleteTopicHandler(item.id)} />
        </div>
      </div>
    </div>
  )
}

export default ListItem