import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'

const SectionHeader: React.FC<{ topic: string }> = ({ topic = '' }) => {
  const navigate = useNavigate()
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
