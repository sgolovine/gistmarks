// Remove an item from array
export function removeItem<T>(arr: T[], targetItem: T) {
  return arr.filter((currItem) => currItem !== targetItem)
}

// Given any input array, will return an array with
// just the unique values
// source: https://stackoverflow.com/a/14438954
export function uniq<T>(arr: T[]) {
  return arr.filter((v, i, a) => a.indexOf(v) === i)
}
