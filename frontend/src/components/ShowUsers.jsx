import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useChatStore } from '../store/chatStore'

const ShowUsers = () => {
    const {users,getUser,selectUserChat} = useChatStore()
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
          </div>
        ))}
      </div>
    )
}

export default ShowUsers