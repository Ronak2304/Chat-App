import React from 'react'
import { useAuthStore } from '../store/store'

const Navbar = () => {
  const {logout,authUser} = useAuthStore()
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
        {authUser?<div>
          Profile
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