import MainLayout from '../popup/layouts/main'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/CreateTopic'
import OptionsLogin from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
  return (
    <MainLayout isOption={true} headerClassName="w-full" className={'flex flex-col items-center w-[700px] mx-auto'}>
      <HashRouter>
        <Routes>
          <Route index={true} path="/" element={<OptionsLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </HashRouter>
    </MainLayout>
  )
}

export default App
