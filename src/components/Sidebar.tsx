import React, { useContext, useState } from "react"
import { CollectionsContext, LayoutContext } from "~/context"
import Button from "./common/Button"
import IconButton from "./common/IconButton"
import EditIcon from "./icons/EditIcon"

type SidebarItemProps = {
  name: string
  id: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ name, id }) => {
  return (
    <div>
      <input type="checkbox" />
      <p>{name}</p>
    </div>
  )
}

const Sidebar: React.FC = () => {
  const collectionsContext = useContext(CollectionsContext)
  const layoutContext = useContext(LayoutContext)

  const [inputValue, setInputValue] = useState<string>("")

  const addCollection = () => {
    collectionsContext.add(inputValue)
    setInputValue("")
  }

  const handleCreateCollection = () => {
    layoutContext.toggleCollectionModal()
  }

  return (
    <div className="flex flex-col min-w-sidebar p-4 h-full">
      <div className="pb-2 flex flex-col">
        <p className="font-bold pb-2">Collections</p>
        <div className="flex flex-row">
          <select
            defaultValue={collectionsContext.activeCollection ?? undefined}
            onChange={(e) => collectionsContext.setActive(e.target.value)}
            className="flex-grow mb-4 border p-1 rounded shadow mr-2"
          >
            <option key="LocalCollection">Local Collection</option>
            {collectionsContext.collections.length > 0 &&
              collectionsContext.collections.map((item) => {
                return <option key={item}>{item}</option>
              })}
          </select>
          <IconButton onClick={() => null}>
            <EditIcon />
          </IconButton>
        </div>
        <div className="flex flex-row justify-evenly">
          <Button label="Create Collection" onClick={handleCreateCollection} />
          <Button label="Import Collection" onClick={handleCreateCollection} />
        </div>
      </div>
      <div className="pt-2">
        <p className="font-bold">Categories</p>
      </div>
    </div>
  )
}

export default Sidebar
