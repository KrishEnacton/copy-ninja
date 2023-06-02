import { useRecoilState } from 'recoil'
import { QueryProps } from '../../../utils/global'
import { queryParams } from '../../recoil/atoms'
import CustomInput from '../commonComponents/core/Input'
import { useEffect, useState } from 'react'
import CTASection from './CTASection'

const RandomSection = ({ state }) => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)
  const [selectedAnswer, setSelectedAnswer] = useState(
    state.answer[Math.floor(Math.random() * state.answer.length)],
  )
  const [selectedCTA, setSelectedCTA] = useState(
    state.cta[Math.floor(Math.random() * state.cta.length)],
  )

  useEffect(() => {
    setQuery((prevState) => ({ ...prevState, ...{ answer: selectedAnswer, cta: selectedCTA } }))
  }, [])
  return (
    <div className="px-2 py-8 text-lg text-black">
      <CTASection />
    </div>
  )
}

export default RandomSection
