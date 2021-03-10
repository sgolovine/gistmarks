import React, { useState, useEffect, createContext } from "react"
import { COLLECTIONS_STORAGE_KEY } from "~/defines/localStorage"
import { removeItem, uniq } from "~/helpers"
import { ContextProviderProps } from "~/model/Context"
import { ContextDevTool } from "react-context-devtool"
import { dev } from "~/helpers/isDev"

interface CollectionsContext {
  collections: string[]
  activeCollection: string | null
  setActive: (guid: string) => void
  add: (guid: string) => void
  remove: (guid: string) => void
}

export const CollectionsContext = createContext<CollectionsContext>({
  collections: [],
  activeCollection: null,
  setActive: () => null,
  add: () => null,
  remove: () => null,
})

export const CollectionsContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [collections, setCollections] = useState<string[]>([])
  const [activeCollection, setActiveCollection] = useState<string>("")

  // Rehydrate collections from local storage
  useEffect(() => {
    const data = localStorage.getItem(COLLECTIONS_STORAGE_KEY)
    if (data) {
      const parsedData = JSON.parse(data)
      setCollections(parsedData.collections)
      setActiveCollection(parsedData.activeCollection)
    }
  }, [])

  // Persist collections into local storage on any change
  useEffect(() => {
    localStorage.setItem(
      COLLECTIONS_STORAGE_KEY,
      JSON.stringify({ collections, activeCollection })
    )
  }, [collections, activeCollection])

  const add = (collection: string) => {
    setCollections(uniq([...collections, collection]))
  }

  const remove = (collection: string) => {
    setCollections(removeItem(collections, collection))
  }

  const setActive = (collection: string) => {
    setActiveCollection(collection)
  }

  const contextValue: CollectionsContext = {
    collections,
    activeCollection,
    add,
    remove,
    setActive,
  }

  return (
    <CollectionsContext.Provider value={contextValue}>
      {children}
      {dev && (
        <ContextDevTool
          context={CollectionsContext}
          id="collectionsContext"
          displayName="Collections Context"
        />
      )}
    </CollectionsContext.Provider>
  )
}
