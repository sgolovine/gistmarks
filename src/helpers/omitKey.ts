export const omitKey = (key: string, data: any) => {
  if (Object.keys(data).length === 0) {
    return {}
  }
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
