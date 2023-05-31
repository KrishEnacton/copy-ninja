import { ChangeEvent } from 'react'
import CustomInput from '../../popup/components/commonComponents/core/Input'
import { PlusIcon } from '@heroicons/react/20/solid'

const InputGroup = ({
  text,
  textarea,
  textId,
  textareaId
}: {
  text: string
  textarea: string
  textareaId: string
  textId: string
}) => {
  return (
    <div className="w-[350px]">
      <div className="isolate -space-y-px rounded-md shadow-sm">
        <div className="relative w-full rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
          <label htmlFor={text} className="block text-xs font-medium text-gray-900">
            Label
          </label>
          <input
            type="text"
            name={text}
            id={textId}
            className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:leading-6"
            placeholder={text}
            onChange={(e) => (e.target.value)}
          />
        </div>
        <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
          <label htmlFor={textarea} className="block text-xs font-medium text-gray-900">
            Topic Answer
          </label>
          <input
            type="text"
            name={textarea}
            id={textareaId}
            className="block w-full text-md border-0 px-2 py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:leading-6"
            placeholder={textarea}
          />
        </div>
      </div>
      <div className='flex justify-center items-center my-4'>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
      </div>
    </div>
  )
}

export default InputGroup
