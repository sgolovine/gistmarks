export interface Bookmark {
  guid: string
  name: string
  href: string
  category: string
  description: string
}

export type BookmarkCollection = {
  [guid: string]: Bookmark
}
