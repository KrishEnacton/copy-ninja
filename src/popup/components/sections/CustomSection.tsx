import Dropdown from '../commonComponents/core/Dropdown'
import CustomInput from '../commonComponents/core/Input'
import { QueryProps } from '../../../utils/global'
import { queryParams } from '../../recoil/atoms'
import { useRecoilState } from 'recoil'
import { useLocation } from 'react-router-dom'

const CustomSection = () => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)
  const location = useLocation()

  return (
    <div className="px-2 py-4 text-lg text-black">
      <div className="flex justify-between">
        <div className='text-lg font-semibold text-indigo-500'>CTA</div>
        <div>
          <CustomInput
            className={'accent-indigo-500 cursor-pointer'}
            type={'checkbox'}
            name={'cta'}
            id={'cta'}
            checked={true}
            setInput={(value: boolean) => setQuery((prevState) => ({ ...prevState, isCta: value }))}
          />
        </div>
      </div>
      <div className="flex flex-col my-4">
        <div className='text-base font-medium'>Select Answer:</div>
        <Dropdown
          id={'select_ans'}
          selectOptions={location?.state?.answser.map(ans => ans.label)}
          setOptions={(value: string) => setQuery((prevState) => ({ ...prevState, answer: value }))}
        />
      </div>
      <div className="flex flex-col">
        <div className='text-base font-medium '>Select CTA:</div>
        <Dropdown
          id={'select_cta'}
          selectOptions={location?.state?.cta.map(ans => ans.label)}
          setOptions={(value: string) => setQuery((prevState) => ({ ...prevState, cta: value }))}
        />
      </div>
    </div>
  )
}

export default CustomSection
