import React, { useContext } from "react"
import { BookmarkContext, EditorStateContext } from "~/context"
import { Bookmark } from "~/model/Bookmark"
import { LayoutContext } from "~/context/LayoutContext"
import { Panel } from "~/layout/Panel"
import { BookmarkPanelEditor } from "./BookmarkPanelEditor"

export const EditPanel = () => {
  const layoutContext = useContext(LayoutContext)
  const bookmarkContext = useContext(BookmarkContext)
  const editorState = useContext(EditorStateContext)

  const handleSave = () => {
    if (!editorState.name) {
      alert("Please enter a name!")
      return
    }

    if (!editorState.href) {
      alert("Please enter a URL")
      return
    }

    if (editorState.guid) {
      const bookmark: Bookmark = {
        guid: editorState.guid,
        name: editorState.name,
        href: editorState.href,
        category: editorState.category,
        description: editorState.description,
      }
      bookmarkContext.editBookmark(bookmark, bookmark.guid)
      layoutContext.closeEditPanel()
    } else {
      alert("ERR: Unable to edit, no guid found")
    }
  }

  return (
    <Panel
      open={layoutContext.editPanelOpen}
      title="Edit Bookmark"
      onClose={layoutContext.closeEditPanel}
    >
      <BookmarkPanelEditor
        editMode={true}
        bookmarkName={editorState.name}
        bookmarkHref={editorState.href}
        bookmarkCategory={editorState.category}
        otherCategories={bookmarkContext.categories}
        bookmarkDescription={editorState.description}
        onBookmarkNameChange={(newValue) => editorState.setName(newValue)}
        onBookmarkHrefChange={(newValue) => {
          editorState.setHref(newValue)
        }}
        onBookmarkCategoryChange={(newValue) => {
          editorState.setCategory(newValue)
        }}
        onBookmarkDescriptionChange={(newValue) => {
          editorState.setDescription(newValue)
        }}
        onCancel={layoutContext.closeCreatePanel}
        onSubmit={handleSave}
      />
    </Panel>
  )
}
