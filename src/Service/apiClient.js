// import axios from "axios";

// // 1️⃣ Base URL setup
// const apiClient = axios.create({
//   baseURL: "http://192.168.0.224:8099", 
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 10000, 
// });

// // 2️⃣ Request Interceptor
// // apiClient.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (!config.url.includes("/login") && token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// // 3️⃣ Response Interceptor
// apiClient.interceptors.response.use(
//   (response) => {
//     // Return only data (if you need full response, use `response` instead)
//     return response.data;
//   },
//   (error) => {
//     if (!error.response) {
//       console.error("Network/Server error:", error.message);
//     } else {
//       const { status, data } = error.response;

//       if (status === 401) {
//         console.warn("Unauthorized! Redirecting to login...");
//         localStorage.removeItem("token");
//         // 🚨 handle redirect in your routing logic instead of hard redirect
//         window.location.replace("/login");
//       }

//       if (status === 500) {
//         console.error("Server error:", data || error.message);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;


// Service/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.0.224:8099/rkt",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && !config.url.includes("auth/login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error response:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;

