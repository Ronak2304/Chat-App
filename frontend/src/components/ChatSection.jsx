import React, { useEffect } from 'react'
import { useChatStore } from '../store/chatStore'

const ChatSection = () => {

    const {getMessages,selectUserChat,isMessagesLoading,messages} = useChatStore()
    useEffect(() => {
      getMessages(selectUserChat._id)
    }, [selectUserChat,getMessages])
    
    return (
        <div>
            {/* Selected user info */}
            <div>
                userinfo component
            </div>
            {/* Messages */}
            <div>
                messages
            </div>

            {/* Input */}
            <div>
                input component
            </div>
        </div>
    )
}

export default ChatSection