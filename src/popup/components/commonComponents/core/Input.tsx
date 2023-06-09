import { ChangeEvent, Fragment, useEffect, useLayoutEffect, useState } from 'react'

const CustomInput = ({
  className,
  type,
  name,
  placeholder,
  setInput,
  checked,
  value
}: any) => {
  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { value } = e.target
    setInput({ [name]: value })
  }
  const [check, setCheck] = useState<boolean>(false)

  useLayoutEffect(() => {
    setCheck(checked)
  }, [])

  useEffect(() => {}, [check])

  return (
    <Fragment>
      {type === 'textarea' ? (
        <textarea
        value={value}
          className={`p-2 rounded-md text-black ${className}`}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInput(e)}
        />
      ) : type === 'checkbox' ? (
        <input
          className={className}
          type={type}
          id={name}
          name={name}
          checked={check}
          onChange={() => setCheck(!check)}
        />
      ) : (
        <input
          className={className}
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e)}
        />
      )}
    </Fragment>
  )
}
export default CustomInput
