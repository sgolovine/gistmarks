import React, { useContext, useState } from "react"
import Modal from "react-modal"
import { LayoutContext } from "~/context"
import { NewCollectionsContext } from "~/context/NewCollectionsContext"
import { generateUUID } from "~/helpers"
import { NewCollection } from "~/model/Collection"
import Button from "../common/Button"
import IconButton from "../common/IconButton"
import CloseIcon from "../icons/CloseIcon"

interface FormState {
  collectionType: "local" | "remote"
  collectionName: string
  collectionDescription: string
  gistFilename: string
  gistID?: string
}

export const CollectionEditor = () => {
  const layoutContext = useContext(LayoutContext)
  const collectionsContext = useContext(NewCollectionsContext)

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
    const collectionGuid = generateUUID()
    const collection: NewCollection = {
      guid: collectionGuid,
      name: formState.collectionName,
      description: formState.collectionDescription,
      bookmarks: {},
      gistId: null,
    }
    console.log("about to create collection", collection)
    // collectionsContext.addCollection(collection)
  }

  return (
    <Modal
      isOpen={layoutContext.collectionModalOpen}
      onRequestClose={() => layoutContext.toggleCollectionModal()}
      style={{
        content: {
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          height: "auto",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
      }}
    >
      <div>
        {/* Header */}
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl font-bold">New Collection</p>
          <button onClick={() => layoutContext.toggleCollectionModal()}>
            <CloseIcon size={32} />
          </button>
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
                onChange={(e) =>
                  handleCollectionField("gistID", e.target.value)
                }
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
        <div className="flex flex-row py-4">
          <Button
            danger
            label="Cancel"
            additionalClassnames="mr-2"
            onClick={() => layoutContext.toggleCollectionModal()}
          />
          {/* <Button
            label="Create"
            onClick={() => console.log("this button has been clicked")}
            additionalClassnames="ml-2"
          /> */}
          <button onClick={() => console.log("I have been clicked")}>
            Click me!
          </button>
        </div>
      </div>
    </Modal>
  )
}
