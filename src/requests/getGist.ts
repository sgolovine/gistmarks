import axios from "axios"

export function getGist(gistId: string) {
  return axios.get(`/gists/${gistId}`)
}
