import CustomButton from '../../commonComponents/core/Button'
import { useNavigate } from 'react-router-dom'
import { QueryProps } from '../../../../utils/global'
import { useRecoilState } from 'recoil'
import { queryParams } from '../../../recoil/atoms'
import { generateRandomSentence } from '../../../../utils'
import copy from 'copy-to-clipboard'
import { useEffect, useLayoutEffect, useState } from 'react'

const SectionFooter = ({ isTopic }: { isTopic?: boolean }) => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)
  const navigate = useNavigate()
  const [isCopied, setIsCopied] = useState(false)

  //@ts-ignore
  const [kkans, setKkans] = useState(generateRandomSentence(query?.answer?.value))
  //@ts-ignore
  const [kkcta, setKkcta] = useState(generateRandomSentence(query?.cta?.value))

  useLayoutEffect(() => {
    //@ts-ignore
    setKkans(generateRandomSentence(query?.answer?.value))
    //@ts-ignore
    setKkcta(generateRandomSentence(query?.cta?.value))
  }, [])

  function generate_random_string() {
    //@ts-ignore
    const ans: any = generateRandomSentence(query?.answer?.value)
    //@ts-ignore
    const cta: any = generateRandomSentence(query?.cta?.value)
    //@ts-ignore
    setKkcta(cta)
    //@ts-ignore
    setKkans(ans)
    copy(ans + '\n\n\n' + cta)
    navigate('/topic', { state: { ans, cta } })
  }
  return (
    <div className={`bottom-4 absolute w-full flex ${isTopic && 'gap-x-2'}`}>
      {!isTopic ? (
        <CustomButton
          className={`px-8 w-full py-3 rounded-lg bg-indigo-600  text-sm font-semibold text-white hover:bg-indigo-700`}
          name={`Generate and Copy`}
          onclick={() => {
            generate_random_string()
          }}
        />
      ) : (
        <CustomButton
          className={`px-8 py-3 rounded-lg w-1/2 bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700`}
          name={isCopied ? 'Copied' : `Copy`}
          onclick={() => {
            copy(kkans + '\n\n\n' + kkcta)
            setIsCopied(true)
            setTimeout(() => {
              setIsCopied(false)
            }, 1000)
          }}
        />
      )}
      {isTopic && (
        <CustomButton
          className={`px-8 ${
            !isTopic ? 'w-full' : 'w-1/2'
          } py-3 rounded-lg border-indigo-500 border-2  text-indigo-500 text-sm font-semibold hover:bg-slate-100`}
          name={'Re-Generate'}
          onclick={() => generate_random_string()}
        />
      )}
    </div>
  )
}

export default SectionFooter
