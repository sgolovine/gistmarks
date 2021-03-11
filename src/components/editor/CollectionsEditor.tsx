import React, { useContext, useState } from "react"
import Button from "~/components/common/Button"
import { LayoutContext } from "~/context"
import { NewCollectionsContext } from "~/context/NewCollectionsContext"
import { generateUUID } from "~/helpers"
import { CollectionType, NewCollection } from "~/model/Collection"

interface Props {
  collectionType: CollectionType
  collectionName: string
  collectionDescription: string | null
  collectionGistId: string | null
  collectionFilename: string
  onCollectionTypeChange: (type: CollectionType) => void
  onCollectionNameChange: (newName: string) => void
  onCollectionDescriptionChange: (newDescription: string) => void
  onCollectionGistIdChange: (newGistId: string) => void
  onCollectionFilenameChange: (newFilename: string) => void
  onCancel: () => void
  onCreate: () => void
}

export const CollectionsEditor: React.FC<Props> = ({
  collectionType,
  collectionName,
  collectionDescription,
  collectionGistId,
  collectionFilename,
  onCollectionDescriptionChange,
  onCollectionFilenameChange,
  onCollectionGistIdChange,
  onCollectionNameChange,
  onCollectionTypeChange,
  onCancel,
  onCreate,
}) => {
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
          value={collectionType}
          onChange={(e) =>
            onCollectionTypeChange(e.target.value as CollectionType)
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
          value={collectionName}
          onChange={(e) => onCollectionNameChange(e.target.value)}
        />
      </div>

      <div className="form-container">
        <label className="form-label">Description (optional)</label>
        <textarea
          className="form-field"
          placeholder="Optional description"
          value={collectionDescription || ""}
          onChange={(e) => onCollectionDescriptionChange(e.target.value)}
          rows={4}
        />
      </div>
      {collectionType === "remote" && (
        <>
          <div className="form-container">
            <label className="form-label">Gist ID (optional)</label>
            <input
              className="form-field"
              placeholder="Leave blank to create a new Gist"
              value={collectionGistId || ""}
              onChange={(e) => onCollectionGistIdChange(e.target.value)}
            />
          </div>

          <div className="form-container">
            <label className="form-label">Gist Filename</label>
            <input
              className="form-field"
              value={collectionFilename}
              onChange={(e) => onCollectionFilenameChange(e.target.value)}
            />
          </div>
        </>
      )}
      <div className="px-2 flex flex-row py-4">
        <Button
          danger
          label="Cancel"
          additionalClassnames="mr-2"
          onClick={onCancel}
        />
        <Button label="Create" additionalClassnames="ml-2" onClick={onCreate} />
      </div>
    </div>
  )
}
