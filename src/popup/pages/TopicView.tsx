import React from 'react'
import TopicSection from '../components/sections/TopicSection'
import { useLocation } from 'react-router-dom'
import SectionHeader from '../components/sections/SectionComponents/SectionHeader'
import SectionFooter from '../components/sections/SectionComponents/SectionFooter'
import { withAuth } from '../../options/components/HOC/withAuth'
import MainLayout from '../layouts/main'

const TopicView: React.FC = () => {

  return (
    <MainLayout>
      <div className="mx-4 py-2 h-full relative">
        <SectionHeader />
        <TopicSection />
        <SectionFooter isTopic={true} />
      </div>
    </MainLayout>
  )
}

export default withAuth(TopicView)
