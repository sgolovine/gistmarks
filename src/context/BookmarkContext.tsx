import React, { createContext } from "react"
import { BOOKMARK_STORAGE_KEY } from "~/defines"
import { omitKey } from "~/helpers"
import useLocalStorage from "~/hooks/useLocalStorage"
import { Bookmark } from "~/model/Bookmark"
import { ContextProviderProps } from "~/model/Context"

type Bookmarks = {
  [guid: string]: Bookmark
}

interface BookmarkContext {
  bookmarks: Bookmarks
  addBookmark: (bookmark: Bookmark, guid: string) => void
  removeBookmark: (guid: string) => void
  editBookmark: (bookmark: Partial<Bookmark>, guid: string) => void
}

export const BookmarkContext = createContext<BookmarkContext>({
  bookmarks: {},
  addBookmark: () => null,
  removeBookmark: () => null,
  editBookmark: () => null,
})

export const BookmarkContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [_bookmarks, _setBookmarks] = useLocalStorage<Bookmarks>(
    BOOKMARK_STORAGE_KEY,
    {}
  )

  const addBookmark = (bookmark: Bookmark, guid: string) => {
    _setBookmarks({
      ..._bookmarks,
      [guid]: bookmark,
    })
  }
  const removeBookmark = (guid: string) => {
    const newState = omitKey(guid, _bookmarks)
    _setBookmarks(newState)
  }

  const editBookmark = (bookmark: Partial<Bookmark>, guid: string) => {
    if (_bookmarks[guid]) {
      _setBookmarks({
        ..._bookmarks,
        [guid]: {
          ..._bookmarks[guid],
          ...bookmark,
        },
      })
    }
  }

  const value: BookmarkContext = {
    bookmarks: _bookmarks,
    addBookmark,
    editBookmark,
    removeBookmark,
  }

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  )
}
