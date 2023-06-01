import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { withAuth } from '../components/HOC/withAuth'
import useSupabase from '../../supabase/use-supabase'
import { getLocalStorage } from '../../utils'
import { TopicParams } from '../../utils/global'
import { SpinnerLoader } from '../../popup/components/commonComponents/SpinnerLoader'
import DisclosureComponent from '../components/Disclosure'
import MainLayout from '../../popup/layouts/main'
import { v4 as uuidv4 } from 'uuid'
import InputGroup from '../components/InputGroup'

const Create: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [item, setItem] = useState<any>(location.state)
  const [loading, setLoading] = useState<{
    answerLoading?: boolean
    ctaLoading?: boolean
    answerdeleteLoading?: boolean
    ctadeleLoading?: boolean
  }>({
    answerLoading: false,
    ctaLoading: false,
    answerdeleteLoading: false,
    ctadeleLoading: false,
  })
  const [answer, setAnswer] = useState<{ label?: string; value?: string; id?: string }>()
  const [cta, setCTA] = useState<{ label: string; value: string; id?: string }>()
  const [topicName, setTopicName] = useState('')
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [folder, setFolder] = useState<any>(null)
  const [answersEdit, setIsAnswersEdit] = useState<{ ans?: boolean; cta?: boolean }>({
    ans: false,
    cta: false,
  })
  const [answersDelete, setIsAnswersDelete] = useState<{ ans?: boolean; cta?: boolean }>({
    ans: false,
    cta: false,
  })

  const { createTopic, updateTopic } = useSupabase()

  async function submitHandler(e?: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault()
    answer
      ? setLoading({ answerLoading: true })
      : cta
      ? setLoading({ ctaLoading: true })
      : setLoading({ answerLoading: false, ctaLoading: false })
    let result: any
    let body: TopicParams

    if (topicName) {
      if (item !== null) {
        if (cta) {
          body = { ...item, answer: item.answer, cta: [...item?.cta, cta], topic: topicName }
          result = await updateTopic(body)
        }
        if (answer) {
          body = { ...item, answer: [...item?.answer, answer], cta: item.cta, topic: topicName }
          console.log({ answer, body })
          result = await updateTopic(body)
        }
      } else {
        result = await createTopic({
          folderId: folder,
          topic: topicName,
          id: uuidv4(),
        })
      }
      if (result?.data?.[0]?.id) {
        setItem(result.data?.[0])
        setLoading({ answerLoading: false, ctaLoading: false })
      }
    } else {
      setIsEmpty(true)
    }
  }

  async function editAnswersHandler() {
    let result: any
    let body: TopicParams
    if (answersEdit.ans) {
      setLoading({ answerLoading: true })
      if (answer?.id) {
        body = {
          ...item,
          answer: item.answer.map((item) => {
            if (item.id === answer.id) {
              item = answer
            }
            return item
          }),
          cta: item.cta,
          topic: topicName,
        }
        console.log({ body })
        result = await updateTopic(body)
      }
    }
    if (answersEdit?.cta) {
      if (answer?.id) {
        body = {
          ...item,
          cta: item.cta.map((item) => {
            if (item.id === cta?.id) {
              item = cta
            }
            return item
          }),
          answer: item.answer,
          topic: topicName,
        }
        console.log({ body })
        result = await updateTopic(body)
      }
    }
    if (result?.data?.[0]?.id) {
      setItem(result.data?.[0])
      setIsAnswersEdit({ ans: false, cta: false })
      setLoading({ answerLoading: false, ctaLoading: false })
    }
  }
  async function deleteHandler() {
    let result: any
    let body: TopicParams
    if (answersEdit.ans) {
      setLoading({ answerLoading: true })
      if (answer?.id) {
        body = {
          ...item,
          answer: item.answer.filter((item) => item.id === answer?.id),
          cta: item.cta,
          topic: topicName,
        }
        console.log({ body })
        result = await updateTopic(body)
      }
    }
    if (answersEdit?.cta) {
      if (answer?.id) {
        body = {
          ...item,
          cta: item.cta.filter((item) => item.id === cta?.id),
          answer: item.answer,
          topic: topicName,
        }
        console.log({ body })
        result = await updateTopic(body)
      }
    }
    if (result?.data?.[0]?.id) {
      setItem(result.data?.[0])
      setIsAnswersEdit({ ans: false, cta: false })
      setLoading({
        answerLoading: false,
        ctaLoading: false,
        answerdeleteLoading: false,
        ctadeleLoading: false,
      })
    }
  }

  useLayoutEffect(() => {
    setItem(location.state)
    setTopicName(location?.state?.topic)
  }, [location.state])

  return (
    <MainLayout
      isOption={true}
      headerClassName="w-full"
      className={'items-center w-[700px] mx-auto'}
    >
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
        <div className="flex gap-x-3 justify-center items-center">
          <div className="text-2xl font-bold">Topic: {item?.topic}</div>
        </div>
      </div>
      <div>
        <div>
          <div className="flex gap-x-4 mt-6">
            <div className="flex flex-col justify-center items-center">
              <div className="flex gap-x-4">
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
                          htmlFor={'topic_ans_label'}
                          className="block text-base  font-medium text-gray-900"
                        >
                          Topic Answer
                        </label>
                        <input
                          type="text"
                          value={answer?.value}
                          name={'Label for CTA'}
                          id={'topic_ans_label'}
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
                          if (answersEdit.ans || answersEdit.cta) {
                            editAnswersHandler()
                          } else submitHandler()
                          setAnswer({ label: '', value: '' })
                        }}
                        className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {loading.answerLoading ? (
                          <SpinnerLoader className="h-5 w-5" />
                        ) : answersEdit.ans ? (
                          'Edit'
                        ) : (
                          ' Add'
                        )}
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
                          htmlFor={'cta_label'}
                          className="block text-base  font-medium text-gray-900"
                        >
                          Label
                        </label>
                        <input
                          type="text"
                          name={'Answer with Regex'}
                          value={cta?.label}
                          id={'cta_label'}
                          className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 sm:leading-6 rounded-lg mt-2 focus-within:z-10 focus:ring-1 focus:ring-inset focus:ring-indigo-500 "
                          placeholder={'Answer with Regex'}
                          //@ts-ignore
                          onChange={(e) => setCTA({ ...cta, label: e.target.value })}
                        />
                      </div>
                      <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ">
                        <label
                          htmlFor={'cta_ans_label'}
                          className="block text-base  font-medium text-gray-900"
                        >
                          CTA Answer
                        </label>
                        <input
                          type="text"
                          name={'Label for CTA'}
                          value={cta?.value}
                          id={'cta_ans_label'}
                          className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400  sm:leading-6 rounded-lg mt-2 focus-within:z-10 focus:ring-1 focus:ring-inset focus:ring-indigo-500 
                            "
                          placeholder={'Link with Regex Context'}
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
                        {loading.ctaLoading ? <SpinnerLoader className="h-5 w-5" /> : ' Add'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white pt-2">
              {item?.answer?.filter(Boolean).length > 0 ? (
                item?.answer
                  ?.filter((i) => {
                    if (i.label !== '' && i.value !== '') {
                      return true
                    }
                    return false
                  })
                  .map((ans, index: number) => (
                    <DisclosureComponent
                      editHandler={() => {
                        setAnswer({ label: ans.label, value: ans.value, id: ans.id })
                        setIsAnswersEdit({ ans: true })
                      }}
                      deleteHandler={() => {
                        setIsAnswersDelete({ ans: true })
                        deleteHandler()
                      }}
                      ans={ans}
                      index={index}
                      loading={loading}
                      setloading={setLoading}
                    />
                  ))
              ) : (
                <div className="text-lg font-semibold text-center">No answers yet</div>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white pt-2">
              {item.cta.filter(Boolean).length > 0 ? (
                item?.cta
                  ?.filter((i) => {
                    if (i.label !== '' && i.value !== '') {
                      return true
                    }
                    return false
                  })
                  .map((ans, index: number) => (
                    <DisclosureComponent
                      ans={ans}
                      editHandler={() => {
                        setCTA({ label: ans.label, value: ans.value, id: ans.id })
                        setIsAnswersEdit({ cta: true })
                      }}
                      deleteHandler={() => {
                        setIsAnswersDelete({ cta: true })
                        deleteHandler()
                      }}
                      index={index}
                      loading={loading}
                      setloading={setLoading}
                    />
                  ))
              ) : (
                <div className="text-lg font-semibold text-center">No answers yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default withAuth(Create)
