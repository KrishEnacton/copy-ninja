import { useRef } from 'react'
import Modal from './Modal'

const PopupList = ({ className, item, onItemClick, SideButton, isModal, ModalChild }) => {
  const modalRef = useRef<any>()

  return (
    <div
      className={`${className} group flex justify-between py-2 text-indigo-500 font-medium`}
      onClick={() => onItemClick(item)}
    >
      <div className="group-hover:cursor-pointer">{item?.topic}</div>
      {SideButton && <SideButton />}
      {isModal && (
        <div className="flex gap-x-4">
          <Modal ref={modalRef}>{ModalChild}</Modal>
        </div>
      )}
    </div>
  )
}

export default PopupList
