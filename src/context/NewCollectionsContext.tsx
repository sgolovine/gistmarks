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
  switchCollections: (collectionId?: string) => void
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

  const [nextActiveCollection, setNextActiveCollection] = useState<
    string | undefined
  >(undefined)

  const [activeCollection, setActiveCollection] = useState<string | undefined>(
    undefined
  )

  const [activeBookmarks, setActiveBookmarks] = useState<BookmarkCollection>({})

  useEffect(() => {
    // Get the previous collection and set the new collection
    const previousCollectionId = activeCollection
    const currentCollection = nextActiveCollection
    setActiveCollection(nextActiveCollection)

    // Set the bookmarks for the previous collection
    if (previousCollectionId && activeBookmarks) {
      const previousCollection = collectionsState[previousCollectionId]
      const previousCollectionWithBookmarks: NewCollection = {
        ...previousCollection,
        bookmarks: activeBookmarks,
      }
      setCollectionsState({
        ...collectionsState,
        [previousCollectionId]: previousCollectionWithBookmarks,
      })
    }

    // Check if the new collection has bookmarks and apply them
    if (
      currentCollection &&
      Object.keys(collectionsState[currentCollection].bookmarks).length > 0
    ) {
      const newCollectionBookmarks =
        collectionsState[currentCollection].bookmarks
      setActiveBookmarks(newCollectionBookmarks)
    } else {
      // If the new collection does not have any bookmarks
      // Empty the active bookmarks object
      setActiveBookmarks({})
    }
  }, [nextActiveCollection])

  useEffect(() => {
    console.log("active bookmarks sync for collection", activeCollection)
    if (activeCollection) {
      console.log("syncing active bookmarks")
      const collection = collectionsState[activeCollection]
      const newCollection = {
        ...collection,
        bookmarks: activeBookmarks,
      }
      setCollectionsState({
        ...collectionsState,
        [newCollection.guid]: newCollection,
      })
    }
  }, [activeBookmarks])

  const addCollection = (collection: NewCollection) => {
    setCollectionsState({
      ...collectionsState,
      [collection.guid]: {
        ...collection,
        bookmarks: !!activeCollection ? {} : activeBookmarks,
      },
    })
    if (!activeCollection) {
      setNextActiveCollection(collection.guid)
    }
  }

  const removeCollection = (collectionGuid: string) => {
    const newCollectionsData: { [guid: string]: NewCollection } = omitKey(
      collectionGuid,
      collectionsState
    )
    setCollectionsState(newCollectionsData)
    setActiveBookmarks({})
    // setNextActiveCollection(undefined)
  }

  const addBookmark = (bookmark: Bookmark) => {
    setActiveBookmarks({
      ...activeBookmarks,
      [bookmark.guid]: bookmark,
    })
  }

  const removeBookmark = (bookmarkGuid: string) => {
    const newBookmarks = omitKey(bookmarkGuid, activeBookmarks)
    setActiveBookmarks(newBookmarks)
  }

  const switchCollections = (newCollectionId?: string) => {
    setNextActiveCollection(newCollectionId || undefined)
  }

  const state: CollectionsState = {
    collections: collectionsState,
    activeCollection,
    activeBookmarks,
  }

  const actions: CollectionsActions = {
    addCollection,
    removeCollection,
    switchCollections,
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
