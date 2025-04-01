import React from 'react'
import { useAuthStore } from '../store/store'

const Navbar = () => {
  const {logout} = useAuthStore()
  function handleLogout() {
    logout();
  }
  return (
    <div className='place-content-between flex'>
      <div>
        Logo
      </div>
      <div className='flex gap-4 '>
        <div>
          settings
        </div>
        <div>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar