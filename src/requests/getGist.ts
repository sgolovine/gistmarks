import { AxiosInstance } from "axios"

export function getGist(instance: AxiosInstance, gistId: string) {
  return instance.get(`/gists/${gistId}`)
}
