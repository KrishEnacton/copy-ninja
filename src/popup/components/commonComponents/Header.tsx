import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import LogoutIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import { userState } from '../../../options/recoil/atoms'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'

const Header = ({ className }: { className?: string }) => {
  const [isModal, setIsModal] = useState(false)
  const [user, setUser] = useRecoilState(userState)
  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem('user')
    setIsModal(false)
    setUser(null)
  }

  return (
    <nav className={`bg-white border-gray-200 dark:bg-gray-900 relative ${className}`}>
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4 md:py-4 md:px-0">
        {/* ----TOP HEADER PADDING------ */}
        <button className="flex items-center" onClick={() => navigate("/home")}>
          <img
            src={chrome.runtime.getURL('/img/CopyNinja.png')}
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-[1rem] font-semibold whitespace-nowrap text-black">
            Copy Ninja
          </span>
        </button>
        {user && Object.values(user).length > 0 && (
          <div className="flex items-center md:order-2">
            <button
              onClick={() => setIsModal(true)}
              className="py-2 px-3 flex text-gray-800 dark:text-white bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  md:px-5 md:py-2.5 mr-1 md:mr-0 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 border border-gray-300"
            >
              Logout
              <LogoutIcon className="h-5 w-5 ml-1" stroke="black" />
            </button>
          </div>
        )}
        <Transition.Root show={isModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsModal(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-[63%] items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Sure you want to Log-out?
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 flex gap-x-2">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        onClick={() => logout()}
                      >
                        {'Yes'}
                      </button>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => setIsModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </nav>
  )
}

export default Header
