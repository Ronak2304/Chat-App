import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Settings from './pages/Settings'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/store'

const router  = createBrowserRouter([
    {
      path: '/',
      element: <div>
          <Navbar />
          <Home />
      </div>
    },
    {
      path: '/signup',
      element: <div>
        <Signup />
      </div>
    },
    
    {
      path: '/login',
      element: <div>
        <Login />
      </div>
    },
    {
      path: '/settings',
      element: <div>
        <Navbar />
        <Settings />
      </div>
    },
    {
      path: '/profile',
      element: <div>
        <Navbar />
        <ProfilePage />
      </div>
    },

])

const App = () => {
    const {authUser} = useAuthStore()
    return (
      <div>
        <RouterProvider router={router} />
      </div>
    )
}

export default App