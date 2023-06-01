import React from 'react'
import SectionLayout from '../layouts/section-layout'
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

  return (
    <MainLayout>
      <SectionLayout topic={location.state.topic}>
        <KKDropdown
          id="select_ans"
          selected={selectedTopic}
          setSelected={setSelectedTopic}
          listData={[
            { key: 'random', name: 'Random' },
            { key: 'custom', name: 'Custom' },
          ]}
        />
        {selectedTopic.key === 'random' ? (
          <RandomSection />
        ) : selectedTopic.key === 'custom' ? (
          <CustomSection />
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
