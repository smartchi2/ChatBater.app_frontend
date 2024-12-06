// import React, { useState, useRef } from 'react'
// import { useChatStore } from '../store/useChatStore';
// import {Image, Send, X} from "lucide-react"

// const MessageInput = () => {

//   const [text, setText] = useState();
//   const [imagePreview, setImagePreview] = useState(null);
//   const {sendMessage} = useChatStore();
//   const fileInputRef = useRef(null)


//   const handleImageChange = (e) => {
//     const file = e.target.file[0]
//     if(!file.type.startWith("image/"))
//       toast.error("Please select an image")
//     return;
//   };

//   const reader = new FileReader();
//   reader.onloadend = () => {
//     setImagePreview(reader.result);
//     reader.readAsDataURL(file)

//   }

//   const removeImage = () => {
//     setImagePreview(null)
//     if(fileInputRef.current) fileInputRef.current.value = "";
//   }

//   const handleSendMessage = async(e) => {
//     e.preventDefault();
//     if (!text.trim() && !imagePreview) return;
//     try{
//       await sendMessage({
//         text: text.trim(),
//         image: imagePreview,
//       });

//       setText(" ")
//       setImagePreview(null);
//       if(fileInputRef.current) fileInputRef.current.value ="";
//     }catch (error){
//       console.error("failed to send message:", error)
//     }

//   }

//   return (
//     <div className='p-4 w-full'>
//     {imagePreview && (
//     <div className='mb-3 flex items-center gap-2'>
//     <div className='relative'>
//     <img 
//     src={imagePreview} 
//     alt="Preview"
//     className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
//     />
//     <button
//     onClick={removeImage}
//     className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
//     flex items-center justify-center'
//     type='button'
//     >

//     < X className="size-3 "/>
//     </button>
//     </div>
//     </div>
//     )}

//     <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
//     <div className='flex-1 flex gap-2'>
//     <input
//     type="text"
//     className='w-full input input-border rounded-lg input-sm sm:input-md'
//     placeholder="Type a message..."
//     value={text}
//     onChange={(e) => setText(e.target.value)}
//     />
//     <input 
//     type="file"
//     accept="image/*"
//     className='hidden'
//     ref={fileInputRef}
//     onChange={handleImageChange}
//     />

//     <button
//     type="button"
//     className={`hidden sm:flex btn btn-circle 
//       ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
//      onClick={() => fileInputRef.current?.click()}
//      >
//      <Image size={20}/>
//      </button>
//      </div>

//       <button
//       type="submit"
//       className='btn btn-sm btn-circle'
//       disabled={!text.trim() && !imagePreview}
//       >
//       <Send size={22} />
//       </button>
//      </form>
      
//     </div>
//   )
// }

// export default MessageInput

import React, { useState, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";


const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { sendMessage } = useChatStore();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // const handleSendMessage = async (e) => {
  //   e.preventDefault();
  //   if (!text.trim() && !imagePreview) return;

  //   try {
  //     await sendMessage({
  //       text: text.trim(),
  //       image: imagePreview,
  //     });

  //     setText("");
  //     setImagePreview(null);
  //     if (fileInputRef.current) fileInputRef.current.value = "";
  //   } catch (error) {
  //     console.error("Failed to send message:", error);
  //     toast.error("Failed to send message. Please try again.");
  //   }
  // };
  const handleSendMessage = async (e) => {
    e.preventDefault();
  
    const payload = {
      text: text.trim(),
      image: imagePreview,
    };
  
    console.log('Payload size:', new Blob([JSON.stringify(payload)]).size, 'bytes');
  
    if (!text.trim() && !imagePreview) return;
  
    try {
      await sendMessage(payload);
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  


// const handleImageChange = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   if (!file.type.startsWith('image/')) {
//     toast.error('Please select an image');
//     return;
//   }

//   try {
//     const options = {
//       maxSizeMB: 1, // Compress to under 1MB
//       maxWidthOrHeight: 1920, // Resize to max 1920px
//       useWebWorker: true,
//     };
//     const compressedFile = await imageCompression(file, options);
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(compressedFile);
//   } catch (error) {
//     toast.error('Failed to process image');
//     console.error(error);
//   }
// };


  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-border rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle 
              ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
