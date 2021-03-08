import { sendStatusCode } from "next/dist/next-server/server/api-utils"
import React, { useContext, useState } from "react"
import { BookmarkContext, LayoutContext } from "~/context"
import { generateUUID } from "~/helpers"
import { Bookmark } from "~/model/Bookmark"
import Button from "~/components/common/Button"

const CreatePanel: React.FC = () => {
  const bookmarkContext = useContext(BookmarkContext)
  const layoutContext = useContext(LayoutContext)

  const [state, setState] = useState<Bookmark>({
    name: "",
    href: "",
    category: "",
    description: "",
  })

  const handleSave = () => {
    if (!state.name) {
      alert("Please enter a name!")
      return
    }

    if (!state.href) {
      alert("Please enter a URL")
      return
    }

    bookmarkContext.actions.addBookmark(state)
    layoutContext.toggleCreatePanel()
  }

  const handleCancel = () => {
    layoutContext.toggleCreatePanel()
  }

  return (
    <div className="min-w-create-panel border">
      <div>
        <p className="font-bold text-2xl p-1">Create Bookmark</p>
        {/* NAME */}
        <div className="flex flex-col py-2 px-1">
          <label className="text-sm font-bold">Bookmark Name (required)</label>
          <input
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            className="border rounded px-1 py-2"
            placeholder="Bookmark Name"
          />
        </div>

        {/* HREF */}
        <div className="flex flex-col py-2 px-1">
          <label className="text-sm font-bold">Bookmark URL (required)</label>
          <input
            value={state.href}
            onChange={(e) => setState({ ...state, href: e.target.value })}
            className="border rounded px-1 py-2"
            placeholder="Bookmark URL"
          />
        </div>

        {/* CATEGORY */}
        <div className="flex flex-col py-2 px-1">
          <label className="text-sm font-bold">Category (optional)</label>
          <input
            value={state.category}
            onChange={(e) => setState({ ...state, category: e.target.value })}
            className="border rounded px-1 py-2"
            placeholder="Category"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col py-2 px-1">
          <label className="text-sm font-bold">Description (optional)</label>
          <textarea
            value={state.description}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
            rows={6}
            className="border rounded px-1 py-2"
            placeholder="Bookmark Description (optional)"
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="p-2">
        <Button
          onClick={handleSave}
          label="Create"
          additionalClassnames="mx-2"
        />
        <Button
          onClick={handleCancel}
          danger
          label="Cancel"
          additionalClassnames="mx-2"
        />
      </div>
    </div>
  )
}

export default CreatePanel
