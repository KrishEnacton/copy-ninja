import { ArrowLeftIcon, ChevronUpIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import InputGroup from '../components/InputGroup'
import { useLocation, useNavigate } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { withAuth } from '../components/HOC/withAuth'
import useSupabase from '../../supabase/use-supabase'
import { getLocalStorage } from '../../utils'
import { TopicParams } from '../../utils/global'
import { SpinnerLoader } from '../../popup/components/commonComponents/SpinnerLoader'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

const Create: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [answer, setAnswer] = useState<{ label: any; value: any }>()
  const [topicName, setTopicName] = useState('')
  const [folder, setFolder] = useState<any>(null)
  const [cta, setCTA] = useState<{ label: any; value: any }>()

  const { createTopic, updateTopic } = useSupabase()

  async function submitHandler(e?: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault()
    setLoading(true)
    let result: any
    let body: TopicParams
    if (item !== null) {
      console.log({ cta, answer })
      if (cta) {
        body = { ...item, answer: [...item.answer], cta: [...item.cta, cta], topic: topicName }
        result = await updateTopic(body)
      }
      if (answer) {
        body = { ...item, answer: [...item.answer, answer], cta: [...item.cta], topic: topicName }
        result = await updateTopic(body)
      }
    } else {
      result = await createTopic({
        folderId: folder,
        topic: topicName,
      })
    }
    if (result?.data?.[0]?.id) {
      setItem(result.data?.[0])
      setLoading(false)
    }
  }

  useLayoutEffect(() => {
    setItem(location.state)
    setTopicName(location?.state?.topic)
  }, [])

  return (
    <Fragment>
      <div className="text-xl font-bold flex gap-x-4">
        <span
          className="isolate inline-flex rounded-md shadow-sm"
          onClick={() => navigate('/home')}
        >
          <button
            type="button"
            className="relative inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:z-10 ring-1 ring-inset ring-gray-300 "
          >
            <ArrowLeftIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            View All Topics
          </button>
        </span>
      </div>
      <div className="mt-4">
        <div className="flex gap-x-3">
          <div className='w-full'>
            <form onSubmit={(e) => submitHandler(e)} className="flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <input
                  type="text"
                  name="topicName"
                  id="topicName"
                  value={topicName}
                  className="block w-full rounded-none rounded-l-md border-0 py-2 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter Topic"
                  onChange={(e) => setTopicName(e.target.value)}
                />
              </div>
              {item === null && (
                <div className="outset-y-1 border-y border-gray-300 right-0 flex items-center">
                  <label htmlFor="folders" className="sr-only">
                    Folders
                  </label>
                  <select
                    id="folders"
                    name="folders"
                    onChange={(e) => {
                      console.log({ tar: e.target.value })
                      setFolder(e.target.value)
                    }}
                    className="h-full border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm"
                  >
                    {[
                      { name: 'Select Folder', value: 'Select Folder' },
                      ...getLocalStorage('allFolders'),
                    ].map((folder) => (
                      <option value={folder?.id}>{folder?.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <button
                type="submit"
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {item !== null ? 'Edit Topic' : 'Create Topic'}
              </button>
            </form>
          </div>
        </div>
      </div>
      {item !== null ? (
        <div>
          <div>
            <div className="flex gap-x-4 mt-6">
              <div className="flex flex-col justify-center items-center">
                {/* <div className="text-lg font-bold text-indigo-600">Answers</div> */}

                <div className="flex gap-x-4 h-full items-center w-[700px] mx-auto overflow-hidden justify-center">
                  <div className="flex flex-col justify-center items-center mt-4  border border-gray-300 p-4 rounded-xl bg-slate-100">
                    <div className="text-lg font-bold">Answers</div>
                    <div className="w-[306px]">
                      <div className="isolate -space-y-px rounded-md">
                        <div className="relative w-full rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ">
                          <label
                            htmlFor={'ans_label'}
                            className="block text-base  font-medium text-gray-900"
                          >
                            Label
                          </label>
                          <input
                            type="text"
                            name={'Answer with Regex'}
                            id={'ans_label'}
                            value={answer?.label}
                            className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 sm:leading-6 rounded-lg mt-2 focus-within:z-10 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
                            placeholder={'Answer with Regex'}
                            //@ts-ignore
                            onChange={(e) => setAnswer({ ...answer, label: e.target.value })}
                          />
                        </div>
                        <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5  ">
                          <label
                            htmlFor={'cta_label'}
                            className="block text-base  font-medium text-gray-900"
                          >
                            Topic Answer
                          </label>
                          <input
                            type="text"
                            value={answer?.value}
                            name={'Label for CTA'}
                            id={'cta_label'}
                            className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 sm:leading-6 rounded-lg mt-2 focus-within:z-10 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
                            placeholder={'Link with Regex Context'}
                            //@ts-ignore
                            onChange={(e) => setAnswer({ ...answer, value: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex justify-center items-center mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            submitHandler()
                            setAnswer({ label: '', value: '' })
                          }}
                          className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {loading ? <SpinnerLoader className="h-5 w-5" /> : ' Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center mt-4  border border-gray-300 p-4 rounded-xl bg-slate-100">
                    <div className="text-lg font-bold">CTA</div>
                    <div className="w-[306px]">
                      <div className="isolate -space-y-px rounded-md">
                        <div className="relative w-full rounded-md rounded-b-none px-3 pb-1.5 pt-2.5  ">
                          <label
                            htmlFor={'ans_label'}
                            className="block text-base  font-medium text-gray-900"
                          >
                            Label
                          </label>
                          <input
                            type="text"
                            name={'Answer with Regex'}
                            value={cta?.label}
                            id={'ans_label'}
                            className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 sm:leading-6 rounded-lg mt-2 focus-within:z-10 focus:ring-1 focus:ring-inset focus:ring-indigo-500 "
                            placeholder={'Answer with Regex'}
                            //@ts-ignore
                            onChange={(e) => setCTA({ ...cta, label: e.target.value })}
                          />
                        </div>
                        <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ">
                          <label
                            htmlFor={'cta_label'}
                            className="block text-base  font-medium text-gray-900"
                          >
                            CTA Answer
                          </label>
                          <input
                            type="text"
                            name={'Label for CTA'}
                            value={cta?.value}
                            id={'cta_label'}
                            className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400  sm:leading-6 rounded-lg mt-2 focus-within:z-10 focus:ring-1 focus:ring-inset focus:ring-indigo-500 
                            "placeholder={'Link with Regex Context'}
                            //@ts-ignore
                            onChange={(e) => setCTA({ ...cta, value: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex justify-center items-center mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            submitHandler()
                            setCTA({ label: '', value: '' })
                          }}
                          className="rounded-md bg-indigo-600 px-10 p-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {loading ? <SpinnerLoader className="h-5 w-5" /> : ' Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8    text-xl font-bold">{item?.topic}</div>
          <div className="flex gap-x-4 w-full">
            <div className="w-full">
              <div className="mx-auto w-full max-w-md rounded-2xl bg-white pt-2">
                {item?.answer?.filter((i) => {
                  if (i.label !== '' && i.value !== '') {
                    return true
                  }
                  return false
                }).length > 0 ? (
                  item?.answer
                    ?.filter((i) => {
                      if (i.label !== '' && i.value !== '') {
                        return true
                      }
                      return false
                    })
                    .map((ans, index: number) => (
                      <Disclosure as="div" className="my-2" key={index}>
                        {({ open }) => (
                          <>
                            <div className="flex border border-slate-300 bg-slate-50 rounded-md px-4 ">
                              <Disclosure.Button className="flex w-full justify-between rounded-lg pr-4 py-2 text-left text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 ">
                                <span>{ans?.label ?? ''}</span>
                                <ChevronUpIcon
                                  className={`${open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-indigo-500`}
                                />
                              </Disclosure.Button>
                              <button className="">
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>
                            <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500 bg-slate-100 rounded-md">
                              {ans?.value ?? ''}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))
                ) : (
                  <div className="text-lg font-semibold text-center">No answers yet</div>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="mx-auto w-full max-w-md rounded-2xl bg-white pt-2">
                {item?.cta?.filter((i) => {
                  if (i.label !== '' && i.value !== '') {
                    return true
                  }
                  return false
                }).length > 0 ? (
                  item?.cta
                    ?.filter((i) => {
                      if (i.label !== '' && i.value !== '') {
                        return true
                      }
                      return false
                    })
                    .map((ans, index: number) => (
                      <Disclosure as="div" className="my-2" key={index}>
                        {({ open }) => (
                          <>
                            <div className="flex border border-slate-300 bg-slate-50 rounded-md px-4 ">
                              <Disclosure.Button className="flex w-full justify-between rounded-lg pr-4 py-2 text-left text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 ">
                                <span>{ans?.label ?? ''}</span>
                                <ChevronUpIcon
                                  className={`${open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-indigo-500`}
                                />
                              </Disclosure.Button>
                              <div className='flex gap-x-2'>
                                <button className="">
                                  <PencilSquareIcon className="w-6 h-6" stroke='blue' />
                                </button>
                                <button className="">
                                  <TrashIcon className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                            <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500 bg-slate-100 rounded-md">
                              {ans?.value ?? ''}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))
                ) : (
                  <div className="text-lg font-semibold text-center">No answers yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-2xl font-bold my-16">Create a Topic First.</div>
      )}
    </Fragment>
  )
}

export default withAuth(Create)
