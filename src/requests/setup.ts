import axios from "axios"
import { GH_BASE_URL } from "~/defines"

// Acceptable error range
// Axios will not throw an error for errors greater than
// or equal to 200 and less than 500
const statusRange: [number, number] = [200, 500]

// function validateStatus(status: number) {
//   return status >= 200 && status <= 500
// }

// export function createInstance(token?: string) {
//   if (token) {
//     return axios.create({
//       baseURL: GH_BASE_URL,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       validateStatus,
//     })
//   } else {
//     return axios.create({
//       baseURL: GH_BASE_URL,
//       validateStatus,
//     })
//   }
// }

export function injectInterceptor(isPat: boolean, token: string) {
  const interceptor = axios.interceptors.request.use((config) => {
    return {
      ...config,
      baseURL: GH_BASE_URL,
      headers: {
        Authorization: isPat ? token : `Bearer ${token}`,
      },
      validateStatus: (status: number) =>
        status >= statusRange[0] && status <= statusRange[1],
    }
  })

  return interceptor
}

export function ejectInterceptor(interceptor: number) {
  axios.interceptors.request.eject(interceptor)
}
