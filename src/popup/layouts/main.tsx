import React from 'react'
import Header from '../components/commonComponents/Header'

const MainLayout = ({
  children,
  className,
  headerClassName,user
}: {
  children: React.ReactNode
  className?: string
  headerClassName?: string
  isOption?: boolean, user?: any
}) => {
  return (
    <div className={`h-full ${className}`}>
      <Header user={user} className={headerClassName} />
      {children}
    </div>
  )
}

export default MainLayout
