import axios from "axios"
import { GH_BASE_URL } from "~/defines"

const validateStatus = (status: number) => status >= 200 && status <= 500

export function createInstance(token?: string) {
  if (token) {
    return axios.create({
      baseURL: GH_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus,
    })
  } else {
    return axios.create({
      baseURL: GH_BASE_URL,
      validateStatus,
    })
  }
}

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
  const interceptor = axios.interceptors.request.use((cfg) => {
    cfg.baseURL = GH_BASE_URL
    cfg.headers.set("Authorization", `Bearer ${token}`)
    cfg.validateStatus = validateStatus

    return cfg
  })

  return interceptor
}

export function ejectInterceptor(interceptor: number) {
  axios.interceptors.request.eject(interceptor)
}
