import { useEffect, useLayoutEffect, useState } from 'react'
import useSupabase from '../../../supabase/use-supabase'
import { getLocalStorage } from '../../../utils'
import { useRecoilState } from 'recoil'
import { isEditState } from '../../../options/recoil/atoms'
import { useNavigate } from 'react-router-dom'
import PopupList from '../commonComponents/core/PopupList'
import OptionList from '../commonComponents/core/OptionList'

const ListView = ({ className, from }: { className?: string; from?: string }) => {
  const navigate = useNavigate()
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
      className={`mt-4 border border-gray-300 p-2 md:p-4 rounded-md divide-y-2 overflow-y-auto divide-gray-200 mx-4 md:mx-0 ${className}`}
    >
      {allTopics?.map((list, index) => (
        <div key={index}>
          {from === 'popup' ? (
            <PopupList
              className={'text-lg px-4'}
              item={list}
              onItemClick={() => {
                navigate('/select', { state: list })
              }}
              ModalChild={undefined}
              SideButton={undefined}
              isModal={undefined}
            />
          ) : (
            <OptionList
              className={'text-lg px-4'}
              item={list}
              onItemClick={() => {
                navigate('/create', { state: list })
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ListView
