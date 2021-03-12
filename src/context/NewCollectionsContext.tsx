import { stat } from "node:fs"
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
  activeBookmarks: BookmarkCollection
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
  const [collectionsState, setCollectionsState] = useState<{
    [guid: string]: NewCollection
  }>({})

  const [activeCollectionState, setActiveCollectionState] = useState<
    string | undefined
  >(undefined)

  const [
    activeBookmarksState,
    setActiveBookmarksState,
  ] = useState<BookmarkCollection>({})

  const addCollection = (collection: NewCollection) => {
    setCollectionsState({
      ...collectionsState,
      [collection.guid]: {
        ...collection,
        bookmarks: !!activeCollectionState ? {} : activeBookmarksState,
      },
    })
    setActiveCollection(
      !!activeCollectionState ? activeCollectionState : collection.guid
    )
  }

  const removeCollection = (collectionGuid: string) => {
    const newData = omitKey(collectionGuid, collectionsState)

    // Check if the collection about to be deleted is active. If it is then set the active collection to null
    const newActiveCollection =
      collectionGuid === activeCollectionState
        ? undefined
        : activeCollectionState

    setCollectionsState(newData)

    setActiveCollection(newActiveCollection)
  }

  const loadBookmarksFromCollection = (collectionId: string) => {
    const collection = collectionsState[collectionId]
    setActiveBookmarksState(collection.bookmarks)
  }

  const saveBookmarksToCollection = (
    collectionId: string,
    bookmarksToSave: BookmarkCollection
  ) => {
    const newCollection: NewCollection = {
      ...collectionsState[collectionId],
      bookmarks: bookmarksToSave,
    }
    setCollectionsState({
      ...collectionsState,
      [collectionId]: newCollection,
    })
  }

  const setActiveCollection = (newCollectionId?: string) => {
    // If an active collection exists, save bookmarks to
    // that collection
    if (activeCollectionState) {
      saveBookmarksToCollection(activeCollectionState, activeBookmarksState)
    }

    // Switch to the new collection
    setActiveCollection(newCollectionId)

    // If the new collection exists (newCollection can be undefined)
    // Take the bookmarks from the new collection and apply it
    // to bookmarks context
    if (newCollectionId) {
      const newCollection = collectionsState[newCollectionId]
      setActiveBookmarksState(newCollection.bookmarks)
    }
  }

  const switchCollections = (newCollectionId?: string) => {
    // Check if we have an activeCollection and activeBookmarks
    if (
      !!activeCollectionState &&
      Object.keys(activeBookmarksState).length > 0
    ) {
      saveBookmarksToCollection(activeCollectionState, activeBookmarksState)
    }

    // MORE WIP
  }

  const addBookmark = (bookmark: Bookmark) => {
    setActiveBookmarksState({
      ...activeBookmarksState,
      [bookmark.guid]: bookmark,
    })
  }

  const removeBookmark = (bookmarkGuid: string) => {
    const newBookmarks = omitKey(bookmarkGuid, activeBookmarksState)
    setActiveBookmarksState(newBookmarks)
  }

  const state: CollectionsState = {
    collections: collectionsState,
    activeCollection: activeCollectionState,
    activeBookmarks: activeBookmarksState,
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
