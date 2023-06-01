import React, { Fragment } from 'react'
import { queryParams } from '../../recoil/atoms'
import { QueryProps } from '../../../utils/global'
import { useRecoilState } from 'recoil'

const CTASection = () => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)
  return (
    <div className="flex justify-between">
      <div className="text-lg font-semibold text-indigo-500">CTA</div>
      <div>
        <Fragment>
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
        </Fragment>
      </div>
    </div>
  )
}

export default CTASection
