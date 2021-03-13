import React, { useState, createContext } from "react"
import { ContextDevTool } from "react-context-devtool"
import { dev } from "~/helpers/isDev"
import { ContextProviderProps } from "~/model/Context"

type BookmarkArgs = {
  guid: string
  name: string
  href: string
  category: string
  description: string
}

type CollectionArgs = {
  guid: string
  name: string
  description: string | null
  gistId: string | null
  filename: string | null
}

interface EditorBookmarkState {
  guid: string
  name: string
  href: string
  category: string
  description: string
  setFields: ({ guid, name, href, category, description }: BookmarkArgs) => void
}

interface EditorCollectionState {
  guid: string
  name: string
  description: string | null
  gistId: string | null
  filename: string | null
  setFields: ({
    guid,
    name,
    description,
    gistId,
    filename,
  }: CollectionArgs) => void
}

interface EditorStateContext {
  bookmark: EditorBookmarkState
  collection: EditorCollectionState
}

const bookmarkInitialState: EditorBookmarkState = {
  guid: "",
  name: "",
  href: "",
  category: "",
  description: "",
  setFields: () => null,
}

const collectionInitialState: EditorCollectionState = {
  guid: "",
  name: "",
  description: null,
  gistId: null,
  filename: null,
  setFields: () => null,
}

export const EditorStateContext = createContext<EditorStateContext>({
  bookmark: bookmarkInitialState,
  collection: collectionInitialState,
})

export const EditorStateContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [bookmarkState, setBookmarkState] = useState<BookmarkArgs>({
    guid: "",
    name: "",
    href: "",
    category: "",
    description: "",
  })

  const [collectionState, setCollectionState] = useState<CollectionArgs>({
    guid: "",
    name: "",
    description: null,
    gistId: null,
    filename: null,
  })

  const setBookmarkFields = ({
    guid,
    name,
    href,
    category,
    description,
  }: BookmarkArgs) => {
    setBookmarkState({
      guid,
      name,
      href,
      category,
      description,
    })
  }

  const setCollectionFields = ({
    guid,
    name,
    description,
    gistId,
    filename,
  }: CollectionArgs) => {
    setCollectionState({
      guid,
      name,
      description,
      gistId,
      filename,
    })
  }

  const contextValue: EditorStateContext = {
    bookmark: {
      guid: bookmarkState.guid,
      name: bookmarkState.name,
      href: bookmarkState.href,
      category: bookmarkState.category,
      description: bookmarkState.description,
      setFields: setBookmarkFields,
    },
    collection: {
      guid: collectionState.guid,
      name: collectionState.name,
      description: collectionState.description,
      gistId: collectionState.gistId,
      filename: collectionState.filename,
      setFields: setCollectionFields,
    },
  }

  return (
    <EditorStateContext.Provider value={contextValue}>
      {children}
      {dev && (
        <ContextDevTool
          context={EditorStateContext}
          id="editorStateContext"
          displayName="Editor State Context"
        />
      )}
    </EditorStateContext.Provider>
  )
}
