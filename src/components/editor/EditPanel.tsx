import React, { useContext, useState } from "react"
import { BookmarkContext, EditorStateContext, LayoutContext } from "~/context"
import { Bookmark } from "~/model/Bookmark"
import Editor from "./Editor"

export const EditPanel = () => {
  const bookmarkContext = useContext(BookmarkContext)
  const layoutContext = useContext(LayoutContext)
  const editorState = useContext(EditorStateContext)

  const [state, setState] = useState<Bookmark>({
    name: editorState.name,
    href: editorState.href,
    category: editorState.category,
    description: editorState.description,
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

    if (editorState.guid) {
      bookmarkContext.actions.addBookmark(state, editorState.guid)
      layoutContext.toggleCreatePanel()
    } else {
      alert("ERR: Unable to edit, no guid found")
    }
  }

  const handleCancel = () => {
    layoutContext.toggleCreatePanel()
  }

  const handleEditField = (key: keyof Bookmark, value: string) => {
    setState({
      ...state,
      [key]: value,
    })
  }

  return (
    <Editor
      name={state.name}
      href={state.href}
      category={state.category}
      description={state.description}
      onEditField={(field, value) => handleEditField(field, value)}
      onDirectEdit={(newValue: Bookmark) => setState(newValue)}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  )
}
