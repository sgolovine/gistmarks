import React, { useState, useEffect, createContext, useContext } from "react"
import { ContextDevTool } from "react-context-devtool"
import { generateUUID, omitKey } from "~/helpers"
import { dev } from "~/helpers/isDev"
import { Bookmark, BookmarkCollection } from "~/model/Bookmark"
import { NewCollection } from "~/model/Collection"
import { ContextProviderProps } from "~/model/Context"
import { BookmarkContext } from "./BookmarkContext"

interface CollectionsState {
  collections: {
    [guid: string]: NewCollection
  }
  activeCollection?: string
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
}

type CollectionsContext = CollectionsState & CollectionsActions

export const NewCollectionsContext = createContext<CollectionsContext>(
  {} as CollectionsContext
)

export const NewCollectionsContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const bookmarkContext = useContext(BookmarkContext)
  const [state, setState] = useState<CollectionsState>({
    collections: {},
    activeCollection: undefined,
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
    bookmarkContext.actions.loadBookmarks(collection)
  }

  const saveBookmarksToCollection = (
    collectionId: string,
    bookmarks: BookmarkCollection
  ) => {
    const newCollection: NewCollection = {
      ...state.collections[collectionId],
      bookmarks,
    }
    setState({
      ...state,
      collections: {
        ...state.collections,
        [collectionId]: {
          ...state.collections[collectionId],
          bookmarks,
        },
      },
    })
  }

  const setActiveCollection = (newCollection?: string) => {
    setState({
      ...state,
      activeCollection: newCollection,
    })
  }

  const actions: CollectionsActions = {
    addCollection,
    removeCollection,
    loadBookmarksFromCollection,
    saveBookmarksToCollection,
    setActiveCollection,
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
