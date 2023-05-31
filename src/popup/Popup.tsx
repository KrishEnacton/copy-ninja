import Home from './pages/HomeView'
import Login from '../options/pages/Login'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import MainLayout from './layouts/main'
import SelectView from './pages/SelectView'
import TopicView from './pages/TopicView'

function App({user}: any) {
  console.log({user})

  return (
    <MainLayout user={user}>
      <MemoryRouter initialIndex={0} initialEntries={['/login', '/home', '/select', '/topic']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/select" element={<SelectView />} />
          <Route path="/topic" element={<TopicView />} />
        </Routes>
      </MemoryRouter>
    </MainLayout>
  )
}

export default App
