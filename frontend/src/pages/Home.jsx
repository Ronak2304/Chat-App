import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useChatStore } from '../store/chatStore'

const Home = () => {
    const {users,getUser} = useChatStore()
    useEffect(() => {
      getUser()
      console.log("In useeffet ")
      console.log(users)
    }, [getUser])
      
    return (
      <div>
        <Navbar />
        {users.map((ele)=>{
          <div>
            {ele.email}
          </div>
        })}
      </div>
    )
}

export default Home