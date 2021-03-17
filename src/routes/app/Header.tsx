import React, { useContext } from "react"
import Button from "~/components/common/Button"
import { GithubAuthButton } from "~/components/common/GithubAuthButton"
import IconButton from "~/components/common/IconButton"
import MenuIcon from "~/components/icons/MenuIcon"
import { AuthContext, BookmarkContext, LayoutContext } from "~/context"

export const Header: React.FC = () => {
  const layoutContext = useContext(LayoutContext)
  const authContext = useContext(AuthContext)
  const bookmarkContext = useContext(BookmarkContext)
  const buttonText = layoutContext.createPanelOpen
    ? "Close Window"
    : "Create Bookmark"

  const handleAuth = () => {
    if (authContext.isLoggedIn) {
      authContext.logout()
    } else {
      alert("Stub for navigation")
      console.log("Fix this @: Header.tsx")
    }
  }

  return (
    <div className="border h-12 flex flex-row justify-between items-center px-4">
      <div className="flex flex-row items-center">
        <IconButton onClick={layoutContext.toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <p className="text-lg font-bold">GistMarks</p>
        <div>
          <input
            value={bookmarkContext.searchTerm}
            onChange={(e) => bookmarkContext.setSearch(e.target.value)}
            placeholder="Search"
            className="ml-2 py-2 px-1 border rounded"
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <GithubAuthButton />
        {/* <Button
          onClick={handleAuth}
          label={authContext.isLoggedIn ? "Log Out" : "Log In"}
          additionalClassnames="w-36 mx-2"
        /> */}
        <Button
          onClick={layoutContext.toggleCreatePanel}
          label={buttonText}
          additionalClassnames="w-36"
        />
      </div>
    </div>
  )
}
