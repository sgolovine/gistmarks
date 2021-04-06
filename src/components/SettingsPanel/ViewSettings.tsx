import React, { useContext } from "react"
import { SettingsContext } from "~/context"
import { SwitchItem } from "./SwitchItem"

export const ViewSettings = () => {
  const settingsContext = useContext(SettingsContext)
  return (
    <>
      <SwitchItem
        label="Sort by Category"
        value={settingsContext.showSortedList}
        onToggle={() =>
          settingsContext.setField(
            "showSortedList",
            !settingsContext.showSortedList
          )
        }
      />
    </>
  )
}
