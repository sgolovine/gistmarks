import React, { useContext, useState } from "react"
import { CollectionsContext, LayoutContext } from "~/context"
import { NewCollectionsContext } from "~/context/NewCollectionsContext"
import { generateUUID } from "~/helpers"
import { NewCollection } from "~/model/Collection"
import AppModal from "./common/AppModal"
import Button from "./common/Button"

const DebugWindow = () => {
  const layoutContext = useContext(LayoutContext)
  const collectionsContext = useContext(NewCollectionsContext)

  const [guidRemove, setGuidRemove] = useState("")
  const [colName, setColName] = useState("")

  const add = (name: string) => {
    const guid = generateUUID()
    const collection: NewCollection = {
      name,
      guid,
      description: "something here",
      bookmarks: [],
      gistId: null,
    }
    collectionsContext.addCollection(collection)
  }

  return (
    <AppModal
      open={layoutContext.devModalOpen}
      onClose={layoutContext.toggleDevModal}
    >
      <h1 className="text-xl">Debug</h1>
      <h2 className="text-lg">Collections Context Value</h2>
      <div className="form-container">
        <label className="form-label">Add Collection</label>
        <input
          className="form-field"
          placeholder="Enter collection name"
          value={colName}
          onChange={(e) => setColName(e.target.value)}
        />
      </div>

      <Button label="Add" onClick={() => add(colName)} />
      <div className="form-container">
        <label className="form-label">Guid to Remove</label>
        <input
          className="form-field"
          placeholder="Enter collection guid"
          value={guidRemove}
          onChange={(e) => setGuidRemove(e.target.value)}
        />
      </div>
      <Button
        label="Remove"
        onClick={() => collectionsContext.removeCollection(guidRemove)}
        danger
      />
      <pre>{JSON.stringify(collectionsContext, null, 2)}</pre>
    </AppModal>
  )
}

export default DebugWindow
