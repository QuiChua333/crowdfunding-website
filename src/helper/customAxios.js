// import axios from "axios";

// const instance = axios.create({
//   baseURL: process.env.REACT_APP_URL_BACKEND
// })



// Checktoken
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken') || false

//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// )

// instance.interceptors.response.use(
//   (response) => {
    
//     return response.data;
//   },
//   async (error) => {
//     const originalConfig = error.config;
//     if (error.response?.status === 401) {
//       try {
//         const resust = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/refreshToken`, {
//           refreshToken: localStorage.getItem('refreshToken')
//         })
//         const { accessToken, refreshToken } = resust.data.data;

//         localStorage.setItem('accessToken', accessToken);
//         localStorage.setItem('refreshToken', refreshToken);
//         originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
//         return instance(originalConfig)
//       } catch (err) {
//         if (err.response?.status === 401) {
//           localStorage.removeItem('accessToken')
//           localStorage.removeItem('refreshToken')
//           window.location.href = './login'
//         }
//         return Promise.reject(error)
//       }
//     }
//     else return Promise.reject(error)
//   }
// )
export default instance;