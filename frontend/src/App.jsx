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
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()

    useEffect(() => {
      checkAuth()
    },[checkAuth])

    console.log(onlineUsers)

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
            element: !authUser?<Signup />:<Home/>
          },
          
          {
            path: '/login',
            element: !authUser?<Login/>:<Home/>
          },
          {
            path: '/settings',
            element: <Settings />
          },
          {
            path: '/profile',
            element: authUser ? <ProfilePage />:<Login/>
          },
          
        ])
        
    return (
      <div>
        <RouterProvider router={router} />
      </div>
    )
}


export default App