import { useRef } from 'react'
import Modal from './Modal'
import { getLocalStorage, setLocalStorage } from '../../../../utils'
import pin from '../../../../assets/pin.png'
import unpin from '../../../../assets/unpin.png'

const PopupList = ({ className, item, onItemClick, SideButton, isModal, ModalChild }) => {
  const modalRef = useRef<any>()

  return (
    <div
      className={`${className} group flex justify-between items-center py-2 text-indigo-500 font-medium`}
      onClick={() => onItemClick(item)}
    >
      {item.pin ? (
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            let pinned = getLocalStorage('pinned') || []
            setLocalStorage(
              'pinned',
              pinned.filter((a) => a != item.id),
            )
            window.dispatchEvent(new Event('storage'))
          }}
        >
          <img className="object-contain h-5 w-5" src={unpin} alt="" />
        </div>
      ) : (
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            let pinned = getLocalStorage('pinned') || []
            if (pinned.includes(item?.id)) return
            pinned.push(item?.id)
            setLocalStorage('pinned', pinned)
            window.dispatchEvent(new Event('storage'))
          }}
        >
          <img className="object-contain h-5 w-5" src={pin} alt="" />
        </div>
      )}
      <div className="group-hover:cursor-pointer flex-1 ml-3">{item?.topic}</div>
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
