import CustomButton from '../../commonComponents/core/Button'
import { useNavigate } from 'react-router-dom'
import { QueryProps } from '../../../../utils/global'
import { useRecoilState } from 'recoil'
import { generatedAnswerState, generatedCTAState, queryParams } from '../../../recoil/atoms'
import { generateRandomSentence } from '../../../../utils'
import copy from 'copy-to-clipboard'

const SectionFooter = ({ isTopic }: { isTopic?: boolean }) => {
  const [query, setQuery] = useRecoilState<QueryProps>(queryParams)
  const [generatedAns, setGeneratedAns] = useRecoilState(generatedAnswerState)
  const [generatedCTA, setGeneratedCTA] = useRecoilState(generatedCTAState)
  const navigate = useNavigate()

  console.log({ query })

  function generate_random_string() {
    console.log({ query }, 'random')
    //@ts-ignore
    const ans: any = generateRandomSentence(query?.answer?.value)
    //@ts-ignore
    const cta: any = generateRandomSentence(query?.cta?.value)
    console.log({ ans, cta })
    setGeneratedAns(ans)
    setGeneratedCTA(cta)
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
          name={`Copy`}
          onclick={() => {
            copy(generatedAns)
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
