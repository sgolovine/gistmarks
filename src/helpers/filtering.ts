import escapeRegExp from "lodash.escaperegexp"
import { BookmarkCollection } from "~/model/Bookmark"

export function filterByCategories(
  bookmarks: BookmarkCollection,
  activeCategories: string[]
) {
  const filterBookmarks = Object.keys(bookmarks).reduce(
    (acc: BookmarkCollection, key: string) => {
      if (activeCategories.indexOf(bookmarks[key].category) > -1) {
        return {
          ...acc,
          [key]: bookmarks[key],
        }
      } else {
        return acc
      }
    },
    {} as BookmarkCollection
  )
  return filterBookmarks
}

export function filterBySearchTerm(
  bookmarks: BookmarkCollection,
  searchTerm: string
) {
  const re = new RegExp(escapeRegExp(searchTerm), "i")

  const filteredBookmarks = Object.keys(bookmarks).reduce(
    (acc: BookmarkCollection, key: string) => {
      const bookmark = bookmarks[key]
      if (
        (searchTerm && re.test(bookmark.name)) ||
        re.test(bookmark.href) ||
        re.test(bookmark.category)
      ) {
        return {
          ...acc,
          [key]: bookmark,
        }
      } else {
        return acc
      }
    },
    {} as BookmarkCollection
  )

  return filteredBookmarks
}
