// Remove an item from array
export const removeItem = (arr: string[], targetItem: string) => {
  return arr.filter((currItem) => currItem !== targetItem)
}

// Given any input array, will return an array with
// just the unique values
// source: https://stackoverflow.com/a/14438954
export function uniq(arr: any[]) {
  return arr.filter((v, i, a) => a.indexOf(v) === i)
}
