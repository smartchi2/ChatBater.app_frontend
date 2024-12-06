// import { create } from "zustand";
// import toast from "react-hot-toast";
// import {axiosInstance} from "../lib/axios.js";


// export const useChatStore = create((set) => ({
//     messages: [],
//     users: [],
//     selectedUser: null,
//     isUsersLoading: false,
//     isMessagesLoading: false,

//     getUsers: async () => {
//         set({isUsersLoading: true});
//         try {
//             const res = await axiosInstance.get("/messages/users");
//             set({ users: res.data});    
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }finally {
//             set({ isUsersLoading: false})
//         }
//     },

//     getMessages: async (userId) => {
//      set({ isMessagesLoading: true });
//      try {
//         const res = await axiosInstance.get(`/messages/${userId}`);
//         set({ messages: res.data})
//      } catch (error) {
//         toast.error(error.response.data.message)
        
//      }finally{
//     set({isMesagesLoading: false})
//      }
//     },

//     setSelectedUser: (selectedUser) => set({selectedUser}),

// }));

// // import { create } from "zustand";
// // import toast from "react-hot-toast";
// // import { axiosInstance } from "../lib/axios.js";

// // export const useChatStore = create((set) => ({
// //     messages: [],
// //     users: [],
// //     selectedUser: null,
// //     isUsersLoading: false,
// //     isMessagesLoading: false,

// //     // Fetch Users
// //     getUsers: async () => {
// //         set({ isUsersLoading: true });
// //         try {
// //             const res = await axiosInstance.get("/messages/users");
// //             if (Array.isArray(res.data)) {
// //                 set({ users: res.data });
// //             } else {
// //                 throw new Error("Unexpected response format for users.");
// //             }
// //         } catch (error) {
// //             const errorMessage = error.response?.data?.message || "Failed to fetch users.";
// //             toast.error(errorMessage);
// //         } finally {
// //             set({ isUsersLoading: false });
// //         }
// //     },

// //     // Fetch Messages for Selected User
// //     getMessages: async (userId) => {
// //         set({ isMessagesLoading: true });
// //         try {
// //             const res = await axiosInstance.get(`/messages/${userId}`);
// //             if (Array.isArray(res.data)) {
// //                 set({ messages: res.data });
// //             } else {
// //                 throw new Error("Unexpected response format for messages.");
// //             }
// //         } catch (error) {
// //             const errorMessage = error.response?.data?.message || "Failed to fetch messages.";
// //             toast.error(errorMessage);
// //         } finally {
// //             set({ isMessagesLoading: false });
// //         }
// //     },

// //     // Set Selected User
// //     setSelectedUser: (selectedUser) => set({ selectedUser }),
// // }));


import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import {useAuthStore} from "./useAuthStore.js"

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
        // const res = await axiosInstance.get("/messages/user");
        // console.log("Response data:", res.data); // Debug response
        const res = await axiosInstance.get("/messages/user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });


      // Check if the response is an array of users
      if (Array.isArray(res.data)) {
        set({ users: res.data });
        console.log(users)
      } else {
        throw new Error("Unexpected response format for users.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch users.";
      toast.error(errorMessage);
    } finally {
      set({ isUsersLoading: false });
    }
  },



  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      if (!userId) {
        console.error('User ID is missing or undefined');
        return;
      }
      

      if (Array.isArray(res.data)) {
        set({ messages: res.data });
      } else {
        throw new Error("Unexpected response format for messages.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch messages.";
      toast.error(errorMessage);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
  const {selectedUser, messages} =  get()
  try{
    const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
    set({messages:[...messages,res.data]})
  }catch (error){
    toast.error(error.response.data.message)
  }

  },
  listenToMessages: () => {
  const  { selectedUser } = get()
  if(!selectedUser) return;

  const socket = useAuthStore.getState().socket;

   socket.on("newMessage", (newMessage) => {
    set({
      message: [...get().messages, newMessage],})
   } )
  },

  unlistenToMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage")
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
