import { v4 as uuidv4 } from "uuid"

export const generateUUID = () => {
  const guid = uuidv4()
  return guid
}
