import axios from "axios"
import { GH_BASE_URL } from "~/defines"

// Acceptable error range
// Axios will not throw an error for errors greater than
// or equal to 200 and less than 500
const statusRange: [number, number] = [200, 500]

const validateStatus = (status: number) =>
  status >= statusRange[0] && status <= statusRange[1]

export function injectBaseInterceptor() {
  const interceptor = axios.interceptors.request.use((config) => {
    return {
      ...config,
      baseURL: GH_BASE_URL,
      validateStatus,
    }
  })
  return interceptor
}

export function injectAuthInterceptor(token: string) {
  const interceptor = axios.interceptors.request.use((config) => {
    return {
      ...config,
      baseURL: GH_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus,
    }
  })

  return interceptor
}

export function ejectInterceptor(interceptor: number) {
  axios.interceptors.request.eject(interceptor)
}
