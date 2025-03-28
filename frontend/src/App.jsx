import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Settings from './pages/Settings'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/store'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()

    useEffect(() => {
      checkAuth()
    }, [checkAuth])

    console.log({authUser})

    if(isCheckingAuth && !authUser){
     return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='animate-spin size-10'/>
      </div>
     )
    }
    
    const router  = createBrowserRouter([
          {
            path: '/',
            element: authUser ? <Home />:<Login />
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
        
    return (
      <div>
        <RouterProvider router={router} />
      </div>
    )
}


export default App