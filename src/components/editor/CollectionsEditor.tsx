import React, { useContext, useState } from "react"
import Button from "~/components/common/Button"
import { LayoutContext } from "~/context"
import { NewCollectionsContext } from "~/context/NewCollectionsContext"
import { generateUUID } from "~/helpers"
import { NewCollection } from "~/model/Collection"

interface FormState {
  collectionType: "local" | "remote"
  collectionName: string
  collectionDescription: string
  gistFilename: string
  gistID?: string
}

export const CollectionsEditor = () => {
  const collectionsContext = useContext(NewCollectionsContext)
  const layoutContext = useContext(LayoutContext)

  const [formState, setFormState] = useState<FormState>({
    collectionType: "local",
    collectionName: "",
    collectionDescription: "",
    gistID: "",
    gistFilename: "bookmarks.json",
  })

  const handleLocalRemoteChange = (newValue: "local" | "remote") => {
    setFormState({
      ...formState,
      collectionType: newValue,
    })
  }

  const handleCollectionField = (field: keyof FormState, newValue: string) => {
    setFormState({
      ...formState,
      [field]: newValue,
    })
  }

  const handleCreateCollection = () => {
    if (!formState.collectionName) {
      alert("Please enter a collection name!")
      return
    }
    const guid = generateUUID()
    const collection: NewCollection = {
      guid,
      name: formState.collectionName,
      description: formState.collectionDescription || null,
      bookmarks: {},
      gistId: formState.gistID || null,
    }
    collectionsContext.addCollection(collection)
    layoutContext.toggleCollectionsPanel()
  }

  return (
    <div className="min-w-create-panel border">
      <div>
        <p className="font-bold text-2xl p-1">Create Collection</p>
      </div>
      {/* Fields */}
      <div className="form-container">
        <label className="form-label">Collection Type</label>
        <select
          className="form-field"
          defaultValue="local"
          value={formState.collectionType}
          onChange={(e) =>
            handleLocalRemoteChange(e.target.value as "local" | "remote")
          }
        >
          <option value="local">Local</option>
          <option value="remote">Remote (Gist)</option>
        </select>
      </div>

      <div className="form-container">
        <label className="form-label">Collection Name</label>
        <input
          className="form-field"
          placeholder="Enter collection name"
          value={formState.collectionName}
          onChange={(e) =>
            handleCollectionField("collectionName", e.target.value)
          }
        />
      </div>

      <div className="form-container">
        <label className="form-label">Description (optional)</label>
        <textarea
          className="form-field"
          placeholder="Optional description"
          value={formState.collectionDescription}
          onChange={(e) =>
            handleCollectionField("collectionDescription", e.target.value)
          }
          rows={4}
        />
      </div>
      {formState.collectionType === "remote" && (
        <>
          <div className="form-container">
            <label className="form-label">Gist ID (optional)</label>
            <input
              className="form-field"
              placeholder="Leave blank to create a new Gist"
              value={formState.gistID}
              onChange={(e) => handleCollectionField("gistID", e.target.value)}
            />
          </div>

          <div className="form-container">
            <label className="form-label">Gist Filename</label>
            <input
              className="form-field"
              value={formState.gistFilename}
              onChange={(e) =>
                handleCollectionField("gistFilename", e.target.value)
              }
            />
          </div>
        </>
      )}
      <div className="px-2 flex flex-row py-4">
        <Button
          danger
          label="Cancel"
          additionalClassnames="mr-2"
          onClick={() => layoutContext.toggleCollectionsPanel()}
        />
        <Button
          label="Create"
          additionalClassnames="ml-2"
          onClick={() => handleCreateCollection()}
        />
      </div>
    </div>
  )
}
