import React from "react"
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
  return (
    <div className="flex flex-col min-w-sidebar p-4 h-full">
      <div className="pb-2 flex flex-col">
        <p className="font-bold pb-2">Collections</p>
        <select className="mb-4 border p-1 rounded shadow">
          <option>Collection 1</option>
          <option>Collection 2</option>
          <option>Collection 3</option>
        </select>
        <div className="flex flex-row">
          <input
            className="flex-grow border mr-2 px-2 rounded"
            placeholder="Add new Collection"
          />
          <Button label="Add Collection" onClick={() => null} />
        </div>
      </div>
      <div className="pt-2">
        <p className="font-bold">Categories</p>
      </div>
    </div>
  )
}

export default Sidebar
