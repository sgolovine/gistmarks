import React, { useContext, useState } from "react"
import { BookmarkContext } from "~/context"
import { generateUUID } from "~/helpers"
import { Bookmark } from "~/model/Bookmark"
import { LayoutContext } from "~/context/LayoutContext"
import { Panel } from "~/layout/Panel"
import { BookmarkPanelEditor } from "./BookmarkPanelEditor"
import { createFakeBookmark } from "~/helpers/createFakeBookmark"

export const CreatePanel = () => {
  const bookmarkContext = useContext(BookmarkContext)
  const layoutContext = useContext(LayoutContext)

  const [state, setState] = useState<{
    name: string
    href: string
    category: string
    description: string
  }>({
    name: "",
    href: "",
    category: "",
    description: "",
  })

  const handleAutofill = () => {
    const { name, href, category, description } = createFakeBookmark()
    setState({
      name,
      href,
      category,
      description,
    })
  }

  const handleSave = () => {
    if (!state.name) {
      alert("Please enter a name!")
      return
    }

    if (!state.href) {
      alert("Please enter a URL")
      return
    }

    const guid = generateUUID()
    const bookmark: Bookmark = {
      guid,
      name: state.name,
      href: state.href,
      description: state.description,
      category: state.category,
    }
    bookmarkContext.addBookmark(bookmark, guid)
    layoutContext.closeCreatePanel()
  }

  const handleEditField = (key: keyof Bookmark, value: string) => {
    setState({
      ...state,
      [key]: value,
    })
  }

  return (
    <Panel
      open={layoutContext.createPanelOpen}
      title="Create Bookmark"
      onClose={layoutContext.closeCreatePanel}
    >
      <BookmarkPanelEditor
        editMode={false}
        bookmarkName={state.name}
        bookmarkHref={state.href}
        bookmarkCategory={state.category}
        otherCategories={bookmarkContext.categories}
        bookmarkDescription={state.description}
        onBookmarkNameChange={(newValue) => handleEditField("name", newValue)}
        onBookmarkHrefChange={(newValue) => {
          handleEditField("href", newValue)
        }}
        onBookmarkCategoryChange={(newValue) => {
          handleEditField("category", newValue)
        }}
        onBookmarkDescriptionChange={(newValue) => {
          handleEditField("description", newValue)
        }}
        onCancel={layoutContext.closeCreatePanel}
        onSubmit={handleSave}
        onAutofill={handleAutofill}
      />
    </Panel>
  )
}
