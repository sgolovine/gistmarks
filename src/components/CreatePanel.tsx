import React from "react"
import Button from "./common/Button"

const CreatePanel: React.FC = () => {
  return (
    <div className="min-w-create-panel border">
      <div>
        <p className="font-bold text-2xl p-1">Create Bookmark</p>
        <div className="flex flex-col py-2 px-1">
          <label className="text-sm font-bold">Bookmark Name (required)</label>
          <input
            className="border rounded px-1 py-2"
            placeholder="Bookmark Name"
          />
        </div>
        <div className="flex flex-col py-2 px-1">
          <label className="text-sm font-bold">Bookmark URL (required)</label>
          <input
            className="border rounded px-1 py-2"
            placeholder="Bookmark URL"
          />
        </div>
        <div className="flex flex-col py-2 px-1">
          <label className="text-sm font-bold">Description (optional)</label>
          <textarea
            rows={6}
            className="border rounded px-1 py-2"
            placeholder="Bookmark Description (optional)"
          />
        </div>
      </div>
      <div className="p-2">
        <Button
          onClick={() => null}
          label="Create"
          additionalClassnames="mx-2"
        />
        <Button
          onClick={() => null}
          danger
          label="Cancel"
          additionalClassnames="mx-2"
        />
      </div>
    </div>
  )
}

export default CreatePanel
