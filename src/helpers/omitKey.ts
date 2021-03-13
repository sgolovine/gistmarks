export const omitKey = (key: string, data: { [key: string]: unknown }) => {
  if (Object.keys(data).length === 0) {
    return {}
  }
  return Object.keys(data).reduce(
    (acc: { [key: string]: unknown }, currentKey: string) => {
      if (currentKey != key) {
        return {
          ...acc,
          [currentKey]: data[currentKey],
        }
      } else {
        return acc
      }
    },
    {}
  )
}
