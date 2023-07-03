import { Fragment, useEffect, useRef, useState } from 'react'
import useSupabase from '../../../supabase/use-supabase'
import { SpinnerLoader } from './SpinnerLoader'
import Dropdown from './core/Dropdown'
import { getLocalStorage } from '../../../utils'
import { useNavigate } from 'react-router-dom'
import { Transition, Dialog } from '@headlessui/react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useRecoilState } from 'recoil'
import { searchInputState } from '../../recoil/atoms'
import { selectedFolder } from '../../recoil/atoms'
import KKDropdown from './core/KKDropdown'
import Modal from './core/Modal'
import { v4 as uuidv4 } from 'uuid'

const Search = ({ className, from }: { className?: string; from?: string }) => {
  const { getAllFolders, createFolder, createTopic } = useSupabase()
  const [loading, setLoading] = useState<boolean>(false)
  const [folder, setFolder] = useState<string>('')
  const [topic, setTopic] = useState<string>('')
  const [searchInput, setSearchInput] = useRecoilState(searchInputState)
  const [selected, setSelected] = useRecoilState(selectedFolder)
  const [_selectedFolder, _setSelectedFolder] = useState(
    (getLocalStorage('defaultSelectedFolder') as any) ||
      (getLocalStorage('allFolders')?.[0] as any) ||
      ({} as any),
  )
  const [topicLoading, setTopicLoading] = useState(false)
  const [modalType, setModalType] = useState<'topic' | 'folder'>()
  const [allFolderStorage, setAllFolderStorage] = useState(getLocalStorage('allFolders') || [])
  const modalRef = useRef<any>()

  const navigate = useNavigate()
  const createTopicURL = chrome.runtime.getURL('/options.html#/home')
  const localStorageAllFoldersData = JSON.stringify(getLocalStorage('allFolders') || [])

  useEffect(() => {
    setAllFolderStorage(getLocalStorage('allFolders') || [])
    if (getLocalStorage('allFolders')?.[0]) {
      _setSelectedFolder(getLocalStorage('allFolders')?.[0])
    }
  }, [localStorageAllFoldersData])

  function createFolderHandler() {
    setLoading(true)
    createFolder(folder).then((res: any) => {
      if (res.data) {
        setLoading(false)
        modalRef.current.closeModal()
        getAllFolders()
      }
    })
  }

  function createTopicHandler() {
    setTopicLoading(true)
    createTopic({
      folderId: selected.id,
      topic,
      id: uuidv4(),
    })
      .then((res: any) => {
        let data = res.data?.[0]
        if (data) navigate('/create', { state: data })
      })
      .finally(() => {
        setTopicLoading(false)
        modalRef.current.closeModal()
      })
  }

  function redirect() {
    chrome.tabs.query({}, (tabs) => {
      if (from === 'popup') {
        if (!tabs.find((tab) => tab.url === createTopicURL)) {
          chrome.tabs.create({
            url: createTopicURL,
          })
        } else {
          chrome.tabs.query({ currentWindow: true }, (tabs: any) => {
            let tab = tabs.find((tab: any) => tab.url === createTopicURL)
            chrome.tabs.update(tab.id, { active: true })
          })
        }
      }
      if (from === 'option') {
        navigate('/create')
      }
    })
  }

  function CreateFolderModalBody() {
    return (
      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
        <div>
          <div className="mt-3 md:mt-0 text-center sm:mt-5">
            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-4">
              Create a Folder
            </Dialog.Title>
          </div>
        </div>
        <div>
          <label
            htmlFor="folder_name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Folder Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="folder_name"
              id="folder_name"
              onChange={(e: any) => {
                setFolder(e.target.value)
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter Folder Name"
            />
          </div>
        </div>
        <div className="mt-5 sm:mt-6 flex gap-x-2">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
            onClick={() => createFolderHandler()}
          >
            {loading ? <SpinnerLoader className="w-5 h-5" /> : 'Save'}
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
    )
  }

  function CreateTopicModalBody() {
    return (
      <Dialog.Panel className="space-y-6 relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
        <div>
          <div className="mt-3 md:mt-0 text-center sm:mt-5">
            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-4">
              Create a Topic
            </Dialog.Title>
          </div>
        </div>
        <div>
          <label
            htmlFor="folder_name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select Folder
          </label>
          <div className="mt-2">
            <KKDropdown
              id="folder"
              selected={selected}
              setSelected={setSelected}
              listData={allFolderStorage}
              setDefaultValueKey={'defaultSelectedFolder'}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="folder_name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Topic Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="folder_name"
              id="folder_name"
              onChange={(e: any) => {
                setTopic(e.target.value)
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter Folder Name"
            />
          </div>
        </div>

        <div className=" sm:mt-6 flex gap-x-2">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
            onClick={() => createTopicHandler()}
          >
            {topicLoading ? <SpinnerLoader className="w-5 h-5" /> : 'Create Topic'}
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
    )
  }

  return (
    <div className={`flex justify-between  flex-col ${className}`}>
      <div className="px-4 md:px-0 py-1">
        <div className="mt-2 flex rounded-md items-end">
          <KKDropdown
            id="folder"
            selected={selected}
            setSelected={setSelected}
            listData={allFolderStorage}
            setDefaultValueKey={'defaultSelectedFolder'}
          />
          {from === 'option' && (
            <button
              type="button"
              onClick={() => {
                setModalType('folder')
                modalRef.current.openModal()
              }}
              className="ml-4 items-center rounded-md  px-2 py-2 bg-indigo-600 md:w-1/5 w-2/4
             text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Folder
            </button>
          )}
        </div>
      </div>

      <div className=" mx-4 my-2 md:m-0">
        <div className="mt-2 flex rounded-md ">
          <div className="shadow-sm relative flex flex-grow items-stretch focus-within:z-10">
            <input
              type="text"
              name="topics"
              id="topics"
              onChange={(e) => setSearchInput(e.target.value)}
              className={`block w-full ${
                from === 'popup' ? 'rounded-md' : 'rounded-md'
              } border-0 py-1.5 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              placeholder="Search Topic"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setModalType('topic')
              from == 'popup' ? redirect() : modalRef.current.openModal()
            }}
            // onClick={() => redirect()}
            className=" md:w-1/6 ml-4 group rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {from === 'popup' ? (
              <div className="relative">
                <Cog6ToothIcon className="w-5 h-5 group-hover" />
                <div className="bg-gray-200 text-gray-800 text-sm rounded -translate-x-8 -translate-y-20 p-2 absolute hidden group-hover:block">
                  Options Page
                </div>
              </div>
            ) : from === 'option' ? (
              'New Topic'
            ) : (
              ''
            )}
          </button>
        </div>
      </div>
      <Modal ref={modalRef}>
        {modalType === 'topic' ? CreateTopicModalBody : CreateFolderModalBody}
      </Modal>
    </div>
  )
}

export default Search
