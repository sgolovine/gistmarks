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
}

interface CollectionsActions {
  addCollection: (collection: NewCollection) => void
  removeCollection: (collectionGuid: string) => void
  loadBookmarksFromCollection: (collectionId: string) => void
  saveBookmarksToCollection: (
    collectionId: string,
    bookmarks: BookmarkCollection
  ) => void
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
  })

  const addCollection = (collection: NewCollection) => {
    setState({
      ...state,
      collections: {
        ...state.collections,
        [collection.guid]: collection,
      },
    })
  }

  const removeCollection = (collectionGuid: string) => {
    const newData = omitKey(collectionGuid, state.collections)
    setState({
      ...state,
      collections: newData,
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

  const actions: CollectionsActions = {
    addCollection,
    removeCollection,
    loadBookmarksFromCollection,
    saveBookmarksToCollection,
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
