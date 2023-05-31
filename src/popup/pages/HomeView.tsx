import React, { Fragment } from 'react'
import Search from '../components/commonComponents/Search'
import ListView from '../components/sections/ListSection'
import { withAuth } from '../../options/components/HOC/withAuth'

const Home: React.FC = () => {
  return (
    <Fragment>
      <Search from={"popup"} />
      <ListView className={'h-[13rem]'} from="popup" />
    </Fragment>
  )
}

export default withAuth(Home)
