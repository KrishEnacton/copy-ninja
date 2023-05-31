import { Fragment, useEffect, useLayoutEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRecoilState } from 'recoil'
import { selectedType, topicType } from '../../../recoil/atoms'

const Dropdown = ({
  selectOptions,
  id,
  setOptions,
  className,
}: {
  selectOptions: string[]
  id: string
  setOptions?: any
  className?: string
}) => {
  const [selected, setSelected] = useRecoilState(topicType(id))
  const [selectedOption, setSelectedOption] = useRecoilState(selectedType)
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function handleChange(value: string) {
    if (typeof setOptions === 'function') setOptions({ value })
  }

  useEffect(() => {
    if (id === 'topicType') {
      setSelected('random')
    }
  }, [])

  useEffect(() => {
  }, [selected, selectedOption])

  return (
    <div className={`${className} flex justify-center relative w-full`}>
      <Menu id={id} as="div" className=" inline-block text-left w-full">
        <div className="w-full">
          <Menu.Button className="inline-flex justify-between w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <span className={`${selected === '' && 'text-gray-400'}`}>{selected}</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 left-0 m-auto max-h-28 overflow-auto z-10 mt-2 w-full origin-top-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 w-full">
              {selectOptions.filter(Boolean).length > 0 &&
                selectOptions?.map((selectOption, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-left text-sm',
                        )}
                        onClick={() => {
                          setSelected(selectOption)
                          if (id === 'topicType') setSelectedOption(selectOption)
                          handleChange(selectOption)
                        }}
                      >
                        {selectOption}
                      </a>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Dropdown
