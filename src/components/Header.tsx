import React, { useContext } from "react"
import Button from "./common/Button"
import { LayoutContext } from "./context/layoutContext"

const Header: React.FC = () => {
  const layoutContext = useContext(LayoutContext)
  return (
    <div className="border h-12 flex flex-row justify-between items-center px-4">
      <p className="text-lg font-bold">GistMarks</p>
      <Button
        onClick={layoutContext.toggleCreatePanel}
        label="Create Bookmark"
      />
    </div>
  )
}

export default Header
