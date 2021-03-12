import React, { useContext, useState } from "react"
import { CollectionsContext, LayoutContext } from "~/context"
import { NewCollectionsContext } from "~/context/NewCollectionsContext"
import { generateUUID } from "~/helpers"
import { Bookmark } from "~/model/Bookmark"
import { NewCollection } from "~/model/Collection"
import AppModal from "./common/AppModal"
import Button from "./common/Button"

const DebugWindow = () => {
  const layoutContext = useContext(LayoutContext)
  const collectionsContext = useContext(NewCollectionsContext)

  return (
    <AppModal
      open={layoutContext.devModalOpen}
      onClose={layoutContext.toggleDevModal}
    >
      <h1 className="text-xl">Debug</h1>
      <h2 className="text-lg">Collections Context Value</h2>

      <pre>{JSON.stringify(collectionsContext, null, 2)}</pre>
      <h2 className="text-xl">Bookmark Context</h2>
    </AppModal>
  )
}

export default DebugWindow
