// import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL: "http://localhost:5001/api",
//     withCredentials: true,

    
// })

import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  maxContentLength: 50 * 1024 * 1024, // 50MB
  maxBodyLength: 50 * 1024 * 1024, // 50MB


});


