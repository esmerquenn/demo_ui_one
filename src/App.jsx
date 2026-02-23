import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import FriendsPage from './pages/FriendsPage'
import TasksPage from './pages/TasksPage'
import MorePage from './pages/MorePage'
import QRPage from './pages/QRPage'
import ChecksHistoryPage from './pages/ChecksHistoryPage'
import CheckDetailPage from './pages/CheckDetailPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/more" element={<MorePage />} />
            <Route path="/qr" element={<QRPage />} />
            <Route path="/checks" element={<ChecksHistoryPage />} />
            <Route path="/checks/:id" element={<CheckDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AnimatePresence>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App
