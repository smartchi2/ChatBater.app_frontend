import React, { useState } from 'react'
import {useAuthStore} from '../store/useAuthStore'
import {Camera, User, BookUser, Mail } from "lucide-react"





const ProfilePage = () => {
  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null)

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("file", file); // Attach the file
  //   formData.append("upload_preset", "your_upload_preset"); // Add your upload preset
  //   formData.append("cloud_name", "cloud_name"); // Add your Cloudinary cloud name if required

  //   try {
  //       const response = await fetch(`https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, {
  //           method: "POST",
  //           body: formData,
  //       });

  //       if (response.ok) {
  //           const data = await response.json();
  //           console.log("Uploaded image:", data.secure_url);
  //           setSelectedImg(data.secure_url); // Update your state with the Cloudinary URL
  //           await updateProfile({ profilePic: data.secure_url }); // Update profile with the Cloudinary URL
  //       } else {
  //           console.error("Cloudinary upload failed", response.statusText);
  //       }
  //   } catch (error) {
  //       console.error("Error uploading image:", error);
  //   }



  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image});
    }

  }
  return (
    <div className='h-screen pt-20'>
    <div className='max-w-2xl mx-auto p-4 py-8'>
    <div className='bg-base-300 rounded-xl p-6 space-y-8'>
    <div className='text-center'>
    <h1 className='text-2xl font-semibold'>Profile</h1>
    <p className='mt-2'>Your profile information</p>
    </div>

    <div className='flex flex-col items-center gap-4'>
    <div className='relative'>

    <img 
    src={selectedImg || authUser.profilePic || '/ava.png'} 
    alt="Profile"
    className='size-32 rounded-full object-cover border-4'
    />
    <label
    htmlFor='avatar-upload'
    className={`
      absolute bottom-0 right-0
      bg-base-content hover:scale-105
      p-2 rounded-full cursor-pointer
      transition-all duration-200
      ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
      `}
    >
    <Camera className='w-5 h-5 text-base-200'/>
    <input
     type="file" 
     id="avatar-upload"
     className='hidden'
     accept='image/*'
     onChange={handleImageUpload}
     disabled={isUpdatingProfile}
     />   
    </label>
    </div>

    <p className='text-sm text-blue-400'>
      {isUpdatingProfile ? "Uploading...." : "Click the camera icon to update your profile"}
    </p>
    </div>

    <div className='space-y-6'>
    <div className='space-y-1.5'>
    <div className='text-sm text-blue-400 flex items-center gap-2'>
    <User className="w-4 h-4" />
      Full Name
    </div>
    <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullName}</p>
    </div>

    <div className='space-y-1.5'>
    <div className='text-sm text-blue-400 flex items-center gap-2'>
    <BookUser className="w-4 h-4"/>
    Phone Number
    </div>
     <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.phoneNumber}</p> 
    </div>

    

    <div className='space-y-1.5'>
    <div className='text-sm text-blue-400 flex items-center gap-2'>
    <Mail className="w-4 h-4" />
    Email
    </div>
    <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.email}</p>
    </div>
    </div>

    <div className='mt-6 bg-base-300 rounded-kl p-6'>
    <h2 className='text-lg font-medium mb-4'>Account Information</h2>
    <div className='space-y-3 text-sm'>
    <div className='flex items-center justify-between py-2 border-b border-blue-700'>
    <span>Member Since</span>
    <span>{authUser.createdAt?.split("T")[0]}</span>
    </div>
    <div className='flex items-center justify-between py-2'>
      <span>Account Status</span>
      <span className='text-green-500 border rounded h-10 w-14 text-center pt-2.5 animate-pulse bg-inherit'>Active</span>
    </div>

    </div>


    </div>
    </div>  
    
    </div>  
      
    </div>
  )
}

export default ProfilePage