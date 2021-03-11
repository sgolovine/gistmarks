import { stringify } from "query-string"
import React, { useState, useEffect, createContext } from "react"
import { ContextDevTool } from "react-context-devtool"
import { dev } from "~/helpers/isDev"
import { ContextProviderProps } from "~/model/Context"

type Fields = "name" | "href" | "category" | "description"

interface EditorStateContext {
  bookmark: {
    guid: string
    name: string
    href: string
    category: string
    description: string
    setFields: ({
      guid,
      name,
      href,
      category,
      description,
    }: {
      guid: string
      name: string
      href: string
      category: string
      description: string
    }) => void
  }
  collection: {
    guid: string
    name: string
    description: string | null
    gistId: string | null
    setFields: ({
      guid,
      name,
      description,
      gistId,
    }: {
      guid: string
      name: string
      description: string
      gistId: string
    }) => void
  }
}

export const EditorStateContext = createContext<EditorStateContext>({
  bookmark: {
    guid: "",
    name: "",
    href: "",
    category: "",
    description: "",
    setFields: () => null,
  },
  collection: {
    guid: "",
    name: "",
    description: null,
    gistId: null,
    setFields: () => null,
  },
})

export const EditorStateContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [bookmarkState, setBookmarkState] = useState<{
    guid: string
    name: string
    href: string
    category: string
    description: string
  }>({
    guid: "",
    name: "",
    href: "",
    category: "",
    description: "",
  })

  const [collectionState, setCollectionState] = useState<{
    guid: string
    name: string
    description: string | null
    gistId: string | null
  }>({
    guid: "",
    name: "",
    description: null,
    gistId: null,
  })

  const setBookmarkFields = ({
    guid,
    name,
    href,
    category,
    description,
  }: {
    guid: string
    name: string
    href: string
    category: string
    description: string
  }) => {
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
  }: {
    guid: string
    name: string
    description: string | null
    gistId: string | null
  }) => {
    setCollectionState({
      guid,
      name,
      description,
      gistId,
    })
  }

  const contextValue: EditorStateContext = {
    bookmark: {
      guid: bookmarkState.guid,
      name: bookmarkState.name,
      href: bookmarkState.href,
      category: bookmarkState.category,
      description: bookmarkState.description,
      setFields: setBookmarkState,
    },
    collection: {
      guid: collectionState.guid,
      name: collectionState.name,
      description: collectionState.description,
      gistId: collectionState.gistId,
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
