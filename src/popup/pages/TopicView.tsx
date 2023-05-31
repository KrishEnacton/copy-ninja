import React, { Fragment } from 'react'
import TopicSection from '../components/sections/TopicSection'
import { useLocation } from 'react-router-dom'
import SectionHeader from '../components/sections/SectionComponents/SectionHeader'
import SectionFooter from '../components/sections/SectionComponents/SectionFooter'
import { withAuth } from '../../options/components/HOC/withAuth'

const TopicView: React.FC = () => {
  const { state } = useLocation()

  return (
    <Fragment>
      <div className="mx-4 py-2 h-full relative">
        <SectionHeader />
        <TopicSection />
        <SectionFooter isTopic={true} />
      </div>
    </Fragment>
  )
}

export default withAuth(TopicView)
