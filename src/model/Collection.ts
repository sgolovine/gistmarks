import { BookmarkCollection } from "./Bookmark"

export interface Collection {
  // Then name of the collection
  name: string
  // Auto generated guid
  guid: string
  // Optional Description
  description: string | null
  // Bookmark Data
  bookmarks: BookmarkCollection
  // Remote Gist ID
  gistId: string | null
  // gist filename
  gistFilename: string | null
}

export type CollectionType = "local" | "remote"
