import React from 'react'
import Search from '../components/commonComponents/Search'
import ListView from '../components/sections/ListSection'
import { withAuth } from '../../options/components/HOC/withAuth'
import MainLayout from '../layouts/main'

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Search from={"popup"} />
      <ListView className={'h-[13rem]'} from="popup" />
    </MainLayout>
  )
}

export default withAuth(Home)
