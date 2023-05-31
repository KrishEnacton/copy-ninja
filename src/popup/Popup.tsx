import Home from './pages/HomeView'
import Login from './components/Login'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import SelectView from './pages/SelectView'
import TopicView from './pages/TopicView'

function App() {
  return (
    <MemoryRouter initialIndex={0} initialEntries={['/login', '/home', '/select', '/topic']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/select" element={<SelectView />} />
        <Route path="/topic" element={<TopicView />} />
      </Routes>
    </MemoryRouter>
  )
}

export default App
