import React from 'react'
import SectionHeader from '../components/sections/SectionComponents/SectionHeader'
import SectionFooter from '../components/sections/SectionComponents/SectionFooter'

const SectionLayout = ({ children, topic = '' }: { children: React.ReactNode; topic: string }) => {
  return (
    <div className="mx-4 py-2 h-full relative">
      <SectionHeader topic={topic} />
      {children}
      <SectionFooter />
    </div>
  )
}

export default SectionLayout
