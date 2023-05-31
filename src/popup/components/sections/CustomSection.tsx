import Dropdown from '../commonComponents/core/Dropdown'
import CustomInput from '../commonComponents/core/Input'
import { QueryProps } from '../../../utils/global'
import { queryParams } from '../../recoil/atoms'
import { useRecoilState } from 'recoil'
import { useLayoutEffect, useState } from 'react'

const CustomSection = () => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)

  return (
    <div className="px-2 py-8 text-lg text-black">
      <div className="flex justify-between">
        <div>CTA</div>
        <div>
          <CustomInput
            className={'accent-pink-500 cursor-pointer'}
            type={'checkbox'}
            name={'cta'}
            id={'cta'}
            checked={true}
            setInput={(value: boolean) => setQuery((prevState) => ({ ...prevState, isCta: value }))}
          />
        </div>
      </div>
      <div className="flex flex-col my-2">
        <div>Select Answer:</div>
        <Dropdown
          id={'select_ans'}
          selectOptions={['React Development', 'Backend Development']}
          setOptions={(value: string) => setQuery((prevState) => ({ ...prevState, answer: value }))}
        />
      </div>
      <div className="flex flex-col my-2">
        <div>Select CTA:</div>
        <Dropdown
          id={'select_cta'}
          selectOptions={['cta 1', 'cta 2']}
          setOptions={(value: string) => setQuery((prevState) => ({ ...prevState, cta: value }))}
        />
      </div>
    </div>
  )
}

export default CustomSection
