import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const withAuth = (Component: any) => {
  function UpdatedComponent() {
    const navigate = useNavigate()

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      console.log({user}, 'hoc')
      if (!user?.user?.id) {
        navigate('/')
      }
    }, [])

    return <Component />
  }
  return UpdatedComponent
}
