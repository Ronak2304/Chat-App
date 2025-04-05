import React, { useState } from 'react'
import { useAuthStore } from '../store/store'
import { Camera } from 'lucide-react'
import Navbar from '../components/Navbar'

const ProfilePage = () => {
    const {authUser,isUpdatingProfile,updateProfile} = useAuthStore()
    const [selectedImage, SetselectedImage] = useState(null)
    const handleUpload = async(e)=> {
      const file = e.target.files[0]
      if(!file){
        return 
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = async ()=>{
        SetselectedImage(reader.result)
        await updateProfile({newprofilePic:reader.result})
      }
    }
    return (
      <div>
        <Navbar />
        <div>
          Profile
        </div>

        {/* Profile pic div  */}
        <div>
          <img src={selectedImage ||authUser.profilePic || '/avatar.png'} alt='profile pic'/>
          <label className={`cursor-pointer ${isUpdatingProfile?"pointer-events-none":""}`} >
            <Camera />
            <input type="file" hidden onChange={handleUpload} disabled={isUpdatingProfile}/>
          </label>
          <p>
            {isUpdatingProfile?"Uploading...":"Click the camera to upload the image"} 
          </p>
        </div>

        <div>
          <div>
            Fullname
            {authUser.fullName}
          </div>
          <div>
            Email
            {authUser.email}
          </div>
        </div>

        <div>
          {authUser.createdAt}
        </div>
      </div>
    )
}

export default ProfilePage