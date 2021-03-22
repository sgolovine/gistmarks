import axios from "axios"
import { GH_BASE_URL } from "~/defines"

function validateStatus(status: number) {
  return status >= 200 && status <= 500
}

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
