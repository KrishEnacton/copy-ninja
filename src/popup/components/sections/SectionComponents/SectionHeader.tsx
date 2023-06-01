import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/20/solid'
import { useLocation, useNavigate } from 'react-router-dom'
import { topicAtom } from '../../../recoil/atoms'
import { useRecoilState } from 'recoil'

const SectionHeader: React.FC = () => {
  const navigate = useNavigate()
  const [topic, setTopic] = useRecoilState(topicAtom)
  return (
    <div className="flex justify-between text-lg items-center">
      <div className="py-2 rounded-md cursor-pointer" onClick={() => navigate('/home')}>
        <ArrowLeftIcon className="h-7 w-7" stroke="" />
      </div>
      <div className="flex gap-x-1 text-indigo-500 font-semibold">
        <span>Topic:</span>
        <span>{topic}</span>
      </div>
      <div className="py-2  rounded-md cursor-pointer" onClick={() => navigate('/home')}>
        <HomeIcon className="h-7 w-7" fill="" />
      </div>
    </div>
  )
}

export default SectionHeader
