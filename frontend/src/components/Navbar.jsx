import React from 'react'
import { useAuthStore } from '../store/store'
import { Link, Navigate, UNSAFE_NavigationContext } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';

const Navbar = () => {
  const {logout,authUser} = useAuthStore()
  function handleLogout() {
    logout();
  }
  return (
    <div className='place-content-between flex'>
      <div>
        <Link to='/'> 
          Logo
        </Link>
      </div>
      <div className='flex gap-4 '>
        <div>
          settings
        </div>
        {authUser?<div>
          <Link to="/profile">Profile</Link>
        </div>:<div></div>}
        {authUser?<div>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>:<div></div>}
      </div>
    </div>
  )
}

export default Navbar