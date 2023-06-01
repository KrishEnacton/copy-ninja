import { useEffect, useLayoutEffect, useState } from 'react'
import useSupabase from '../../../supabase/use-supabase'
import { getLocalStorage } from '../../../utils'
import { useRecoilState } from 'recoil'
import { isEditState } from '../../../options/recoil/atoms'
import { useNavigate } from 'react-router-dom'
import PopupList from '../commonComponents/core/PopupList'
import OptionList from '../commonComponents/core/OptionList'
import { searchInputState, selectedFolder, selectedFolderState } from '../../recoil/atoms'

const ListView = ({ className, from }: { className?: string; from?: string }) => {
  const navigate = useNavigate()
  const [allTopics, setAllTopics] = useState<any>(null)
  const [filteredTopic, setFilteredTopic] = useState<any>([])
  const [isEditTopic] = useRecoilState(isEditState)
  const [_selectedFolder, _setSelectedFolder] = useRecoilState(selectedFolder)
  const [searchInput] = useRecoilState(searchInputState)
  const { getAllTopics } = useSupabase()

  useEffect(() => {
    getAllTopics().then((res) => {
      setFilteredTopic
      setAllTopics(res?.data)
    })
  }, [isEditTopic])

  useLayoutEffect(() => {
    setAllTopics(getLocalStorage('allTopics'))
  }, [])

  useEffect(() => {
    if (_selectedFolder?.id && allTopics?.length > 0) {
      if (searchInput === '') {
        setFilteredTopic((prev) =>
          allTopics.filter((item) => item.folder_id === _selectedFolder.id),
        )
      } else {
        setFilteredTopic((prev) =>
          allTopics
            .filter((item) => item.folder_id === _selectedFolder.id)
            .filter((a) => a.topic.toLowerCase().includes(searchInput.toLowerCase())),
        )
      }
    } else {
    }
    return () => {}
  }, [_selectedFolder, allTopics, searchInput])

  return (
    <div
      className={`mt-4 border border-gray-300 p-2 md:p-4 rounded-md divide-y-2 overflow-y-auto divide-gray-200 mx-4 md:mx-0 ${className}`}
    >
      {filteredTopic?.length > 0 ? (
        <>
          {' '}
          {filteredTopic?.map((list, index) => (
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
        </>
      ) : (
        <p>
          No topic found for <span className="font-bold">'{_selectedFolder.name}'</span> folder{' '}
          {searchInput.length > 0 ? (
            <span>
              and this search key word <span className="font-bold">'{searchInput}'</span>{' '}
            </span>
          ) : (
            ''
          )}
        </p>
      )}
    </div>
  )
}

export default ListView
