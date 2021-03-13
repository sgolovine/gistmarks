// Represents a "shallow" collection

import { Bookmark, BookmarkCollection } from "./Bookmark"

// with a guid and a name
export interface Collection {
  name: string
  guid: string
}

export interface NewCollection {
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
