import React, { useContext, useEffect, useState } from "react"
import { CollectionsEditor } from "./CollectionsEditor"
import { EditorStateContext, LayoutContext } from "~/context"
import { CollectionType, NewCollection } from "~/model/Collection"
import { DEFAULT_COLLECTION_FILENAME } from "~/defines"
import { generateUUID } from "~/helpers"
import { NewCollectionsContext } from "~/context/CollectionsContext"

interface State {
  collectionType: CollectionType
  collectionName: string
  collectionDescription: string | null
  collectionGistId: string | null
  collectionFilename: string
}

export const CollectionsPanel: React.FC = () => {
  const layoutContext = useContext(LayoutContext)
  const editorStateContext = useContext(EditorStateContext)
  const collectionsContext = useContext(NewCollectionsContext)

  const [state, setState] = useState<State>({
    collectionType: "local",
    collectionName: "",
    collectionDescription: null,
    collectionGistId: null,
    collectionFilename: DEFAULT_COLLECTION_FILENAME,
  })

  useEffect(() => {
    if (layoutContext.collectionPanel.editMode) {
      setState({
        collectionType: editorStateContext.collection.gistId
          ? "remote"
          : "local",
        collectionName: editorStateContext.collection.name,
        collectionDescription: editorStateContext.collection.description,
        collectionGistId: editorStateContext.collection.gistId,
        collectionFilename:
          editorStateContext.collection.filename || DEFAULT_COLLECTION_FILENAME,
      })
    }
  }, [])

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

  const handleCreate = () => {
    if (!state.collectionName) {
      alert("Missing collection name")
      return
    }
    if (state.collectionType === "remote" && !state.collectionFilename) {
      alert("Missing filename")
      return
    }
    const generatedGuid = generateUUID()

    const collection: NewCollection = {
      guid: layoutContext.collectionPanel.editMode
        ? editorStateContext.collection.guid
        : generatedGuid,
      name: state.collectionName,
      description: state.collectionDescription,
      bookmarks: {},
      gistId: state.collectionGistId,
      gistFilename: state.collectionFilename,
    }
    collectionsContext.addCollection(collection)
    layoutContext.toggleCollectionsPanel({ open: false, editMode: false })
  }

  const handleCancel = () => {
    layoutContext.toggleCollectionsPanel({ open: false, editMode: false })
  }

  const handleDelete = () => {
    if (editorStateContext.collection.guid) {
      collectionsContext.removeCollection(editorStateContext.collection.guid)
      layoutContext.toggleCollectionsPanel({ open: false, editMode: false })
    }
  }

  return (
    <CollectionsEditor
      editMode={layoutContext.collectionPanel.editMode}
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
      onDelete={handleDelete}
    />
  )
}
