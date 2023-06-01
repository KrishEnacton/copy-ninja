import { Fragment, useEffect, useLayoutEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRecoilState } from 'recoil'
import { selectedType, topicType } from '../../../recoil/atoms'
import { setLocalStorage } from '../../../../utils'

const KKDropdown = ({
  id,
  setOptions,
  className,
  setSelected,
  selected,
  listData,
  labelKey,
  setDefaultValueKey,
}: {
  id: string
  setOptions?: any
  className?: string
  setSelected: any
  selected: any
  listData: any[]
  labelKey?: any
  setDefaultValueKey?: any
}) => {
  //   const [selectedOption, setSelectedOption] = useRecoilState(selectedType)
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function handleChange(value: string) {
    if (typeof setOptions === 'function') setOptions({ value })
  }

  const label = labelKey ? selected?.[labelKey] : selected?.name

  return (
    <div className={`${className} flex justify-center relative w-full`}>
      <Menu id={id} as="div" className=" inline-block text-left w-full">
        <div className="w-full">
          <Menu.Button className="inline-flex justify-between w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <span className={`${selected === '' && 'text-gray-400'}`}>
              {label ? label : 'No data found!'}
            </span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        {listData.length > 0 && (
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {listData.length > 0 ? (
              <Menu.Items className="absolute right-0 left-0 m-auto max-h-28 overflow-auto z-10 mt-2 w-full origin-top-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 w-full">
                  {listData?.map((selectOption, index) => {
                    return (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-left text-sm cursor-pointer',
                            )}
                            onClick={() => {
                              setSelected(selectOption)
                              handleChange(selectOption)
                              if (setDefaultValueKey)
                                setLocalStorage(setDefaultValueKey, selectOption)
                            }}
                          >
                            {labelKey ? selectOption[labelKey] : selectOption.name}
                          </div>
                        )}
                      </Menu.Item>
                    )
                  })}
                </div>
              </Menu.Items>
            ) : (
              <div>No data found!</div>
            )}
          </Transition>
        )}
      </Menu>
    </div>
  )
}

export default KKDropdown
