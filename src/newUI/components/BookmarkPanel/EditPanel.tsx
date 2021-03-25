import React, { useContext, useState } from "react"
import { BookmarkContext, EditorStateContext } from "~/context"
import { Bookmark } from "~/model/Bookmark"
import { LayoutContext } from "~/newUI/context/LayoutContext"
import { Panel } from "~/newUI/layout/Panel"
import { BookmarkPanelEditor } from "./BookmarkPanelEditor"

export const EditPanel = () => {
  const layoutContext = useContext(LayoutContext)
  const bookmarkContext = useContext(BookmarkContext)
  const editorState = useContext(EditorStateContext)

  const [state, setState] = useState<Bookmark>({
    guid: editorState.bookmark.guid,
    name: editorState.bookmark.name,
    href: editorState.bookmark.href,
    category: editorState.bookmark.category,
    description: editorState.bookmark.description,
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

    if (editorState.bookmark.guid) {
      bookmarkContext.editBookmark(state, editorState.bookmark.guid)
      layoutContext.closeEditPanel()
    } else {
      alert("ERR: Unable to edit, no guid found")
    }
  }

  const handleEditField = (key: keyof Bookmark, value: string) => {
    setState({
      ...state,
      [key]: value,
    })
  }

  return (
    <Panel
      open={layoutContext.editPanelOpen}
      title="Edit Bookmark"
      onClose={layoutContext.closeEditPanel}
    >
      <BookmarkPanelEditor
        editMode={true}
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
      />
    </Panel>
  )
}
