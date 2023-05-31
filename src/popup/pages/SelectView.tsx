import React, { Fragment, useEffect, useState } from 'react'
import SectionLayout from '../layouts/section-layout'
import Dropdown from '../components/commonComponents/core/Dropdown'
import { config } from '../../utils/config'
import RandomSection from '../components/sections/RandomSection'
import CustomSection from '../components/sections/CustomSection'
import { selectedType } from '../recoil/atoms'
import { useRecoilState } from 'recoil'
import { withAuth } from '../../options/components/HOC/withAuth'

const SelectView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useRecoilState(selectedType)

  useEffect(() => {
    console.log({ selectedTopic })
  }, [selectedTopic])
  return (
    <Fragment>
      <SectionLayout>
        <Dropdown id={'topicType'} selectOptions={config.topicTypeOptions} />
        {selectedTopic === 'random' ? (
          <RandomSection />
        ) : selectedTopic === 'custom' ? (
          <CustomSection />
        ) : (
          <div className='text-xl text-black font-semibold text-center justify-center my-10'>You haven't selected yet.</div>
        )}
      </SectionLayout>
    </Fragment>
  )
}

export default withAuth(SelectView)
