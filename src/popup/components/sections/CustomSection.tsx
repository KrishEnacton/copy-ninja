import { QueryProps } from '../../../utils/global'
import { queryParams } from '../../recoil/atoms'
import { useRecoilState } from 'recoil'
import KKDropdown from '../commonComponents/core/KKDropdown'
import { useState } from 'react'

const CustomSection = ({ state }) => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)
  const [selectedAnswer, setSelectedAnswer] = useState(state.answer[0])
  const [selectedCTA, setSelectedCTA] = useState(state.cta[0])

  return (
    <div className="px-2 py-4 text-lg text-black">
      <div className="flex justify-between">
        <div className="text-lg font-semibold text-indigo-500">CTA</div>
        <div>
          <input
            className={'accent-indigo-500 cursor-pointer'}
            type={'checkbox'}
            id={'cta'}
            name={'cta'}
            checked={query.isCta}
            onChange={(e) => {
              setQuery((prevState) => ({ ...prevState, isCta: e.target.checked as any }))
            }}
          />
        </div>
      </div>
      <div className="flex flex-col my-4">
        <div className="text-base font-medium">Select Answer:</div>
        <KKDropdown
          id={'select-answer'}
          setSelected={setSelectedAnswer}
          selected={selectedAnswer}
          listData={state?.answer || []}
          labelKey={'label'}
        />
      </div>
      {query.isCta && (
        <div className="flex flex-col">
          <div className="text-base font-medium ">Select CTA:</div>
          <KKDropdown
            id={'select-cta'}
            setSelected={setSelectedCTA}
            selected={selectedCTA}
            listData={state?.cta || []}
            labelKey={'label'}
          />
        </div>
      )}
    </div>
  )
}

export default CustomSection
