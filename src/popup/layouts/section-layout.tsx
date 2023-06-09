import React from 'react'
import SectionHeader from '../components/sections/SectionComponents/SectionHeader'
import SectionFooter from '../components/sections/SectionComponents/SectionFooter'

const SectionLayout = ({ children}: { children: React.ReactNode; }) => {
  return (
    <div className="mx-4 py-2 h-full relative">
      <SectionHeader />
      {children}
      <SectionFooter />
    </div>
  )
}

export default SectionLayout
