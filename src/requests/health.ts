import axios from "axios"

export function getHealth() {
  return axios.get("/api/health")
}
