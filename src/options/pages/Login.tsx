import { FormEvent, useEffect, useLayoutEffect, useState } from 'react'
import useSupabase from '../../supabase/use-supabase'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms'
import Form from '../components/Form'
import MainLayout from '../../popup/layouts/main'

const OptionsLogin = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useRecoilState(userState)
  const { login, getAllFolders } = useSupabase()
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()
      setLoading(true)
      const form = e.target as any
      const formFields = form.elements
      const email = formFields.email.value
      const password = formFields.password.value
      const { data, error } = await login({
        email,
        password,
      })
      if (data?.user?.id) {
        setUser(data.user)
        getAllFolders()
        setLoading(false)
        navigate('/home')
      }
    } catch (e) {
      console.log({ e })
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user?.user?.id) {
      navigate('/home')
    }
  }, [])

  return (
    <MainLayout
      isOption={true}
      headerClassName="w-full"
      className={'items-center w-[700px] mx-auto'}
    >
      <div className="mt-12 border border-gray-300 mx-auto w-full h-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <Form onSubmit={onSubmit} loading={loading} />
        </div>
      </div>
    </MainLayout>
  )
}

export default OptionsLogin
