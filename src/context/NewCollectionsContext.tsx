import React, { useState, useEffect, createContext, useContext } from "react"
import { ContextDevTool } from "react-context-devtool"
import { generateUUID, omitKey } from "~/helpers"
import { dev } from "~/helpers/isDev"
import { Bookmark, BookmarkCollection } from "~/model/Bookmark"
import { NewCollection } from "~/model/Collection"
import { ContextProviderProps } from "~/model/Context"

interface CollectionsState {
  collections: {
    [guid: string]: NewCollection
  }
  activeCollection?: string
  activeBookmarks: {
    [guid: string]: Bookmark
  }
}

interface CollectionsActions {
  addCollection: (collection: NewCollection) => void
  removeCollection: (collectionGuid: string) => void
  loadBookmarksFromCollection: (collectionId: string) => void
  saveBookmarksToCollection: (
    collectionId: string,
    bookmarks: BookmarkCollection
  ) => void
  setActiveCollection: (collectionId?: string) => void
  // Bookmark Actions
  addBookmark: (bookmark: Bookmark) => void
  removeBookmark: (bookmarkGuid: string) => void
}

type CollectionsContext = CollectionsState & CollectionsActions

export const NewCollectionsContext = createContext<CollectionsContext>(
  {} as CollectionsContext
)

export const NewCollectionsContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<CollectionsState>({
    collections: {},
    activeCollection: undefined,
    activeBookmarks: {},
  })

  const addCollection = (collection: NewCollection) => {
    setState({
      ...state,
      collections: {
        ...state.collections,
        [collection.guid]: collection,
      },
      activeCollection: collection.guid,
    })
  }

  const removeCollection = (collectionGuid: string) => {
    const newData = omitKey(collectionGuid, state.collections)
    // Check if the collection about to be deleted is active. If it is then set the active collection to null
    const newActiveCollection =
      collectionGuid === state.activeCollection
        ? undefined
        : state.activeCollection
    setState({
      ...state,
      collections: newData,
      activeCollection: newActiveCollection,
    })
  }

  const loadBookmarksFromCollection = (collectionId: string) => {
    const collection = state.collections[collectionId]
    setState({
      ...state,
      activeBookmarks: collection.bookmarks,
    })
  }

  const saveBookmarksToCollection = (collectionId: string) => {
    const newCollection: NewCollection = {
      ...state.collections[collectionId],
      bookmarks: state.activeBookmarks,
    }
    setState({
      ...state,
      collections: {
        ...state.collections,
        [collectionId]: newCollection,
      },
    })
  }

  const setActiveCollection = (newCollectionId?: string) => {
    // Get the ID of the current collection
    const currentActiveCollectionId = state.activeCollection

    // If an active collection exists, save bookmarks to
    // that collection
    if (currentActiveCollectionId) {
      const bookmarks = state.activeBookmarks
      saveBookmarksToCollection(currentActiveCollectionId)
    }

    // Switch to the new collection
    setState({
      ...state,
      activeCollection: newCollectionId,
    })

    // If the new collection exists (newCollection can be undefined)
    // Take the bookmarks from the new collection and apply it
    // to bookmarks context
    if (newCollectionId) {
      const newCollection = state.collections[newCollectionId]
      setState({
        ...state,
        activeBookmarks: newCollection.bookmarks,
      })
    }
  }

  const addBookmark = (bookmark: Bookmark) => {
    setState({
      ...state,
      activeBookmarks: {
        ...state.activeBookmarks,
        [bookmark.guid]: bookmark,
      },
    })
  }

  const removeBookmark = (bookmarkGuid: string) => {
    const newBookmarks = omitKey(bookmarkGuid, state.activeBookmarks)
    setState({
      ...state,
      activeBookmarks: newBookmarks,
    })
  }

  const actions: CollectionsActions = {
    addCollection,
    removeCollection,
    loadBookmarksFromCollection,
    saveBookmarksToCollection,
    setActiveCollection,
    addBookmark,
    removeBookmark,
  }

  return (
    <NewCollectionsContext.Provider value={{ ...state, ...actions }}>
      {children}
      {dev && (
        <ContextDevTool
          context={NewCollectionsContext}
          id="newCollectionsContext"
          displayName="NEW Collections Context"
        />
      )}
    </NewCollectionsContext.Provider>
  )
}
