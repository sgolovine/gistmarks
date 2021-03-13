import React, { useContext } from "react"
import {
  EditorStateContext,
  LayoutContext,
  CollectionsContext,
} from "~/context"
import Button from "./common/Button"
import IconButton from "./common/IconButton"
import EditIcon from "./icons/EditIcon"

const SidebarCollectionsSection: React.FC = () => {
  const collectionsContext = useContext(CollectionsContext)
  const layoutContext = useContext(LayoutContext)
  const editorStateContext = useContext(EditorStateContext)
  const collectionKeys = Object.keys(collectionsContext.collections)

  const handleEditClick = () => {
    if (!collectionsContext.activeCollection) {
      alert("Err: No active collection found")
      return
    }
    const fullCollection =
      collectionsContext.collections[collectionsContext.activeCollection]

    editorStateContext.collection.setFields({
      guid: fullCollection.guid,
      name: fullCollection.name,
      description: fullCollection.description,
      gistId: fullCollection.gistId,
      filename: fullCollection.gistFilename,
    })

    layoutContext.toggleCollectionsPanel({ open: true, editMode: true })
  }

  return (
    <div className="flex flex-row">
      <select
        value={collectionsContext.activeCollection}
        onChange={(e) => collectionsContext.switchCollections(e.target.value)}
        className="flex-grow mb-4 border p-1 rounded shadow mr-2"
      >
        {collectionKeys.map((key) => {
          const currentCollection = collectionsContext.collections[key]

          return (
            <option value={currentCollection.guid} key={key}>
              {currentCollection.name}
            </option>
          )
        })}
      </select>
      {collectionsContext.activeCollection && (
        <IconButton onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
      )}
    </div>
  )
}

const Sidebar: React.FC = () => {
  const collectionsContext = useContext(CollectionsContext)
  const layoutContext = useContext(LayoutContext)

  const collectionKeys = Object.keys(collectionsContext.collections)

  const handleCreateCollection = () => {
    layoutContext.toggleCollectionsPanel({ open: true })
  }

  return (
    <div className="flex flex-col min-w-sidebar p-4 h-full">
      <div className="pb-2 flex flex-col">
        <p className="font-bold pb-2">Collections</p>
        {collectionKeys.length > 0 && <SidebarCollectionsSection />}
        <div className="flex flex-row justify-evenly">
          <Button label="Create Collection" onClick={handleCreateCollection} />
          <Button label="Import Collection" onClick={handleCreateCollection} />
        </div>
      </div>
      <div className="pt-2">
        <p className="font-bold">Categories</p>
      </div>
    </div>
  )
}

export default Sidebar
