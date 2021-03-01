import React, { useContext } from "react"
import Button from "./common/Button"
import { LayoutContext } from "./context/layoutContext"

const Header: React.FC = () => {
  const layoutContext = useContext(LayoutContext)
  const buttonText = layoutContext.createPanelOpen
    ? "Close Window"
    : "Create Bookmark"
  return (
    <div className="border h-12 flex flex-row justify-between items-center px-4">
      <p className="text-lg font-bold">GistMarks</p>
      <Button
        onClick={layoutContext.toggleCreatePanel}
        label={buttonText}
        additionalClassnames="w-36"
      />
    </div>
  )
}

export default Header
