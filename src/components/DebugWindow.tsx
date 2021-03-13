import React, { useContext } from "react"
import { LayoutContext, CollectionsContext } from "~/context"
import AppModal from "./common/AppModal"

const DebugWindow = () => {
  const layoutContext = useContext(LayoutContext)
  const collectionsContext = useContext(CollectionsContext)

  return (
    <AppModal
      open={layoutContext.devModalOpen}
      onClose={layoutContext.toggleDevModal}
    >
      <h1 className="text-xl font-bold my-4">Collections Context</h1>
      <h2 className="text-lg font-bold py-4">Active Collection</h2>
      <pre>{collectionsContext.activeCollection || "No Active Collection"}</pre>
      <h2 className="text-lg font-bold py-4">Collections</h2>
      <pre>{JSON.stringify(collectionsContext.collections, null, 2)}</pre>
      <h2 className="text-lg font-bold py-4">Active Bookmarks</h2>
      <pre>
        {JSON.stringify(collectionsContext.activeBookmarks || {}, null, 2)}
      </pre>
    </AppModal>
  )
}

export default DebugWindow
