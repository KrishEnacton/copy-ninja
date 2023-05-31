import CustomInput from '../commonComponents/core/Input'

const TopicSection = () => {
  return (
    <div className="px-2 py-8 text-lg text-black">
      <div className="flex gap-x-1">
        <span className='text-base font-semibold text-indigo-500'>Answer:</span>
        <span className='text-base font-medium'>Create a react application</span>
      </div>
      <div>
        <CustomInput
          className={'accent-pink-500 w-full'}
          type={'textarea'}
          name={'edit_ans'}
          id={'edit_ans'}
        />
      </div>
      <div className="flex gap-x-1 mt-2">
        <span className=' text-base font-semibold text-indigo-500'>CTA:</span>
        <span className='text-base font-medium'>Create a react application</span>
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
