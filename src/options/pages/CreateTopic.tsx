import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { withAuth } from '../components/HOC/withAuth'
import useSupabase from '../../supabase/use-supabase'
import { getLocalStorage } from '../../utils'
import { TopicParams } from '../../utils/global'
import { SpinnerLoader } from '../../popup/components/commonComponents/SpinnerLoader'
import DisclosureComponent from '../components/Disclosure'
import MainLayout from '../../popup/layouts/main'
import { v4 as uuidv4 } from 'uuid'
import Modal from '../../popup/components/commonComponents/core/Modal'
import { Dialog } from '@headlessui/react'

const Create: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [item, setItem] = useState<any>(location.state)
  const modalRef = useRef<any>()
  console.log({ item })
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
  const [answersEdit, setIsAnswersEdit] = useState<{ ans?: boolean; cta?: boolean }>({
    ans: false,
    cta: false,
  })
  const [answer, setAnswer] = useState<{ label?: string; value?: string; id?: string }>()
  const [cta, setCTA] = useState<{ label: string; value: string; id?: string }>()
  const [selected, setSelected] = useState<any>(null)
  const [topicName, setTopicName] = useState('')

  const { updateTopic } = useSupabase()

  async function submitHandler(e?: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault()
    answer?.label !== '' && answer?.value !== ''
      ? setLoading({ answerLoading: true })
      : cta?.label !== '' && cta?.value !== ''
      ? setLoading({ ctaLoading: true })
      : setLoading({ answerLoading: false, ctaLoading: false })
    let result: any
    let body: TopicParams

    if (cta) {
      body = {
        ...item,
        answer: item.answer,
        cta: [...item?.cta, { ...cta, id: uuidv4() }],
        topic: topicName,
      }
      console.log({ body })
      result = await updateTopic(body)
    }
    if (answer) {
      body = {
        ...item,
        answer: [...item?.answer, { ...answer, id: uuidv4() }],
        cta: item.cta,
        topic: topicName,
      }
      result = await updateTopic(body)
    }
    if (result?.data?.[0]?.id) {
      setItem(result.data?.[0])
      setLoading({ answerLoading: false, ctaLoading: false })
    }
  }

  async function editAnswersHandler() {
    let result: any
    let body: TopicParams
    if (answersEdit.ans || answer?.id) {
      setLoading({ answerLoading: true })
      body = {
        ...item,
        answer: item.answer.map((item) => {
          if (item.id === answer?.id) {
            item = answer
          }
          return item
        }),
        cta: item.cta,
        topic: topicName,
      }
      result = await updateTopic(body)
    }
    if (answersEdit?.cta || cta?.id) {
      setLoading({ ctaLoading: true })
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
      result = await updateTopic(body)
    }
    if (result?.data?.[0]?.id) {
      setItem(result.data?.[0])
      setIsAnswersEdit({ ans: false, cta: false })
      setLoading({ answerLoading: false, ctaLoading: false })
    }
  }
  async function deleteHandler(selected: any) {
    let result: any
    let body: TopicParams
    if (selected?.type === 'ans') {
      setLoading({ answerdeleteLoading: true })
      body = {
        ...item,
        answer: item.answer.filter((item) => item.id !== selected?.ans?.id),
        cta: item.cta,
        topic: topicName,
      }
      result = await updateTopic(body)
    }
    if (selected?.type === 'cta') {
      setLoading({ ctadeleLoading: true })
      body = {
        ...item,
        cta: item.cta.filter((item) => item.id !== selected?.ans?.id),
        answer: item.answer,
        topic: topicName,
      }
      result = await updateTopic(body)
    }
    console.log({ result })
    if (result?.data?.[0]?.id) {
      setItem(result.data?.[0])
      setIsAnswersEdit({ ans: false, cta: false })
      setLoading({
        answerdeleteLoading: false,
        ctadeleLoading: false,
      })
      modalRef.current.closeModal()
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
                        <textarea
                          rows={4}
                          value={answer?.value}
                          name={'Label for CTA'}
                          id={'topic_ans_label'}
                          placeholder={'Link with Regex Context'}
                          onChange={(e) => setAnswer({ ...answer, value: e.target.value })}
                          className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 sm:leading-6 rounded-lg mt-2 focus-within:z-10 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
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
                        <textarea
                          rows={4}
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
                          if (answersEdit.ans || answersEdit.cta) {
                            editAnswersHandler()
                          } else submitHandler()
                          setCTA({ label: '', value: '' })
                        }}
                        className="rounded-md bg-indigo-600 px-10 p-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {loading.ctaLoading ? (
                          <SpinnerLoader className="h-5 w-5" />
                        ) : answersEdit.cta ? (
                          'Edit'
                        ) : (
                          ' Add'
                        )}
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
                      key={index}
                      editHandler={() => {
                        setAnswer({ label: ans.label, value: ans.value, id: ans.id })
                        setIsAnswersEdit({ ans: true })
                      }}
                      deleteHandler={() => {
                        setSelected({ type: 'ans', ans })
                        modalRef.current.openModal()
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
                      key={index}
                      editHandler={() => {
                        setCTA({ label: ans.label, value: ans.value, id: ans.id })
                        setIsAnswersEdit({ cta: true })
                      }}
                      deleteHandler={() => {
                        setSelected({ type: 'cta', ans })
                        modalRef.current.openModal()
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
          <Modal ref={modalRef}>
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-base font-bold leading-6 text-red-900 mb-4">
                    {`Sure, you want to delete the ${selected?.type == 'ans' ? 'Answer' : 'CTA'}?`}
                  </Dialog.Title>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 flex gap-x-2">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  onClick={() => deleteHandler(selected)}
                >
                  {loading.answerdeleteLoading || loading.ctadeleLoading ? (
                    <SpinnerLoader className="w-5 h-5" />
                  ) : (
                    'Yes'
                  )}
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
          </Modal>
        </div>
      </div>
    </MainLayout>
  )
}

export default withAuth(Create)
