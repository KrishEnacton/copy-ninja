import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'

const SectionHeader: React.FC = () => {

  const navigate = useNavigate()
  return (
    <div className='flex justify-between text-lg py-2'>
      <div className="p-2 bg-stone-600 rounded-md cursor-pointer" onClick={() => navigate("/home")}>
        <ArrowLeftIcon className="h-5 w-5" stroke='white'/>
      </div>
      <div className="flex gap-x-4 mt-1">
        <span>Topic:</span>
        <span>Web Development</span>
      </div>
      <div className="p-2 bg-green-600 rounded-md cursor-pointer" onClick={() => navigate("/home")}>
        <HomeIcon className="h-5 w-5" stroke='white'/>
      </div>
    </div>
  )
}

export default SectionHeader