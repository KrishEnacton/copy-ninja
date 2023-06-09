import { SpinnerLoader } from '../../popup/components/commonComponents/SpinnerLoader'

const InputGroup = ({
  input,
  inputLabelHandler,
  inputAnswerHandler,
  inputSubmitHandler,
  loading,
  inputValue
}: {
  input: any
  inputLabelHandler: any
  inputAnswerHandler: any
  inputSubmitHandler: any
  loading: any
  inputValue?: string
}) => {
  return (
    <div className="flex flex-col justify-center items-center mt-4  border border-gray-300 p-4 rounded-xl bg-slate-100">
      <div className="text-lg font-bold">Answers</div>
      <div className="w-[306px]">
        <div className="isolate -space-y-px rounded-md">
          <div className="relative w-full rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ">
            <label htmlFor={'ans_label'} className="block text-base  font-medium text-gray-900">
              Label
            </label>
            <input
              type="text"
              name={'Answer with Regex'}
              id={'ans_label'}
              value={input?.label}
              className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 sm:leading-6 rounded-lg mt-2 focus-within:z-10 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
              placeholder={'Answer with Regex'}
              //@ts-ignore
              onChange={inputLabelHandler}
            />
          </div>
          <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5  ">
            <label htmlFor={'cta_label'} className="block text-base  font-medium text-gray-900">
               {inputValue} Answer
            </label>
            <input
              type="text"
              value={input?.value}
              name={'Label for CTA'}
              id={'cta_label'}
              className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 sm:leading-6 rounded-lg mt-2 focus-within:z-10 focus:ring-1 focus:ring-inset focus:ring-indigo-500"
              placeholder={'Link with Regex Context'}
              //@ts-ignore
              onChange={inputAnswerHandler}
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            type="button"
            onClick={inputSubmitHandler}
            className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? <SpinnerLoader className="h-5 w-5" /> : ' Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputGroup
