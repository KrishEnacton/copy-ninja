import CustomInput from '../commonComponents/core/Input'

const RandomSection = () => {
  return (
    <div className="flex justify-between px-2 py-8 text-lg text-black">
      <div>CTA</div>
      <div>
        <CustomInput
          checked={true}
          className={'accent-pink-500 cursor-pointer'}
          type={'checkbox'}
          name={'cta'}
          id={'cta'}
        />
      </div>
    </div>
  )
}

export default RandomSection
