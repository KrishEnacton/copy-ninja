import React, { useState } from 'react'
import CustomButton from '../../commonComponents/core/Button'
import { useNavigate } from 'react-router-dom'
import { QueryProps } from '../../../../utils/global'
import { useRecoilState } from 'recoil'
import { queryParams } from '../../../recoil/atoms'

const SectionFooter = ({ isTopic }: { isTopic?: boolean }) => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)
  const navigate = useNavigate()

  return (
    <div className={`bottom-4 absolute w-full flex ${isTopic && 'gap-x-2' }`}>
      <CustomButton
        className={`px-8 ${!isTopic ? 'w-full' : 'w-1/2'} py-3 rounded-lg bg-green-600 text-white`}
        name={`${!isTopic ?'Generate and':""} Copy`}
        onclick={() => navigate('/topic', { state: query })}
      />
      {isTopic && (
        <CustomButton
          className={`px-8 ${
            !isTopic ? 'w-full' : 'w-1/2'
          } py-3 rounded-lg bg-green-600 text-white`}
          name={'Re-Generate'}
        />
      )}
    </div>
  )
}

export default SectionFooter
