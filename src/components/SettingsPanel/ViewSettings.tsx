import React, { useContext } from "react"
import { SettingsContext } from "~/context"
import { SwitchItem } from "./SwitchItem"

export const ViewSettings = () => {
  const settingsContext = useContext(SettingsContext)
  return (
    <>
      <SwitchItem
        label="Sort by Category"
        value={settingsContext.state.showSortedList}
        onToggle={() =>
          settingsContext.actions.setSortedList(
            !settingsContext.state.showSortedList
          )
        }
      />
      <SwitchItem
        label="Dark Theme"
        value={settingsContext.state.isDark}
        onToggle={() =>
          settingsContext.actions.setIsDark(!settingsContext.state.isDark)
        }
      />
    </>
  )
}
