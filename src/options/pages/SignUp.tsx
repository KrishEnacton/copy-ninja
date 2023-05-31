import { FormEvent, Fragment, useContext, useState } from 'react'
import useSupabase from '../../supabase/use-supabase'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms'
import Form from '../components/Form'

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useRecoilState(userState)
  const { signUp } = useSupabase()
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()
      setLoading(true)
      const form = e.target as any
      const formFields = form.elements
      const email = formFields.email.value
      const password = formFields.password.value
      const data: any = await signUp({
        email,
        password,
      })

      if(data && data?.id !== "") {
        setUser(data)
        setLoading(false)
        navigate('/home')
      }
    } catch (e) {
      console.log({ e })
    }
  }

  return (
    <Fragment>
      <div className="w-full h-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create your account
          </h1>
          <Form onSubmit={onSubmit} isCreate={true} loading={loading}/>
        </div>
      </div>
    </Fragment>
  )
}

export default SignUp
