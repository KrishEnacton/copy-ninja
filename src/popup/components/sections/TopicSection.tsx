import CustomInput from '../commonComponents/core/Input'

const TopicSection = () => {
  return (
    <div className="px-2 py-8 text-lg text-black">
      <div className="flex gap-x-3">
        <span>Answer:</span>
        <span>Create a react application</span>
      </div>
      <div>
        <CustomInput
          className={'accent-pink-500 w-full'}
          type={'textarea'}
          name={'edit_ans'}
          id={'edit_ans'}
        />
      </div>
      <div className="flex gap-x-3">
        <span>CTA:</span>
        <span>Create a react application</span>
      </div>
      <div>
        <CustomInput
          className={'accent-pink-500 w-full rounded-md'}
          type={'text'}
          name={'edit_cta'}
          id={'edit_cta'}
        />
      </div>
    </div>
  )
}

export default TopicSection
