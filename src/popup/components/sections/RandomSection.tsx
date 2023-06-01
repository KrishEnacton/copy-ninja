import { useRecoilState } from 'recoil'
import { QueryProps } from '../../../utils/global'
import { queryParams } from '../../recoil/atoms'
import CustomInput from '../commonComponents/core/Input'
import { useEffect, useState } from 'react'

const RandomSection = ({state}) => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)
  const [selectedAnswer, setSelectedAnswer] = useState(state.answer[0])
  const [selectedCTA, setSelectedCTA] = useState(state.cta[0])

  useEffect(() => {
    setQuery({ answer: selectedAnswer, cta: selectedCTA })
  }, [])
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
          setInput={(value: boolean) => setQuery((prevState) => ({ ...prevState, isCta: value }))}
        />
      </div>
    </div>
  )
}

export default RandomSection
