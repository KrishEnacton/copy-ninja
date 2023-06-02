import CustomInput from '../commonComponents/core/Input'
import { useLocation } from 'react-router-dom'

const TopicSection = () => {
  const location = useLocation()

  return (
    <div className="px-2 py-6 text-lg text-black">
      <div className="flex gap-x-1">
        <span className="text-base font-semibold text-indigo-500">Answer:</span>
      </div>
      <div>
        <CustomInput
          className={'accent-pink-500 w-full h-[100px]'}
          type={'textarea'}
          name={'edit_ans'}
          id={'edit_ans'}
          value={location.state.ans}
        />
      </div>
      <div className="flex gap-x-1 mt-2">
        <span className=" text-base font-semibold text-indigo-500">CTA:</span>
      </div>
      <div>
        <CustomInput
          className={'accent-pink-500 w-full h-[100px]'}
          type={'textarea'}
          name={'edit_cta'}
          id={'edit_cta'}
          value={location.state.cta}
        />
      </div>
    </div>
  )
}

export default TopicSection
