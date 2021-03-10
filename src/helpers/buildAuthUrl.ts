import qs from "query-string"
import { GH_AUTH_BASE_URL } from "~/defines"

export function buildAuthUrl() {
  const query = qs.stringify({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_REDIRECT_URI,
    scope: "gist",
    allow_signup: "true",
  })

  return `${GH_AUTH_BASE_URL}?${query}`
}
