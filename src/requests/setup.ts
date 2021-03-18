import axios from "axios"
import { GH_BASE_URL } from "~/defines"

export function createInstance(token: string) {
  const defaultInstance = axios.create({
    baseURL: GH_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return defaultInstance
}
