import React from 'react'
import Search from '../../popup/components/commonComponents/Search'
import ListView from '../../popup/components/sections/ListSection'
import { useNavigate } from 'react-router-dom'
import { withAuth } from '../components/HOC/withAuth'
import MainLayout from '../../popup/layouts/main'

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <MainLayout isOption={true} headerClassName="w-full" className={'items-center w-[700px] mx-auto'}>
      <Search className="w-full" from='option' />
      <ListView className="w-[700px] h-[600px]" from={'option'} />
    </MainLayout>
  )
}

export default withAuth(Home)
