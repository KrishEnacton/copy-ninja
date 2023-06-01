import React from 'react'
import SectionLayout from '../layouts/section-layout'
import { config } from '../../utils/config'
import RandomSection from '../components/sections/RandomSection'
import CustomSection from '../components/sections/CustomSection'
import { selectedType } from '../recoil/atoms'
import { useRecoilState } from 'recoil'
import { withAuth } from '../../options/components/HOC/withAuth'
import MainLayout from '../layouts/main'
import { useLocation } from 'react-router-dom'
import KKDropdown from '../components/commonComponents/core/KKDropdown'

const SelectView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useRecoilState(selectedType)
  const location = useLocation()

  console.log({location})

  return (
    <MainLayout>
      <SectionLayout topic={location.state.topic}>
        <KKDropdown
          id={''}
          setSelected={setSelectedTopic}
          selected={selectedTopic}
          listData={config._topicTypeOptions}
        />
        {selectedTopic.name === 'random' ? (
          <RandomSection state={location.state}/>
        ) : selectedTopic.name === 'custom' ? (
          <CustomSection state={location.state} />
        ) : (
          <div className="text-xl text-black font-semibold text-center justify-center my-10">
            You haven't selected yet.
          </div>
        )}
      </SectionLayout>
    </MainLayout>
  )
}

export default withAuth(SelectView)