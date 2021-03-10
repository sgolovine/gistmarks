import React, { useContext } from "react"
import { LayoutContext } from "~/context"
import AppModal from "./common/AppModal"

const DebugWindow = () => {
  const layoutContext = useContext(LayoutContext)

  return (
    <AppModal
      open={layoutContext.devModalOpen}
      onClose={layoutContext.toggleDevModal}
    >
      <h1 className="text-xl">Debug</h1>
      <p>Debug Page</p>
    </AppModal>
  )
}

export default DebugWindow
