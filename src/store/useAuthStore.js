import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

// export const useAuthStore = create((set) => ({
//     authUser: null,
//     isSigningUp: false,
//     isLoggingIn: false,
//     isUpdatingProfile: false,
//     isCheckingAuth: true,
//     onlineUsers: [],

//     checkAuth: async () => {
//         try {
//             const res = await axiosInstance.get("/auth/check")
//             set({authUser:res.data})  
//         } catch (error) {
//             console.log("Error in checkAuth: ", error)
//             set({authUser:null});
          
//         } finally {
//             set({isCheckingAuth: false})
//         }

//     },

const BASE_URL = "http://localhost:5001"
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
  
    
    checkAuth: async () => {
      set({ isCheckingAuth: true }); 
      try {
        const res = await axiosInstance.get("/auth/check");
        if (res.data) {
          set({ authUser: res.data });
          get().connectSocket()
        } else {
          throw new Error("Unexpected response format in checkAuth.");
        }
      } catch (error) {
        console.error("Error in checkAuth:", error); 
        set({ authUser: null });
        toast.error("Authentication failed. Please log in again.");
      } finally {
        set({ isCheckingAuth: false });
      }
    },

  

    signup: async (data) => {
        set({ isSigningUp: true});
        try{
        const res =  await axiosInstance.post("/auth/signup", data);
        set({authUser: res.data})
        toast.success("Your account created successfully")
        get().connectSocket()

        }catch(error){
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
                console.error("Signup error: ", error); 
            }
        }finally{
            set({isSigningUp: false})
        }
    },


   

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");

            
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    

    // logout: async () => {
    //     try {
    //         await axiosInstance.post("/auth/logout");
    //         set({authUser: null});
    //         toast.success("Logged out successfully")
    //     } catch (error) {
    //         toast.error(error.response.data.message)
            
    //     }
    // },




  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
            set({ authUser: null });
      toast.success("Logged out successfully");
      get().disConnectSocket()

    history.push("/login"); 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
    }
  },



    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({authUser: res.data});
            toast.success( "Your profile updated successfully")
        } catch (error) {
            console.log("error in updating profile: ", error)
            toast.error(error.response.data.message)
            
        }finally{
            set({ isUpdatingProfile: false})
        }
    },

    connectSocket: () => {
      const {authUser} = get()
      if(!authUser || get().socket?.connected) return;
      const socket = io(BASE_URL, {
        query: {
          userId: authUser._id,
        },
      })
      socket.connect()
      
      set({ socket: socket });

      socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds})
      })
    },

    disConnectSocket: () => {
      if(get().socket?.connected) get().socket.disConnect();
    }
}));
export default useAuthStore