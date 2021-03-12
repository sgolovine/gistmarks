import React, { useContext, useState } from "react"
import { LayoutContext } from "~/context"
import { generateUUID } from "~/helpers"
import { Bookmark } from "~/model/Bookmark"
import Button from "~/components/common/Button"
import { dev } from "~/helpers/isDev"

export interface EditorProps {
  editMode: boolean
  name: string
  href: string
  category: string
  description: string
  onEditField: (field: keyof Bookmark, value: string) => void
  onDirectEdit: (newValue: Bookmark) => void
  onSave: () => void
  onCancel: () => void
}

const Editor: React.FC<EditorProps> = ({
  editMode,
  name,
  href,
  category,
  description,
  onEditField,
  onDirectEdit,
  onSave,
  onCancel,
}) => {
  const headingText = editMode ? "Edit Bookmark" : "Create Bookmark"
  const submitButtonText = editMode ? "Save Changes" : "Create"
  return (
    <div className="min-w-create-panel border">
      <div>
        <p className="font-bold text-2xl p-1">{headingText}</p>
        {dev && (
          <div className="flex flex-col py-2 px-1">
            <label className="text-sm font-bold">Dev Options</label>
            <div>
              <Button
                label="Autofill"
                onClick={() =>
                  onDirectEdit({
                    guid: generateUUID(),
                    name: "New bookmark",
                    href: "https://gistmarks.io",
                    description: "This is a sample description",
                    category: "Default",
                  })
                }
              />
            </div>
          </div>
        )}

        {/* NAME */}
        <div className="flex flex-col py-2 px-1">
          <label className="text-sm font-bold">Bookmark Name (required)</label>
          <input
            value={name}
            onChange={(e) => onEditField("name", e.target.value)}
            className="border rounded px-1 py-2"
          />
        </div>

        {/* HREF */}
        <div className="flex flex-col py-2 px-1">
          <label className="text-sm font-bold">Bookmark URL (required)</label>
          <input
            value={href}
            onChange={(e) => onEditField("href", e.target.value)}
            className="border rounded px-1 py-2"
            placeholder="Bookmark URL"
          />
        </div>

        {/* CATEGORY */}
        <div className="flex flex-col py-2 px-1">
          <label className="text-sm font-bold">Category (optional)</label>
          <input
            value={category}
            onChange={(e) => onEditField("category", e.target.value)}
            className="border rounded px-1 py-2"
            placeholder="Category"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col py-2 px-1">
          <label className="text-sm font-bold">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => onEditField("description", e.target.value)}
            rows={6}
            className="border rounded px-1 py-2"
            placeholder="Bookmark Description (optional)"
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="p-2">
        <Button
          onClick={onSave}
          label={submitButtonText}
          additionalClassnames="mx-2"
        />
        <Button
          onClick={onCancel}
          danger
          label="Cancel"
          additionalClassnames="mx-2"
        />
      </div>
    </div>
  )
}

export default Editor
