import React, { useContext, useState } from "react"
import { LayoutContext, CollectionsContext } from "~/context"
import { generateUUID } from "~/helpers"
import { Bookmark } from "~/model/Bookmark"
import Editor from "./Editor"

export const CreatePanel = () => {
  const collectionContext = useContext(CollectionsContext)
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
    collectionContext.addBookmark(bookmark)
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
      editMode={false}
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
