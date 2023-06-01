import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const DisclosureComponent = ({
  ans,
  index,
  editHandler,
  deleteHandler,
  loading,
  setloading,
}: {
  ans: any
  index: number
  editHandler: any
  deleteHandler: any,
  loading?: any,
  setloading?: any
}) => {
  return (
    <Disclosure as="div" className="my-2" key={index}>
      {({ open }) => (
        <>
          <div className="flex border border-slate-300 bg-slate-50 rounded-md px-4">
            <Disclosure.Button className="flex w-full justify-between rounded-lg pr-4 py-2 text-left text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
              <span>{ans?.label ?? ''}</span>
              <ChevronUpIcon
                className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-indigo-500`}
              />
            </Disclosure.Button>
            <div className="flex gap-x-2">
              <button className="mt-1.5" onClick={editHandler}>
                <PencilSquareIcon className="w-6 h-6" stroke="blue" />
              </button>
              <button className="mt-1.5" onClick={deleteHandler}>
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
  )
}

export default DisclosureComponent
