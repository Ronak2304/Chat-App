import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useChatStore } from '../store/chatStore'
import { useAuthStore } from '../store/store'

const ShowUsers = () => {
    const {users,getUser,selectUserChat} = useChatStore()
    const {onlineUsers} = useAuthStore()
    const [selctedChat, setselctedChat] = useState("")
    useEffect(() => {
      getUser()
    }, [getUser])
    
    const handleSelection = (user) =>{
      selectUserChat(user)
      console.log(user)
    }

    return (
      <div>
        {users.map((ele)=>(
          <div key={ele._id} onClick={()=>handleSelection(ele)}>
            {ele.fullName}
            {/* {console.log(ele)} */}
            <div>
              {
                onlineUsers.includes(ele._id)?<p className='text-green-200'>Online</p>:<p>Offline</p>
              }
            </div>
          </div>
        ))}
      </div>
    )
}

export default ShowUsers