import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/CreateTopic'
import OptionsLogin from './pages/Login'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index={true} path="/" element={<OptionsLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </HashRouter>
  )
}

export default App
