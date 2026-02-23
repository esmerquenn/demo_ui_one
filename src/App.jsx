import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import BottomNav from './components/BottomNav'
import Sidebar from './components/Sidebar'
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
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="lg:ml-64">
          <div className="min-h-screen lg:p-6">
            <div className="max-w-4xl mx-auto">
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
            </div>
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App
