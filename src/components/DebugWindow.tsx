import React, { useContext, useState } from "react"
import { BookmarkContext, CollectionsContext, LayoutContext } from "~/context"
import { NewCollectionsContext } from "~/context/NewCollectionsContext"
import { generateUUID } from "~/helpers"
import { Bookmark } from "~/model/Bookmark"
import { NewCollection } from "~/model/Collection"
import AppModal from "./common/AppModal"
import Button from "./common/Button"

const DebugWindow = () => {
  const layoutContext = useContext(LayoutContext)
  const collectionsContext = useContext(NewCollectionsContext)
  const bookmarkContext = useContext(BookmarkContext)

  const [guidRemove, setGuidRemove] = useState("")
  const [colName, setColName] = useState("")

  const add = (name: string) => {
    const collection: NewCollection = {
      name,
      guid: "some-guid",
      description: "something here",
      bookmarks: {
        one: {
          guid: "one",
          name: "bookmark 1",
          href: "https://google.com",
          category: "",
          description: "some-desc",
        },
        two: {
          guid: "two",
          name: "bookmark 2",
          href: "https://google.com",
          category: "",
          description: "some-desc",
        },
        three: {
          guid: "three",
          name: "bookmark 3",
          href: "https://google.com",
          category: "",
          description: "some-desc",
        },
      },
      gistId: null,
    }
    collectionsContext.addCollection(collection)
  }

  const handleLoadBookmarks = () => {
    const collectionGuid = "some-guid"
    const collection = collectionsContext.collections[collectionGuid]
    bookmarkContext.actions.loadBookmarks(collection)
  }

  const addBookmark = () => {
    const guid = generateUUID()
    const newBookmark: Bookmark = {
      guid,
      name: "bookmark X",
      href: "https://google.com",
      category: "",
      description: "some-desc",
    }
    bookmarkContext.actions.addBookmark(newBookmark, guid)
  }

  const saveBookmarks = () => {
    collectionsContext.saveBookmarksToCollection(
      "some-guid",
      bookmarkContext.data.bookmarks
    )
  }

  return (
    <AppModal
      open={layoutContext.devModalOpen}
      onClose={layoutContext.toggleDevModal}
    >
      <h1 className="text-xl">Debug</h1>
      <h2 className="text-lg">Collections Context Value</h2>
      <div className="form-container">
        <label className="form-label">Add Collection</label>
        <input
          className="form-field"
          placeholder="Enter collection name"
          value={colName}
          onChange={(e) => setColName(e.target.value)}
        />
      </div>

      <Button label="Add" onClick={() => add(colName)} />
      <div className="form-container">
        <label className="form-label">Guid to Remove</label>
        <input
          className="form-field"
          placeholder="Enter collection guid"
          value={guidRemove}
          onChange={(e) => setGuidRemove(e.target.value)}
        />
      </div>
      <Button
        label="Remove"
        onClick={() => collectionsContext.removeCollection(guidRemove)}
        danger
      />
      <Button label="Load Bookmarks" onClick={() => handleLoadBookmarks()} />
      <Button label="Add Bookmark" onClick={() => addBookmark()} />
      <Button label="Save Bookmarks" onClick={() => saveBookmarks()} />
      <pre>{JSON.stringify(collectionsContext, null, 2)}</pre>
      <h2 className="text-xl">Bookmark Context</h2>
      <pre>{JSON.stringify(bookmarkContext, null, 2)}</pre>
    </AppModal>
  )
}

export default DebugWindow
