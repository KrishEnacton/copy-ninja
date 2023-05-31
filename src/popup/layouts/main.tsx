import React from 'react'
import Header from '../components/commonComponents/Header'

const MainLayout = ({
  children,
  className,
  headerClassName
}: {
  children: React.ReactNode
  className?: string
  headerClassName?: string
  isOption?: boolean
}) => {
  return (
    <div className={`h-full ${className}`}>
      <Header className={headerClassName} />
      {children}
    </div>
  )
}

export default MainLayout
