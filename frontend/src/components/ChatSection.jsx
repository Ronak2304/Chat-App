import React, { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/chatStore'
import { Camera} from 'lucide-react'

const ChatSection = () => {

    const {getMessages,selectedUser,isMessagesLoading,sendMessages,messages,isSendingMessage} = useChatStore()
    const [textInput, settextInput] = useState("")
    const [imageInput, setimageInput] = useState(null)
    const messageRef = useRef(null)
    useEffect(() => {
      getMessages(selectedUser._id)
    }, [selectedUser,getMessages])

    useEffect(() => {
            messageRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messages])
    
    async function handlesubmit (e) {
        e.preventDefault()
        if(!textInput.trim() && !imageInput){
            return
        }
        try {
            await sendMessages(selectedUser._id,{
                text: textInput.trim(),
                image: imageInput
            })
            setimageInput(null)
            settextInput("")
        } catch (error) {
            console.log("Failed to send message "+error.message)
        }
    }


    function handleRemoveImage() {
        setimageInput('')

    }
    function handleImageUpload(e) {
        const file = e.target.files[0] // selects the first file selected by user
        if(!file.type.startsWith('image/')){
            console.log("Kindly insert an image")
            return 
        }

        const reader = new FileReader() // initializing an inbuilt api to convert the image to base64 format string
        reader.readAsDataURL(file) // converting the image to base64 format
        reader.onload = () => {   // onload works like if the image conversion is completed then it will start to execute
            setimageInput(reader.result) // this just sets the image for he preview
        }
    }

    console.log(messages)
    return (
        <div>
            {/* Selected user info */}
            <div className='flex gap-5'>
                <img className='w-15' src={selectedUser.profilePic || '/avatar.png'} alt='Profile pic'/>
                <p>
                    {selectedUser.fullName}
                </p>

            </div>
            {/* Messages */}
            <div>
                {
                    messages.map((message)=>(
                        <div 
                            key={message._id} 
                            className={`chat ${message.senderId===selectedUser._id?"chat-start":"chat-end"}`}
                            ref={messageRef}
                        >
                            <div className='chat-bubble'>
                                {
                                    message.imageMessage && <div>
                                        <img src={message.imageMessage} />
                                    </div>
                                }
                                {
                                    message.textMessage && <p>{message.textMessage}</p>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Input */}
            <div>
                <div>
                    {
                        imageInput !== ""? <div>
                            <img src={imageInput} />
                        </div>:<div></div>
                    }
                    {
                        imageInput?
                        <button className='cursor-pointer' onClick={handleRemoveImage}>
                            Remove Image
                        </button>:
                        <div></div>
                    }
                </div>
                <form onSubmit={handlesubmit} className='flex gap-5'>
                    <input type="text" value={textInput} onChange={(e)=>settextInput(e.target.value)} placeholder='Enter text message...' />
                    <label className='cursor-pointer'>
                        <Camera />
                        <input type="file" hidden onChange={handleImageUpload}/>
                    </label>
                    <button type="submit" className='cursor-pointer' disabled={isSendingMessage}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ChatSection