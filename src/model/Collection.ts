// Represents a "shallow" collection

import { Bookmark } from "./Bookmark"

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
  description: string
  // Bookmark Data
  bookmarks: Bookmark[]
  // Remote Gist ID
  gistId: string
}
