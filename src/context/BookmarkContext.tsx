import React, { createContext, useEffect, useState } from "react"
import { Bookmark } from "~/model/Bookmark"
import { ContextProviderProps } from "~/model/Context"
import { ContextDevTool } from "react-context-devtool"
import { BOOKMARK_STORAGE_KEY } from "~/defines/localStorage"
import { generateUUID, omitKey } from "~/helpers"
import { dev } from "~/helpers/isDev"
import { NewCollection } from "~/model/Collection"

type BookmarkMeta = {
  name: string | null
  description: string | null
  gistID: string | null
}

type BookmarksData = {
  [guid: string]: Bookmark
}

interface BookmarkContext {
  actions: {
    addBookmark: (b: Bookmark, guid?: string) => void
    removeBookmark: (guid: string) => void
    editName: (name: string) => void
    editDescription: (desc: string) => void
    editGistID: (gistID: string) => void
    save: () => void
    loadBookmarks: (c: NewCollection) => void
  }
  data: {
    meta: BookmarkMeta
    bookmarks: BookmarksData
  }
}

const coldContext: BookmarkContext = {
  actions: {
    addBookmark: () => null,
    removeBookmark: () => null,
    editName: () => null,
    editDescription: () => null,
    editGistID: () => null,
    save: () => null,
    loadBookmarks: () => null,
  },
  data: {
    meta: {
      name: null,
      description: null,
      gistID: null,
    },
    bookmarks: {},
  },
}

export const BookmarkContext = createContext<BookmarkContext>(coldContext)

export const BookmarkContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [bookmarkMeta, setBookmarkMeta] = useState<BookmarkMeta>(
    coldContext.data.meta
  )
  const [bookmarkData, setBookmarkData] = useState<BookmarksData>(
    coldContext.data.bookmarks
  )

  // Rehydrate Data
  useEffect(() => {
    const data = localStorage.getItem(BOOKMARK_STORAGE_KEY)
    if (data) {
      const parsedData = JSON.parse(data)
      setBookmarkMeta(parsedData.meta)
      setBookmarkData(parsedData.data)
    }
  }, [])

  // Persist Data
  useEffect(() => {
    localStorage.setItem(
      BOOKMARK_STORAGE_KEY,
      JSON.stringify({ meta: bookmarkMeta, data: bookmarkData })
    )
  }, [bookmarkMeta, bookmarkData])

  const addBookmark = (bookmark: Bookmark, guid?: string) => {
    if (!!guid) {
      setBookmarkData({
        ...bookmarkData,
        [guid]: bookmark,
      })
    } else {
      const generatedGuid = generateUUID()
      setBookmarkData({
        ...bookmarkData,
        [generatedGuid]: bookmark,
      })
    }
  }

  const removeBookmark = (bookmarkGuid: string) => {
    setBookmarkData(omitKey(bookmarkGuid, bookmarkData))
  }

  const editName = (newName: string) => {
    setBookmarkMeta({
      ...bookmarkMeta,
      name: newName,
    })
  }

  const editDescription = (newDescription: string) => {
    setBookmarkMeta({
      ...bookmarkMeta,
      description: newDescription,
    })
  }

  const editGistID = (newGistId: string) => {
    setBookmarkMeta({
      ...bookmarkMeta,
      gistID: newGistId,
    })
  }

  // Loads bookmarks from collections context
  // into bookmark context
  const loadBookmarks = (collection: NewCollection) => {
    setBookmarkMeta({
      name: collection.name,
      description: collection.description,
      gistID: null,
    })
    setBookmarkData(collection.bookmarks)
  }

  const save = () => {
    console.log("~~ Saving to Github Gist Coming Soon! ~~")
  }

  const providerValue: BookmarkContext = {
    actions: {
      addBookmark,
      removeBookmark,
      editName,
      editDescription,
      editGistID,
      save,
      loadBookmarks,
    },
    data: {
      meta: bookmarkMeta,
      bookmarks: bookmarkData,
    },
  }

  return (
    <BookmarkContext.Provider value={providerValue}>
      {children}
      {dev && (
        <ContextDevTool
          context={BookmarkContext}
          id="bookmarkContext"
          displayName="Bookmark Context"
        />
      )}
    </BookmarkContext.Provider>
  )
}
