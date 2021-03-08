import { v4 as uuidv4 } from "uuid"

export const omitKey = (key: string, data: { [key: string]: unknown }) => {
  return Object.keys(data).reduce((acc: object, currentKey: string) => {
    if (currentKey != key) {
      return {
        ...acc,
        [currentKey]: data[currentKey],
      }
    } else {
      return acc
    }
  }, {})
}

export function generateUUID() {
  const guid = uuidv4()
  return guid
}
