import Dropdown from '../commonComponents/core/Dropdown'
import CustomInput from '../commonComponents/core/Input'
import { QueryProps } from '../../../utils/global'
import {
  queryParams,
  searchInputState,
  selectedAnswerState,
  selectedCTAState,
  selectedType,
} from '../../recoil/atoms'
import { useRecoilState } from 'recoil'
import { useLocation } from 'react-router-dom'
import KKDropdown from '../commonComponents/core/KKDropdown'
import { useEffect, useState } from 'react'

const CustomSection = () => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)
  const location = useLocation()
  const [selectedAnswer, setSelectedAnswer] = useRecoilState(selectedAnswerState)
  const [selectedCTA, setSelectedCTA] = useRecoilState(selectedCTAState)
  const [label, setLabel] = useState(null)

  useEffect(() => {
    setQuery({ ...query, answer: selectedAnswer, cta: selectedCTA })
  }, [selectedAnswer, selectedCTA])

  console.log({location})

  return (
    <div className="px-2 py-4 text-lg text-black">
      <div className="flex justify-between">
        <div className="text-lg font-semibold text-indigo-500">CTA</div>
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
        <div className="text-base font-medium">Select Answer:</div>
        <KKDropdown
          id="select_ans"
          selected={selectedAnswer}
          setSelected={setSelectedAnswer}
          listData={location.state.answer}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-base font-medium ">Select CTA:</div>
        <KKDropdown
          id="select_ans"
          selected={selectedCTA}
          setSelected={setSelectedCTA}
          listData={location.state.cta}
        />
      </div>
    </div>
  )
}

export default CustomSection
