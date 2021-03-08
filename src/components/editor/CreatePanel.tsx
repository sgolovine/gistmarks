import React, { useContext, useState } from "react"
import { BookmarkContext, LayoutContext } from "~/context"
import { Bookmark } from "~/model/Bookmark"
import Editor from "./Editor"

export const CreatePanel = () => {
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
