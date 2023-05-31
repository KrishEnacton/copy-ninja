import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Popup'
import '../tailwind/input.css'
import '../tailwind/output.css'
import { RecoilRoot } from 'recoil'
import { getLocalStorage } from '../utils'

;(function () {
  //@ts-ignore
  document.getElementById('app').classList.add('h-[450px]')
  //@ts-ignore
  document.getElementById('app').classList.add('w-[400px]')
  const user = getLocalStorage('user')
  ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
    <div className="bg-gray-50 h-full">
      <RecoilRoot>
        <React.StrictMode>
          <App user={user} />
        </React.StrictMode>
      </RecoilRoot>
    </div>,
  )
})()
