import React, { useContext, useState } from "react"
import { CollectionsContext, LayoutContext } from "~/context"
import { NewCollectionsContext } from "~/context/NewCollectionsContext"
import { NewCollection } from "~/model/Collection"
import Button from "./common/Button"
import IconButton from "./common/IconButton"
import EditIcon from "./icons/EditIcon"

type SidebarItemProps = {
  name: string
  id: string
}
interface SidebarCollectionSectionProps {
  collections: Pick<NewCollection, "bookmarks">
}

const SidebarItem: React.FC<SidebarItemProps> = ({ name, id }) => {
  return (
    <div>
      <input type="checkbox" />
      <p>{name}</p>
    </div>
  )
}

const SidebarCollectionsSection: React.FC = () => {
  const collectionsContext = useContext(NewCollectionsContext)
  const layoutContext = useContext(LayoutContext)
  const collectionKeys = Object.keys(collectionsContext.collections)

  return (
    <div className="flex flex-row">
      <select
        defaultValue={undefined}
        onChange={(e) => null}
        className="flex-grow mb-4 border p-1 rounded shadow mr-2"
      >
        {collectionKeys.map((key) => {
          const currentCollection = collectionsContext.collections[key]

          return (
            <option value={currentCollection.guid}>
              {currentCollection.name}
            </option>
          )
        })}
      </select>
      {/* <IconButton onClick={() => layoutContext.toggleCollectionModal()}>
        <EditIcon />
      </IconButton> */}
    </div>
  )
}

const Sidebar: React.FC = () => {
  const collectionsContext = useContext(NewCollectionsContext)
  const layoutContext = useContext(LayoutContext)

  const collectionKeys = Object.keys(collectionsContext.collections)

  const [inputValue, setInputValue] = useState<string>("")

  const handleCreateCollection = () => {
    layoutContext.toggleCollectionsPanel()
  }

  return (
    <div className="flex flex-col min-w-sidebar p-4 h-full">
      <div className="pb-2 flex flex-col">
        <p className="font-bold pb-2">Collections</p>
        {collectionKeys.length > 0 && <SidebarCollectionsSection />}
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
