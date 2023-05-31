import { useEffect, useLayoutEffect, useState } from 'react'
import useSupabase from '../../../supabase/use-supabase'
import ListItem from '../commonComponents/core/ListItem'
import { getLocalStorage } from '../../../utils'
import { useRecoilState } from 'recoil'
import { isEditState } from '../../../options/recoil/atoms'

const ListView = ({ className, from }: { className?: string; from?: string }) => {
  const [allTopics, setAllTopics] = useState<any>(null)
  const [isEditTopic, setIsEditTopic] = useRecoilState(isEditState)
  const { getAllTopics } = useSupabase()
  useEffect(() => {
    getAllTopics().then((res) => {
      setAllTopics(res?.data)
    })
  }, [isEditTopic])

  useLayoutEffect(() => {
    setAllTopics(getLocalStorage('allTopics'))
  }, [])

  return (
    <div
      className={`mt-4 border border-gray-300 p-2 rounded-md divide-y-2 overflow-y-auto divide-gray-200 mx-4 ${className}`}
    >
      {allTopics?.map((list, index) => (
        <div key={index}>
          <ListItem className={'text-lg px-4'} from={from} item={list} />
        </div>
      ))}
    </div>
  )
}

export default ListView
