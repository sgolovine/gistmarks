import { createInstance } from "./setup"

interface Args {
  token?: string
  gistId: string
}

export function getGist({ token, gistId }: Args) {
  const instance = createInstance(token)
  return instance.get(`/gists/${gistId}`)
}
