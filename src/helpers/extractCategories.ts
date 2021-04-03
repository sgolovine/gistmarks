import { BookmarkCollection } from "~/model/Bookmark"
import { uniq } from "./arrayUtil"

export const extractCategories = (bookmarks: BookmarkCollection): string[] => {
  const bookmarkKeys = Object.keys(bookmarks)
  const categories = bookmarkKeys.reduce((acc: string[], key: string) => {
    const { category } = bookmarks[key]
    // Check to make sure the category is not
    // an empty string
    if (category) {
      return [...acc, category]
    } else {
      return acc
    }
  }, [])
  return uniq(categories)
}
