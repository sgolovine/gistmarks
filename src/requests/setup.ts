import axios from "axios"
import { GH_BASE_URL } from "~/defines"

export function createInstance(token?: string) {
  if (token) {
    return axios.create({
      baseURL: GH_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } else {
    return axios.create({
      baseURL: GH_BASE_URL,
    })
  }
}
