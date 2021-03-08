import React, { useContext, useState } from "react"
import { CollectionsContext } from "~/context"
import Button from "./common/Button"

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

  const [inputValue, setInputValue] = useState<string>("")

  const addCollection = () => {
    collectionsContext.add(inputValue)
    setInputValue("")
    alert("added collection!")
  }

  return (
    <div className="flex flex-col min-w-sidebar p-4 h-full">
      <div className="pb-2 flex flex-col">
        <p className="font-bold pb-2">Collections</p>
        {collectionsContext.collections.length > 0 && (
          <select
            defaultValue={collectionsContext.activeCollection ?? undefined}
            onChange={(e) => collectionsContext.setActive(e.target.value)}
            className="mb-4 border p-1 rounded shadow"
          >
            {collectionsContext.collections.map((item) => {
              return <option key={item}>{item}</option>
            })}
          </select>
        )}
        <div className="flex flex-row">
          <input
            className="flex-grow border mr-2 px-2 rounded"
            placeholder="Enter GistID of collection"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button label="Add" onClick={addCollection} />
        </div>
      </div>
      <div className="pt-2">
        <p className="font-bold">Categories</p>
      </div>
    </div>
  )
}

export default Sidebar
