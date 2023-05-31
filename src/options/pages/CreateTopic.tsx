import { ArrowLeftIcon, ChevronUpIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import React, { Fragment, useState } from 'react'
import InputGroup from '../components/InputGroup'
import { useNavigate } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { withAuth } from '../components/HOC/withAuth'
import useSupabase from '../../supabase/use-supabase'

const Create: React.FC = () => {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState<{ label: string; value: string }[]>([
    { label: '', value: '' },
  ])
  const [answer, setAnswer] = useState<{ label: any; value: any }>()
  const [topic, setTopic] = useState('')
  const [ctas, setCTAs] = useState<{ label: string; value: string }[]>([{ label: '', value: '' }])
  const [cta, setCTA] = useState<{ label: any; value: any }>()

  const {createFolder} = useSupabase()

  return (
    <Fragment>
      <div className="text-xl font-bold flex gap-x-4">
        <span
          className="isolate inline-flex rounded-md shadow-sm"
          onClick={() => navigate('/home')}
        >
          <button
            type="button"
            className="relative inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <ArrowLeftIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            View All Topics
          </button>
        </span>
      </div>
      <div className="my-4">
        <label htmlFor="topic" className="block text-sm font-medium leading-6 text-gray-900">
          Topic
        </label>
        <div className="flex gap-x-3">
          <div className="mt-2">
            <input
              type="topic"
              name="topic"
              id="topic"
              className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
              placeholder="Enter Topic"
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              console.log('cllicked')
              createFolder(topic)
            }}
            className="rounded-1/2 bg-indigo-600 px-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div>
        <div className="flex gap-x-4 mt-6">
          <div className="flex flex-col justify-center items-center">
            <div className="text-lg font-bold">Answers</div>

            <div className="flex gap-x-4">
              <div className="flex flex-col justify-center items-center">
                <div className="text-lg font-bold">Answers</div>
                <div className="w-[350px]">
                  <div className="isolate -space-y-px rounded-md shadow-sm">
                    <div className="relative w-full rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                      <label
                        htmlFor={'ans_label'}
                        className="block text-xs font-medium text-gray-900"
                      >
                        Label
                      </label>
                      <input
                        type="text"
                        name={'Answer with Regex'}
                        id={'ans_label'}
                        className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:leading-6"
                        placeholder={'Answer with Regex'}
                        //@ts-ignore
                        onChange={(e) => setAnswer({ ...answer, label: e.target.value })}
                      />
                    </div>
                    <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                      <label
                        htmlFor={'cta_label'}
                        className="block text-xs font-medium text-gray-900"
                      >
                        Topic Answer
                      </label>
                      <input
                        type="text"
                        name={'Label for CTA'}
                        id={'cta_label'}
                        className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:leading-6"
                        placeholder={'Link with Regex Context'}
                        //@ts-ignore
                        onChange={(e) => setAnswer({ ...answer, value: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center my-4">
                    <button
                      type="button"
                      //@ts-ignore
                      onClick={() => setAnswers((prev) => [...prev, answer])}
                      className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="text-lg font-bold">CTA</div>
                <div className="w-[350px]">
                  <div className="isolate -space-y-px rounded-md shadow-sm">
                    <div className="relative w-full rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                      <label
                        htmlFor={'ans_label'}
                        className="block text-xs font-medium text-gray-900"
                      >
                        Label
                      </label>
                      <input
                        type="text"
                        name={'Answer with Regex'}
                        id={'ans_label'}
                        className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:leading-6"
                        placeholder={'Answer with Regex'}
                        //@ts-ignore
                        onChange={(e) => setCTA({ ...cta, label: e.target.value })}
                      />
                    </div>
                    <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                      <label
                        htmlFor={'cta_label'}
                        className="block text-xs font-medium text-gray-900"
                      >
                        CTA Answer
                      </label>
                      <input
                        type="text"
                        name={'Label for CTA'}
                        id={'cta_label'}
                        className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:leading-6"
                        placeholder={'Link with Regex Context'}
                        //@ts-ignore
                        onChange={(e) => setCTA({ ...cta, value: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center my-4">
                    <button
                      type="button"
                      //@ts-ignore
                      onClick={() => setCTAs((prev) => [...prev, cta])}
                      className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xl font-bold">{topic}</div>
      <div className="flex gap-x-16 w-full">
        <div className="w-full px-4 pt-16">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            {answers.filter((i) => {
              if (i.label !== '' && i.value !== '') {
                return true
              }
              return false
            }).length > 0 ? (
              answers
                .filter((i) => {
                  if (i.label !== '' && i.value !== '') {
                    return true
                  }
                  return false
                })
                .map((ans) => (
                  <Disclosure as="div" className="my-2">
                    {({ open }) => (
                      <>
                        <div className="flex">
                          <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                            <span>{ans.label}</span>
                            <ChevronUpIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-indigo-500`}
                            />
                          </Disclosure.Button>
                          <button
                            className="mt-1.5"
                            onClick={() =>
                              setAnswers([...answers.filter((i) => i.label !== ans.label)])
                            }
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          {ans.value}
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
        <div className="w-full px-4 pt-16">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            {ctas.filter((i) => {
              if (i.label !== '' && i.value !== '') {
                return true
              }
              return false
            }).length > 0 ? (
              ctas
                .filter((i) => {
                  if (i.label !== '' && i.value !== '') {
                    return true
                  }
                  return false
                })
                .map((ans) => (
                  <Disclosure as="div" className="my-2">
                    {({ open }) => (
                      <>
                        <div className="flex">
                          <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                            <span>{ans.label}</span>
                            <ChevronUpIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-indigo-500`}
                            />
                          </Disclosure.Button>
                          <button
                            className="mt-1.5"
                            onClick={() => setCTAs([...ctas.filter((i) => i.label !== ans.label)])}
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          {ans.value}
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
    </Fragment>
  )
}

export default withAuth(Create)
