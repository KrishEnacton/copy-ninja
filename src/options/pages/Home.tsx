import React from 'react'
import Search from '../../popup/components/commonComponents/Search'
import ListView from '../../popup/components/sections/ListSection'
import { useNavigate } from 'react-router-dom'
import { withAuth } from '../components/HOC/withAuth'

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="">
      <div className="pl-5">
        <button
          type="button"
          onClick={() => navigate('/create')}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          New Topic
        </button>
      </div>
      <Search className="w-full" from='option' />
      <ListView className="w-[700px] h-[600px]" from={'option'} />
    </div>
  )
}

export default withAuth(Home)
