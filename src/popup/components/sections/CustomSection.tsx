import { QueryProps } from '../../../utils/global'
import { queryParams } from '../../recoil/atoms'
import { useRecoilState } from 'recoil'
import KKDropdown from '../commonComponents/core/KKDropdown'
import { Fragment, useState } from 'react'
import CTASection from './CTASection'

const CustomSection = ({ state }) => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)
  const [selectedAnswer, setSelectedAnswer] = useState(state.answer[0])
  const [selectedCTA, setSelectedCTA] = useState(state.cta[0])

  return (
    <div className="px-2 py-4 text-lg text-black">
      <CTASection />
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
