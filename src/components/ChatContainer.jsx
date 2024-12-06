// import React from 'react'
// import { useEffect } from 'react'
// import { useChatStore } from '../store/useChatStore'
// import ChatHeader from './ChatHeader'
// import MessageInput from './MessageInput'
// import MessageSkeleton from "./skeleton/MessageSkeleton"
// import useAuthStore from '../store/useAuthStore'

// const ChatContainer =() => {
// const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore()
// const {authUser} = useAuthStore();


// useEffect(() => {
//   getMessages(selectedUser._id)
// }, [selectedUser._id, getMessages])

// if(isMessagesLoading)
//   return (
//    <div className='flex-1 flex flex-col overflow-auto'>
//     <ChatHeader />
//     <MessageSkeleton />
//     <MessageInput />
//   </div>
//   )


//   return (
//     <div className='flex-1 flex flex-col overflow-auto'>
//       <ChatHeader />

//       <div className='flex-1 overflow-y-auto p-4 space-y-4'>
//       {messages.map((message) => (
//         <div
//         key={message._id}
//         className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
//         <div className='chat-image avatar'>
//         <div className='size-10 rounded-full border'>
//         <img 
//         src={message.senderId === authUser._id 
//           ? authUser.profilePic || "/ava.png" 
//           : selectedUser.profilePic || "/ava.png"} 
//         alt="profile pic" 
//         />
//         </div>
//         </div>
//         <div className='chat-header mb-1'>
//         <time className='text-xs opacity-50 ml-1'>
//         {formatMessageTime(message.createdAt)}
//         </time>
//         </div>
//         <div className='chat-bubble flex flex-col'>
//         {message.image && (
//         <img
//         src={message.image}
//         alt="Attachment"
//         className='sm:max-w-[200px] rounded-md mb-2'
//         />
//         )}
//         {message.text && <p>{message.text}</p>}


//         </div>
//         </div>
//       ))}

//       </div>
//       <MessageInput />

//     </div>
//   )
// }

// export default ChatContainer



import React, { useEffect, useCallback } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from "./skeleton/MessageSkeleton";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,listenToMessages,
    unlistenToMessage

   } = useChatStore();
  const { authUser } = useAuthStore();

  // Memoize the getMessages function
  const stableGetMessages = useCallback(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }

    listenToMessages()

    return () => unlistenToMessage();
  }, [selectedUser?._id, getMessages, listenToMessages, unlistenToMessage]);

  
  // Run the effect only when selectedUser or its _id changes
  useEffect(() => {
    if (selectedUser?._id) {
      stableGetMessages();
    }
  }, [stableGetMessages, selectedUser?._id]);

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>

      
    );
  }

  if (!selectedUser) {
    return <div>Select a user to chat with</div>; // Add a loading or selection state
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  <img
                    src={message.senderId === authUser._id ? authUser.profilePic || "/ava.png" : selectedUser.profilePic || "/ava.png"}
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className='chat-header mb-1'>
                <time className='text-xs opacity-50 ml-1'>{message.createdAt}</time>
              </div>
              <div className='chat-bubble flex flex-col'>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className='sm:max-w-[200px] rounded-md mb-2'
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))
        ) : (
          <p>No messages to display</p>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
