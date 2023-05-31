import React from 'react'
import Search from '../../popup/components/commonComponents/Search'
import ListView from '../../popup/components/sections/ListSection'
import { useNavigate } from 'react-router-dom'
import { withAuth } from '../components/HOC/withAuth'

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="">
      <Search className="w-full" from='option' />
      <ListView className="w-[700px] h-[600px]" from={'option'} />
    </div>
  )
}

export default withAuth(Home)
