import React, { useContext, useState } from "react"
import { CollectionsEditor } from "./CollectionsEditor"
import { CollectionsContext, LayoutContext } from "~/context"
import { CollectionType } from "~/model/Collection"
import { DEFAULT_COLLECTION_FILENAME } from "~/defines"

interface State {
  collectionType: CollectionType
  collectionName: string
  collectionDescription: string | null
  collectionGistId: string | null
  collectionFilename: string
}

export const CreateCollectionsPanel: React.FC = () => {
  const layoutContext = useContext(LayoutContext)
  const collectionsContext = useContext(CollectionsContext)

  const [state, setState] = useState<State>({
    collectionType: "local",
    collectionName: "",
    collectionDescription: null,
    collectionGistId: null,
    collectionFilename: DEFAULT_COLLECTION_FILENAME,
  })

  const handleCollectionTypeChange = (newCollectionType: CollectionType) => {
    setState({
      ...state,
      collectionType: newCollectionType,
    })
  }

  const handleCollectionNameChange = (newName: string) => {
    setState({
      ...state,
      collectionName: newName,
    })
  }

  const handleCollectionDescriptionChange = (newDescription: string) => {
    setState({
      ...state,
      collectionDescription: newDescription,
    })
  }

  const handleCollectionGistIdChange = (newGistId: string) => {
    setState({
      ...state,
      collectionGistId: newGistId,
    })
  }

  const handleCollectionFilenameChange = (newFilename: string) => {
    setState({
      ...state,
      collectionFilename: newFilename,
    })
  }

  const handleCreate = () => {}

  const handleCancel = () => {}

  return (
    <CollectionsEditor
      collectionType={state.collectionType}
      collectionName={state.collectionName}
      collectionDescription={state.collectionDescription}
      collectionFilename={state.collectionFilename}
      collectionGistId={state.collectionGistId}
      onCollectionTypeChange={handleCollectionTypeChange}
      onCollectionNameChange={handleCollectionNameChange}
      onCollectionDescriptionChange={handleCollectionDescriptionChange}
      onCollectionGistIdChange={handleCollectionGistIdChange}
      onCollectionFilenameChange={handleCollectionFilenameChange}
      onCancel={handleCancel}
      onCreate={handleCreate}
    />
  )
}
