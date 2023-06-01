import { useRecoilState } from 'recoil'
import { QueryProps } from '../../../utils/global'
import { queryParams } from '../../recoil/atoms'
import CustomInput from '../commonComponents/core/Input'
import { Fragment } from 'react'
import CTASection from './CTASection'

const RandomSection = () => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)
  return (
    <div className="px-2 py-4 text-lg text-black">
      <CTASection />
    </div>
  )
}

export default RandomSection
